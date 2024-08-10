import { HEIGHT_IN_CELLS, WIDTH_IN_CELLS } from "../constants";
import { PerlinWindParams, initialPerlinWindParams } from "../types";

function noise(x: number, y: number) {
  return (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
}

function lerp(a: number, b: number, t: number) {
  return a + t * (b - a);
}

function smoothNoise(x: number, y: number) {
  let corners =
    (noise(x - 1, y - 1) +
      noise(x + 1, y - 1) +
      noise(x - 1, y + 1) +
      noise(x + 1, y + 1)) /
    16;
  let sides =
    (noise(x - 1, y) + noise(x + 1, y) + noise(x, y - 1) + noise(x, y + 1)) / 8;
  let center = noise(x, y) / 4;
  return corners + sides + center;
}

function perlin(x: number, y: number) {
  let intX = Math.floor(x);
  let intY = Math.floor(y);
  let fracX = x - intX;
  let fracY = y - intY;

  let v1 = smoothNoise(intX, intY);
  let v2 = smoothNoise(intX + 1, intY);
  let v3 = smoothNoise(intX, intY + 1);
  let v4 = smoothNoise(intX + 1, intY + 1);

  let i1 = lerp(v1, v2, fracX);
  let i2 = lerp(v3, v4, fracX);

  return lerp(i1, i2, fracY);
}

export function step(prev: number[], params: PerlinWindParams): number[] {
  const now = Date.now();
  const next = new Array(prev.length).fill(0);

  let { speedScalar, direction } = params;
  speedScalar =
    speedScalar === undefined
      ? initialPerlinWindParams.speedScalar
      : speedScalar;
  direction =
    direction === undefined ? initialPerlinWindParams.direction : direction;
  //turbulence =
    //turbulence === undefined ? initialPerlinWindParams.turbulence : turbulence;

  speedScalar = -0.001;
  let sizeScaler = 2.5;
  let ampScaler = 10;

  const horzShift = speedScalar * Math.cos(direction);
  const vertShift = speedScalar * Math.sin(direction);

  for (let x = 0; x < WIDTH_IN_CELLS; x++) {
    for (let y = 0; y < HEIGHT_IN_CELLS; y++) {
      const noiseValue =
        perlin(
          x / sizeScaler + now * horzShift,
          y / sizeScaler + now * vertShift
        ) * ampScaler;
      next[x + y * WIDTH_IN_CELLS] = noiseValue;
    }
  }

  return next;
}
