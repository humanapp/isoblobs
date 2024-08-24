import { Image } from "./types";

export const TWO_PI = Math.PI * 2;

export type vec2 = { x: number; y: number };

export function vec2(x: number, y: number): vec2 {
  return { x, y };
}
export function vec2i(v: number): vec2 {
  return vec2(v, v);
}
export function v2add(a: vec2, b: vec2): vec2 {
  return vec2(a.x + b.x, a.y + b.y);
}
export function v2addi(a: vec2, b: number): vec2 {
  return vec2(a.x + b, a.y + b);
}
export function v2sub(a: vec2, b: vec2): vec2 {
  return vec2(a.x - b.x, a.y - b.y);
}
export function v2subi(a: vec2, b: number): vec2 {
  return vec2(a.x - b, a.y - b);
}
export function v2scale(a: vec2, s: number): vec2 {
  return vec2(a.x * s, a.y * s);
}
export function v2mul(a: vec2, b: vec2): vec2 {
  return vec2(a.x * b.x, a.y * b.y);
}
export function v2floor(a: vec2): vec2 {
  return vec2(Math.floor(a.x), Math.floor(a.y));
}
export function v2rot(a: vec2, angle: number): vec2 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return vec2(a.x * c - a.y * s, a.x * s + a.y * c);
}
export function v2dot(a: vec2, b: vec2): number {
  return a.x * b.x + a.y * b.y;
}
export function v2max(a: vec2, b: vec2): vec2 {
  return vec2(Math.max(a.x, b.x), Math.max(a.y, b.y));
}
/*
function v2hash(p: vec2): number {
	p = vec2(v2dot(p,vec2(127.1,311.7)), v2dot(p,vec2(269.5,183.3)));
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}
*/

export type vec3 = { x: number; y: number; z: number };

export function vec3(x: number, y: number, z: number): vec3 {
  return { x, y, z };
}
export function vec3i(v: number): vec3 {
  return vec3(v, v, v);
}
export function v3dot(a: vec3, b: vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
export function v3max(a: vec3, b: vec3): vec3 {
  return vec3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
}
export function v3add(a: vec3, b: vec3): vec3 {
  return vec3(a.x + b.x, a.y + b.y, a.z + b.z);
}
export function v3sub(a: vec3, b: vec3): vec3 {
  return vec3(a.x - b.x, a.y - b.y, a.z - b.z);
}
export function v3mul(a: vec3, b: vec3): vec3 {
  return vec3(a.x * b.x, a.y * b.y, a.z * b.z);
}

export function smoothstep(min: number, max: number, value: number) {
  var x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function rotate(v: vec2, offset: vec2, angle: number): vec2 {
  return v2add(v2rot(v2sub(v, offset), angle), offset);
}

export function sample(image: Image, uv: vec2): number {
  const { width, height, pixels } = image;
  const { x: u, y: v } = uv;
  const x = Math.floor(u * width);
  const y = Math.floor(v * height);
  if (x < 0 || x >= width || y < 0 || y >= height) return 0;
  return pixels[y * width + x].r;
}

export function gaussian(
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

