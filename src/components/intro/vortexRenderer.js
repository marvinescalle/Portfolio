/**
 * Rendu du voile noir aspiré vers le centre, en WebGL brut.
 *
 * Pourquoi un shader plutôt qu'un masque CSS ou SVG : l'effet recherché est
 * une rotation dont l'intensité dépend de la distance au centre. Le centre
 * tourne beaucoup, les bords presque pas. C'est cette différence qui produit
 * la torsion. Un clip-path, un masque SVG ou une transformation CSS
 * appliquent la même transformation à toute la forme : on obtient au mieux
 * un cercle qui tourne, jamais une spirale. Le calcul par pixel est le seul
 * moyen d'obtenir une vraie déformation, et il tient en une passe.
 *
 * Le contexte est créé au lancement de l'intro puis explicitement détruit.
 */

const VERTEX = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision highp float;

uniform vec2 uRes;
uniform float uProgress;
uniform float uTime;
uniform vec3 uColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  // Repère centré, normalisé par la demi-diagonale : le rayon vaut donc 1
  // dans les coins, quel que soit le format de l'écran.
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * length(uRes));
  float r = length(uv);
  float angle = atan(uv.y, uv.x);

  float p = clamp(uProgress, 0.0, 1.0);
  float ease = p * p * (3.0 - 2.0 * p);

  /* Rotation différentielle : forte au centre, faible sur les bords. C'est
     elle qui tord la matière au lieu de la faire pivoter en bloc. Sa portée
     est volontairement longue : une décroissance rapide ne cisaille que le
     centre, et le reste de l'écran se contente alors de rétrécir, ce qui se
     lit comme une vague plutôt que comme un tourbillon. */
  float swirl = exp(-r * 1.15) * (7.8 * p + 1.6 * uTime);
  float twisted = angle + swirl;

  /* Coordonnée le long de la spirale logarithmique. Tout le dessin est
     construit dessus : la frontière, les entailles et les filaments. C'est ce
     qui donne un tourbillon plutôt qu'un disque ondulé, où le contour et les
     bras vivaient chacun de leur côté. */
  float spiral = twisted + 3.2 * log(r + 0.06) - uTime * 1.0;

  // Rayon du voile : il part au-delà des coins et converge vers le centre.
  float base = 1.10 * (1.0 - ease);

  /* Frontière découpée en langues étirées le long de la spirale, et non en
     lobes posés sur un cercle : le bord avance et recule en suivant
     l'enroulement, si bien qu'il n'y a plus de rondeur lisible. */
  /* L'amplitude monte avec l'avancement : au premier instant une langue
     creuse pouvait ramener la frontière sous le rayon des coins, et l'écran
     n'était alors pas tout à fait plein. */
  float tongueGate = smoothstep(0.0, 0.16, p);
  float tongues = tongueGate * (
      0.145 * sin(spiral * 2.0)
    + 0.080 * sin(spiral * 3.0 + 1.7)
    + 0.045 * sin(spiral * 5.0 - 0.6));

  float grain = noise(vec2(twisted * 2.4, r * 9.0 - uTime * 0.8)) - 0.5;
  float grainFine = noise(vec2(twisted * 6.0 + 11.0, r * 18.0 - uTime * 1.4)) - 0.5;

  float edge = base * (1.0 + tongues) + 0.040 * grain + 0.022 * grainFine;
  // Bord volontairement net : trop de flou donnerait une tache, alors que
  // l'effet recherché est une matière déchirée.
  float soft = 0.006 + 0.010 * ease;
  float veil = 1.0 - smoothstep(edge - soft, edge + soft, r);

  // Six bandes le long de la spirale, étroites et donc très étirées.
  float band = fract(spiral / 6.2831853 * 6.0);
  float toBand = min(band, 1.0 - band);
  float streak = smoothstep(0.155, 0.045, toBand);

  /* Les mêmes bandes décalées d'une demi-période entaillent la matière. Une
     strie claire venue du dehors se prolonge ainsi dans le noir au lieu de
     s'arrêter net à la frontière : c'est ce prolongement qui fait lire un
     entraînement, et la masse se découpe en rubans enroulés. */
  float carveBand = fract(spiral / 6.2831853 * 6.0 + 0.5);
  float toCarve = min(carveBand, 1.0 - carveBand);
  // Transition courte : une entaille aux bords francs, pas un dégradé.
  float carveShape = smoothstep(0.135, 0.075, toCarve);

  /* Les entailles n'apparaissent qu'une fois le tourbillon lancé, et se
     referment avant la fin : l'écran doit être plein au premier instant, et
     la matière doit rejoindre le symbole d'un seul tenant. */
  float carveGate = smoothstep(0.05, 0.30, p) * (1.0 - smoothstep(0.70, 0.95, p));
  float carve = carveShape * carveGate * smoothstep(edge - 0.62, edge - 0.05, r);

  /* Filaments qui traînent au-delà de la frontière, alignés sur les rubans
     sombres pour prolonger le même mouvement. */
  float reach = smoothstep(edge + 0.52, edge + 0.005, r);
  float inner = smoothstep(0.0, 0.10, r);
  float wisps = streak * reach * inner * (1.0 - ease);

  /* Peignage : des stries beaucoup plus fines, de faible amplitude, posées
     sur la même spirale. Elles donnent la texture étirée d'une matière
     entraînée, là où les seuls rubans larges restent un peu lisses. Elles
     s'effacent près du centre, où l'enroulement se resserre au point de
     crêper l'image. */
  float fine = fract(spiral / 6.2831853 * 18.0);
  float toFine = min(fine, 1.0 - fine);
  float combed =
      smoothstep(0.34, 0.12, toFine)
    * smoothstep(0.10, 0.44, r)
    * carveGate
    * 0.16;

  float alpha = clamp(veil * (1.0 - 0.92 * carve - combed) + wisps, 0.0, 1.0);

  gl_FragColor = vec4(uColor, alpha);
}
`;

const compile = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Compilation du shader impossible : ${log}`);
  }
  return shader;
};

/**
 * Prépare le rendu sur un canvas.
 * Renvoie `null` si WebGL n'est pas disponible, ce qui permet à l'appelant
 * de se rabattre proprement sur une intro sans vortex.
 */
export const createVortex = (canvas, { color = [0.039, 0.039, 0.039] } = {}) => {
  const gl =
    canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false }) ||
    canvas.getContext("experimental-webgl", { alpha: true });

  if (!gl) return null;

  let program;
  let vertexShader;
  let fragmentShader;
  try {
    vertexShader = compile(gl, gl.VERTEX_SHADER, VERTEX);
    fragmentShader = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
  } catch (error) {
    console.warn("Vortex indisponible :", error.message);
    return null;
  }

  gl.useProgram(program);

  // Un seul triangle couvrant tout l'écran, moins coûteux que deux.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );

  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(program, "uRes");
  const uProgress = gl.getUniformLocation(program, "uProgress");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uColor = gl.getUniformLocation(program, "uColor");

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.uniform3fv(uColor, color);

  let width = 0;
  let height = 0;

  const resize = () => {
    // Plafonné à 1.5 : au-delà le gain visuel est nul et le coût réel.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.floor(canvas.clientWidth * dpr);
    const h = Math.floor(canvas.clientHeight * dpr);
    if (w === width && h === height) return;
    width = w;
    height = h;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
  };

  const render = (progress, time) => {
    resize();
    gl.uniform1f(uProgress, progress);
    gl.uniform1f(uTime, time);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const destroy = () => {
    gl.deleteBuffer(buffer);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteProgram(program);
    // Volontairement pas de WEBGL_lose_context ici : la perte forcée est
    // définitive pour le canvas concerné, et un même canvas ne peut plus
    // jamais fournir de contexte exploitable ensuite. Or React remonte les
    // composants en développement. Le canvas étant retiré du DOM à la fin de
    // l'intro, le navigateur libère le contexte de lui-même.
  };

  return { render, resize, destroy };
};

export default createVortex;
