import { HEIGHT_IN_CELLS, WIDTH_IN_CELLS } from "../constants";
import { PlasmaParams } from "../types";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();

let t = 0;

export function step(prev: number[], params: PlasmaParams): number[] {
  const next = new Array(prev.length).fill(0);

  for (let x = 0; x < WIDTH_IN_CELLS; x++) {
    for (let y = 0; y < HEIGHT_IN_CELLS; y++) {
      //const value = 0.5 + 0.5 * Math.sin(x / 8 + Math.sin(y / 8 + now / 1000));
      //next[x + y * WIDTH_IN_CELLS] = value;
      const v1 = noise3D(x * 1, y * 1, t * 0.00005) * 0.5 + 0.5;
      const v2 = noise3D(x * 0.1, y * 0.1, t * 0.00005) * 0.5 + 0.5;
      let value = (v1 + v2) / 2;
      //let value = v2;
      // increase contrast of value
      value = Math.pow(value, 2);
      next[x + y * WIDTH_IN_CELLS] = value;
      t += 1;
    }
  }

  return next;
}
