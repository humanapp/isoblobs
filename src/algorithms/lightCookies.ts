import { Image, LightCookiesParams } from "../types";
import { WIDTH_IN_CELLS, HEIGHT_IN_CELLS } from "../constants";

const TWO_PI = Math.PI * 2;

type vec2 = { x: number; y: number };
// eslint-disable-next-line @typescript-eslint/no-redeclare
function vec2(x: number, y: number): vec2 {
  return { x, y };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function vec2i(v: number): vec2 {
  return vec2(v, v);
}
function v2add(a: vec2, b: vec2): vec2 {
  return vec2(a.x + b.x, a.y + b.y);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function v2addi(a: vec2, b: number): vec2 {
  return vec2(a.x + b, a.y + b);
}
function v2sub(a: vec2, b: vec2): vec2 {
  return vec2(a.x - b.x, a.y - b.y);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function v2subi(a: vec2, b: number): vec2 {
  return vec2(a.x - b, a.y - b);
}
function v2scale(a: vec2, s: number): vec2 {
  return vec2(a.x * s, a.y * s);
}
function v2mul(a: vec2, b: vec2): vec2 {
  return vec2(a.x * b.x, a.y * b.y);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function v2floor(a: vec2): vec2 {
  return vec2(Math.floor(a.x), Math.floor(a.y));
}
function v2rot(a: vec2, angle: number): vec2 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return vec2(a.x * c - a.y * s, a.x * s + a.y * c);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function v2dot(a: vec2, b: vec2): number {
  return a.x * b.x + a.y * b.y;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function v2max(a: vec2, b: vec2): vec2 {
  return vec2(Math.max(a.x, b.x), Math.max(a.y, b.y));
}
/*
function v2hash(p: vec2): number {
	p = vec2(v2dot(p,vec2(127.1,311.7)), v2dot(p,vec2(269.5,183.3)));
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}
*/

type vec3 = { x: number; y: number; z: number };
// eslint-disable-next-line @typescript-eslint/no-redeclare
function vec3(x: number, y: number, z: number): vec3 {
  return { x, y, z };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function vec3i(v: number): vec3 {
  return vec3(v, v, v);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function v3dot(a: vec3, b: vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function v3max(a: vec3, b: vec3): vec3 {
  return vec3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function v3add(a: vec3, b: vec3): vec3 {
  return vec3(a.x + b.x, a.y + b.y, a.z + b.z);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function v3sub(a: vec3, b: vec3): vec3 {
  return vec3(a.x - b.x, a.y - b.y, a.z - b.z);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function v3mul(a: vec3, b: vec3): vec3 {
  return vec3(a.x * b.x, a.y * b.y, a.z * b.z);
}

/*
function noise(p: vec2): number {
  const K1 = 0.366025404; // (sqrt(3)-1)/2;
  const K2 = 0.211324865; // (3-sqrt(3))/6;
  const i = v2floor(v2addi(p, (p.x+p.y)*K1));	
  const a = v2sub(p, v2addi(i, (i.x+i.y)*K2));
  const o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0); //vec2 of = 0.5 + 0.5*vec2(sign(a.x-a.y), sign(a.y-a.x));
  const b = v2addi(v2sub(a, o), K2);
  const c = v2subi(a, 1.0 + 2.0*K2);
  const h = v3max(v3sub(vec3i(0.5),vec3(v2dot(a,a), v2dot(b,b), v2dot(c,c) )), vec3i(0.0));
  const n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
  return dot(n, vec3(70.0));	
}

float fbm(vec2 n) {
float total = 0.0, amplitude = 0.1;
for (int i = 0; i < 7; i++) {
  total += noise(n) * amplitude;
  n = m * n;
  amplitude *= 0.4;
}
return total;
}
*/

function smoothstep(min: number, max: number, value: number) {
  var x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function rotate(v: vec2, offset: vec2, angle: number): vec2 {
  return v2add(v2rot(v2sub(v, offset), angle), offset);
}

function sample(image: Image, uv: vec2): number {
  const { width, height, pixels } = image;
  const { x: u, y: v } = uv;
  const x = Math.floor(u * width);
  const y = Math.floor(v * height);
  if (x < 0 || x >= width || y < 0 || y >= height) return 0;
  return pixels[y * width + x].r;
}

function gaussian(
  fragCoord: vec2,
  params: {
    image: Image;
    directions: number; // BLUR DIRECTIONS (Default 16.0)
    quality: number; // BLUR QUALITY (Default 4.0)
    size: number; // BLUR SIZE (Default 15.0)
  }
): number {
  const { image, directions, quality, size } = params;
  const radius = { x: size / image.width, y: size / image.height };
  const uv = { x: fragCoord.x / image.width, y: fragCoord.y / image.height };
  let s = sample(image, uv);
  for (let d = 0; d < TWO_PI; d += TWO_PI / directions) {
    for (let i = 1 / quality; i <= 1; i += 1 / quality) {
      const p = v2add(uv, vec2(Math.cos(d), Math.sin(d)));
      s += sample(image, v2mul(p, v2scale(radius, i)));
    }
  }
  return s / (quality * directions - 15);
}

type LightCookieInstance = {
  x: number;
  y: number;
};

const lightCookieInstances: LightCookieInstance[] = [];

export function step(prev: number[], params: LightCookiesParams): number[] {
  const now = Date.now();
  const next = new Array(prev.length).fill(0);

  while (lightCookieInstances.length < params.layers.length) {
    lightCookieInstances.push({ x: 0, y: 0 });
  }
  lightCookieInstances.length = params.layers.length;

  const { layers } = params;

  for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
    const params = layers[layerIndex];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const inst = lightCookieInstances[layerIndex];

    const { cookie, blur, offset, scale, low, high, factor } = params;
    const { width, height } = cookie;

    const currOffset = v2add(
      offset,
      vec2(
        scale * Math.sin((1.34 * factor * now) / 1000),
        scale * Math.cos((2.4 * factor * now) / 1000)
      )
    );

    for (let x = 0; x < WIDTH_IN_CELLS; x++) {
      for (let y = 0; y < HEIGHT_IN_CELLS; y++) {
        const cellsUv = vec2(x / WIDTH_IN_CELLS, y / HEIGHT_IN_CELLS);
        const cookieFragCoord = v2add(
          currOffset,
          vec2(cellsUv.x * width * scale, cellsUv.y * height * scale)
        );
        let cookieValue: number = 0;
        if (blur.enabled) {
          cookieValue =
            gaussian(cookieFragCoord, {
              image: cookie,
              ...blur,
            }) / 255;
        } else {
          cookieValue =
            sample(
              cookie,
              vec2(cookieFragCoord.x / width, cookieFragCoord.y / height)
            ) / 255;
        }
        const smoothValue = smoothstep(low, high, cookieValue) * factor;
        next[x + y * WIDTH_IN_CELLS] += smoothValue;
      }
    }
    //break;
  }
  return next;
}
