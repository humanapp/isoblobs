import { IsoblobsParams, initialIsoblobsParams } from "../types";
import { WIDTH_IN_CELLS, HEIGHT_IN_CELLS } from "../constants";

class Metaball {
  currX: number;
  currY: number;
  constructor(
    public x: number,
    public y: number,
    public radius: number
  ) {
    this.currX = x;
    this.currY = y;
  }

  // Calculate the influence of the metaball at a given point (px, py)
  influence(px: number, py: number): number {
    const dx = px - this.currX;
    const dy = py - this.currY;
    const distanceSquared = dx * dx + dy * dy;
    return (this.radius * this.radius) / distanceSquared;
  }
}

const metaballs: Metaball[] = [
  new Metaball(
    Math.floor(WIDTH_IN_CELLS * 0.5),
    Math.floor(HEIGHT_IN_CELLS * 0.7),
    1.25
  ),
  new Metaball(
    Math.floor(WIDTH_IN_CELLS * 0.3),
    Math.floor(HEIGHT_IN_CELLS * 0.2),
    1.25
  ),
  new Metaball(
    Math.floor(WIDTH_IN_CELLS * 0.7),
    Math.floor(HEIGHT_IN_CELLS * 0.3),
    1.25
  ),
];

export function step(prev: number[], params: IsoblobsParams): number[] {
  let { speedScalar, horizontal, vertical } = params;
  speedScalar =
    speedScalar === undefined ? initialIsoblobsParams.speedScalar : speedScalar;
  horizontal =
    horizontal === undefined ? initialIsoblobsParams.horizontal : horizontal;
  vertical = vertical === undefined ? initialIsoblobsParams.vertical : vertical;
  const next = new Array(prev.length).fill(0);

  const now = Date.now();

  metaballs[0].currX =
    metaballs[0].x + 5 * horizontal * Math.sin((speedScalar * now) / 1020);
  metaballs[0].currY =
    metaballs[0].y + 5 * vertical * Math.cos((speedScalar * now) / 934);
  metaballs[1].currX =
    metaballs[1].x + 5 * horizontal * Math.sin((speedScalar * now) / 753);
  metaballs[1].currY =
    metaballs[1].y + 5 * vertical * Math.cos((speedScalar * now) / 1100);
  metaballs[2].currX =
    metaballs[2].x + 5 * horizontal * Math.sin((speedScalar * now) / 939);
  metaballs[2].currY =
    metaballs[2].y + 5 * vertical * Math.cos((speedScalar * now) / 873);

  for (let i = 0; i < WIDTH_IN_CELLS; i++) {
    for (let j = 0; j < HEIGHT_IN_CELLS; j++) {
      let sum = 0;
      for (const metaball of metaballs) {
        sum += metaball.influence(i, j);
      }
      next[i + j * WIDTH_IN_CELLS] = sum;
    }
  }

  return next;
}
