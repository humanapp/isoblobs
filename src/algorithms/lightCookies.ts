import { Image, LightCookiesParams } from "../types";
import { WIDTH_IN_CELLS, HEIGHT_IN_CELLS } from "../constants";
import { gaussian, sample, smoothstep, v2add, vec2 } from "../math";

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

  const startIndex = 0;
  const endIndex = layers.length;

  for (let layerIndex = startIndex; layerIndex < endIndex; layerIndex++) {
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
  }
  return next;
}
