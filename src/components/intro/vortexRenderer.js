/**
 * Rendu du vortex, dans les deux sens.
 *
 *   absorb  le voile noir est aspiré vers le centre et disparaît dans le
 *           symbole. C'est le rideau d'ouverture du site.
 *   emit    le noir est au contraire expulsé du symbole, puis se stabilise
 *           dans une zone donnée. C'est l'ouverture de la présentation.
 *
 * Les deux sens partagent la même torsion, les mêmes lobes, le même bruit
 * et les mêmes filaments en spirale : ce sont deux états d'un seul et même
 * phénomène, pas deux effets qui se ressemblent.
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
uniform float uEmit;
uniform vec2 uCenter;
uniform vec4 uRect;

/** Distance signée à un rectangle, pour la zone visée en émission. */
float sdBox(vec2 p, vec2 c, vec2 extent) {
  vec2 q = abs(p - c) - extent;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
}

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
  // dans les coins, quel que soit le format de l'écran. En émission le
  // centre n'est pas celui de l'écran mais celui du symbole.
  float scale = 0.5 * length(uRes);
  vec2 pivot = uEmit > 0.5 ? uCenter : 0.5 * uRes;
  vec2 uv = (gl_FragCoord.xy - pivot) / scale;
  float r = length(uv);
  float angle = atan(uv.y, uv.x);

  float p = clamp(uProgress, 0.0, 1.0);

  if (uEmit > 0.5) {
    // ---------------- ÉMISSION ----------------
    // La matière jaillit du symbole, tourne, puis se range dans la zone
    // visée. La torsion est maximale au jaillissement et s'apaise ensuite,
    // exactement l'inverse de l'aspiration.
    float grow = smoothstep(0.04, 0.58, p);

    float swirlOut = exp(-r * 2.2) * (6.2 * (1.0 - grow) + 1.6 * uTime);
    float twistedOut = angle + swirlOut;

    float dVortex = r - 0.50 * grow;

    vec2 rectCenter = ((uRect.xy + uRect.zw) * 0.5 - pivot) / scale;
    vec2 rectHalf = (uRect.zw - uRect.xy) * 0.5 / scale;
    float dRect = sdBox(uv, rectCenter, rectHalf);

    float morphOut = smoothstep(0.34, 0.94, p);
    float dOut = mix(dVortex, dRect, morphOut);

    /* La déformation porte sur le champ déjà mélangé : le bord reste tordu
       et déchiré pendant toute la transformation, et ne se lisse qu'à la
       toute fin, quand la matière prend la géométrie du panneau. */
    float calm = 1.0 - smoothstep(0.68, 1.0, p);

    float lobesOut =
        0.100 * sin(3.0 * twistedOut)
      + 0.060 * sin(5.0 * twistedOut + 1.7)
      + 0.040 * sin(8.0 * twistedOut - 0.6);

    float grainOut = noise(vec2(twistedOut * 2.4, r * 9.0 - uTime * 0.8)) - 0.5;
    float fineOut = noise(vec2(twistedOut * 6.0 + 11.0, r * 18.0 - uTime * 1.4)) - 0.5;

    dOut -= (lobesOut * 0.62 + 0.045 * grainOut + 0.024 * fineOut) * calm;

    float softOut = 0.006 + 0.008 * (1.0 - calm);
    float veilOut = 1.0 - smoothstep(-softOut, softOut, dOut);

    // Mêmes filaments que l'aspiration, projetés vers l'extérieur.
    float spiralOut = twistedOut + 2.9 * log(r + 0.05) - uTime * 1.1;
    float bandOut = fract(spiralOut / 6.2831853 * 3.0);
    float distOut = min(bandOut, 1.0 - bandOut);
    float armsOut = smoothstep(0.22, 0.02, distOut);
    float reachOut = smoothstep(0.42, 0.0, dOut);
    float innerOut = smoothstep(0.0, 0.10, r);
    float wispsOut = armsOut * reachOut * innerOut * calm;

    gl_FragColor = vec4(uColor, clamp(veilOut + wispsOut, 0.0, 1.0));
    return;
  }

  // ---------------- ASPIRATION ----------------
  float ease = p * p * (3.0 - 2.0 * p);

  // Rotation différentielle : forte au centre, quasi nulle sur les bords.
  // C'est elle qui tord la matière au lieu de la faire pivoter en bloc.
  float swirl = exp(-r * 2.2) * (6.2 * p + 1.6 * uTime);
  float twisted = angle + swirl;

  // Rayon du voile : il part au-delà des coins et converge vers le centre.
  float base = 1.10 * (1.0 - ease);

  // Contour déchiré : quelques harmoniques dans le repère tordu, plus un
  // bruit fin. Sans cela le bord resterait un cercle parfait.
  float lobes =
      0.100 * sin(3.0 * twisted)
    + 0.060 * sin(5.0 * twisted + 1.7)
    + 0.040 * sin(8.0 * twisted - 0.6);

  float grain = noise(vec2(twisted * 2.4, r * 9.0 - uTime * 0.8)) - 0.5;
  float grainFine = noise(vec2(twisted * 6.0 + 11.0, r * 18.0 - uTime * 1.4)) - 0.5;

  float edge = base * (1.0 + lobes) + 0.045 * grain + 0.024 * grainFine;
  // Bord volontairement net : trop de flou donnerait une tache, alors que
  // l'effet recherché est une matière déchirée.
  float soft = 0.006 + 0.010 * ease;
  float veil = 1.0 - smoothstep(edge - soft, edge + soft, r);

  // Filaments : trois bras en spirale logarithmique qui traînent au-delà du
  // voile et convergent vers le centre. Ils rendent le mouvement lisible,
  // là où un simple contour ne montrerait qu'un rétrécissement.
  float spiral = twisted + 2.9 * log(r + 0.05) - uTime * 1.1;
  float band = fract(spiral / 6.2831853 * 3.0);
  float dist = min(band, 1.0 - band);
  float arms = smoothstep(0.22, 0.02, dist);

  // Les bras n'existent qu'au-delà du voile, et s'effacent à la fin.
  float reach = smoothstep(edge + 0.46, edge + 0.01, r);
  float inner = smoothstep(0.0, 0.10, r);
  float wisps = arms * reach * inner * (1.0 - ease);

  float alpha = clamp(veil + wisps, 0.0, 1.0);

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
  const uEmit = gl.getUniformLocation(program, "uEmit");
  const uCenter = gl.getUniformLocation(program, "uCenter");
  const uRect = gl.getUniformLocation(program, "uRect");

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.uniform3fv(uColor, color);
  gl.uniform1f(uEmit, 0);

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

  /**
   * Bascule en mode émission, en fixant le point de départ et la zone
   * visée. Coordonnées du document, origine en haut à gauche : la
   * conversion vers le repère du shader se fait ici.
   */
  const setEmission = ({ center, rect }) => {
    resize();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const h = canvas.height;
    gl.uniform1f(uEmit, 1);
    gl.uniform2f(uCenter, center.x * dpr, h - center.y * dpr);
    gl.uniform4f(
      uRect,
      rect.left * dpr,
      h - rect.bottom * dpr,
      rect.right * dpr,
      h - rect.top * dpr
    );
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

  return { render, resize, setEmission, destroy };
};

export default createVortex;
