import { IsoblobsParams, initialIsoblobsParams } from "../types";
import {
  WIDTH_IN_CELLS,
  HEIGHT_IN_CELLS,
  Isoblobs_Sim_Params,
} from "../constants";

class Metaball {
  currX: number;
  currY: number;

  constructor(
    public x: number,
    public y: number,
    public r: number,
    public h: number,
    public v: number
  ) {
    this.currX = x;
    this.currY = y;
  }

  static create(index: number): Metaball {
    const { x, y, r, h, v } = Isoblobs_Sim_Params[index];
    return new Metaball(x, y, r, h, v);
  }

  // Calculate the influence of the metaball at a given point (px, py)
  influence(px: number, py: number): number {
    const dx = px - this.currX;
    const dy = py - this.currY;
    const distanceSquared = dx * dx + dy * dy;
    return (this.r * this.r) / distanceSquared;
  }

  update(now: number, params: IsoblobsParams): void {
    this.currX =
      this.x +
      WIDTH_IN_CELLS *
        params.horizontal *
        Math.sin((params.speedScalar * now) / (this.h * 1000));
    this.currY =
      this.y +
      HEIGHT_IN_CELLS *
        params.vertical *
        Math.cos((params.speedScalar * now) / (this.v * 1000));
  }
}

let metaballs: Metaball[] = [];

export function step(prev: number[], params: IsoblobsParams): number[] {
  let { speedScalar, horizontal, vertical, count } = params;
  speedScalar =
    speedScalar === undefined ? initialIsoblobsParams.speedScalar : speedScalar;
  horizontal =
    horizontal === undefined ? initialIsoblobsParams.horizontal : horizontal;
  vertical = vertical === undefined ? initialIsoblobsParams.vertical : vertical;
  count = count === undefined ? initialIsoblobsParams.count : count;

  const now = Date.now();
  const next = new Array(prev.length).fill(0);

  while (metaballs.length < count) {
    metaballs.push(Metaball.create(metaballs.length));
  }

  metaballs = metaballs.slice(0, count);

  for (let i = 0; i < count; i++) {
    metaballs[i].update(now, { speedScalar, horizontal, vertical, count });
  }

  for (let x = 0; x < WIDTH_IN_CELLS; x++) {
    for (let y = 0; y < HEIGHT_IN_CELLS; y++) {
      let sum = 0;
      for (const metaball of metaballs) {
        sum += metaball.influence(x, y);
      }
      next[x + y * WIDTH_IN_CELLS] = sum;
    }
  }

  return next;
}
