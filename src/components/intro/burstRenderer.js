/**
 * Rendu de la libération du noir, à l'ouverture de la présentation.
 *
 * C'est l'inverse de l'intro : au lieu d'aspirer le voile vers le symbole,
 * le noir jaillit du symbole en spirale, puis se range dans la grande zone
 * sombre de la page.
 *
 * Le passage de la spirale au rectangle n'est pas un fondu entre deux
 * images : on interpole les deux fonctions de distance, celle de la tache
 * en spirale et celle du rectangle visé. La matière se déforme donc
 * réellement de l'une vers l'autre, au lieu que l'une remplace l'autre.
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
uniform vec2 uCenter;
uniform vec4 uRect;
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

float sdBox(vec2 p, vec2 c, vec2 extent) {
  vec2 d = abs(p - c) - extent;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

void main() {
  float scale = 0.5 * length(uRes);
  vec2 uv = (gl_FragCoord.xy - uCenter) / scale;
  float r = length(uv);
  float angle = atan(uv.y, uv.x);

  float p = clamp(uProgress, 0.0, 1.0);

  // Éruption : le rayon de la tache croît depuis le symbole.
  float grow = smoothstep(0.0, 0.52, p);

  // Torsion décroissante : très marquée au jaillissement, elle se calme à
  // mesure que la matière se range.
  float twist = exp(-r * 2.0) * (4.6 * (1.0 - grow) + 1.2 * uTime);
  float twisted = angle + twist;

  float lobes =
      0.110 * sin(3.0 * twisted)
    + 0.065 * sin(5.0 * twisted + 1.7)
    + 0.040 * sin(8.0 * twisted - 0.6);

  float grain = noise(vec2(twisted * 2.4, r * 9.0 - uTime * 0.8)) - 0.5;

  /* Volontairement bien en deçà de la diagonale : la matière doit jaillir
     largement autour du symbole sans jamais noircir tout l'écran, sinon la
     page disparaît un instant au lieu de se remplir. */
  float radius = 0.74 * grow * (1.0 + lobes) + 0.05 * grain * (1.0 - grow);
  float dBlob = r - radius;

  // Distance au rectangle visé, dans le même repère normalisé.
  vec2 rectCenter = ((uRect.xy + uRect.zw) * 0.5 - uCenter) / scale;
  vec2 rectHalf = (uRect.zw - uRect.xy) * 0.5 / scale;
  float dRect = sdBox(uv, rectCenter, rectHalf);

  // Morphage progressif de la spirale vers le rectangle.
  float morph = smoothstep(0.38, 0.96, p);
  float d = mix(dBlob, dRect, morph);

  float soft = mix(0.014, 0.0015, morph);
  float alpha = 1.0 - smoothstep(-soft, soft, d);

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
 * @param {HTMLCanvasElement} canvas
 * @param {object} options
 * @param {number[]} options.color couleur du voile, composantes 0 à 1
 * @returns {{render: Function, setGeometry: Function, destroy: Function}|null}
 */
export const createBurst = (canvas, { color = [0.039, 0.039, 0.039] } = {}) => {
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
    console.warn("Libération du noir indisponible :", error.message);
    return null;
  }

  gl.useProgram(program);

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
  const uCenter = gl.getUniformLocation(program, "uCenter");
  const uRect = gl.getUniformLocation(program, "uRect");
  const uColor = gl.getUniformLocation(program, "uColor");

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.uniform3fv(uColor, color);

  let dpr = 1;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.floor(canvas.clientWidth * dpr);
    const h = Math.floor(canvas.clientHeight * dpr);
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
  };

  /**
   * Géométrie exprimée dans le repère du document, origine en haut à
   * gauche. On la convertit ici pour le shader, dont l'origine est en bas.
   */
  const setGeometry = ({ center, rect }) => {
    resize();
    const height = canvas.height;
    gl.uniform2f(uCenter, center.x * dpr, height - center.y * dpr);
    gl.uniform4f(
      uRect,
      rect.left * dpr,
      height - rect.bottom * dpr,
      rect.right * dpr,
      height - rect.top * dpr
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
  };

  return { render, setGeometry, destroy };
};

export default createBurst;
