export const WIDTH_IN_CELLS = 16;
export const HEIGHT_IN_CELLS = 9;
export const CELLS_ASPECT_RATIO = WIDTH_IN_CELLS / HEIGHT_IN_CELLS;
export const CELL_SIZE = 30;
export const MAX_FPS = 30;

export const ISOBLOBS_MAX_COUNT = 10;

type IsoblobsSimParams = {
  // Value in 0-15 range
  x: number;
  // Value in 0-8 range
  y: number;
  // Value in 0.5-2 range
  r: number;
  // Value in 0-1 range
  h: number;
  // Value in 0-1 range
  v: number;
};

export const Isoblobs_Sim_Params: IsoblobsSimParams[] = [
  { x: 8, y: 5, r: 1.25, h: 0.71, v: 0.4 },
  { x: 5, y: 2, r: 1.25, h: 0.22, v: -0.22 },
  { x: 7, y: 3, r: 1.25, h: -0.31, v: 0.92 },
  { x: 8, y: 1, r: 1.0, h: 0.98, v: 0.54 },
  { x: 5, y: 4, r: 1.0, h: -0.19, v: -0.21 },
  { x: 10, y: 7, r: 1.0, h: 0.5, v: 0.99 },
  { x: 7, y: 2, r: 0.75, h: -0.66, v: 0.29 },
  { x: 9, y: 6, r: 0.75, h: 0.29, v: 0.67 },
  { x: 4, y: 8, r: 0.75, h: -0.57, v: -0.76 },
  { x: 12, y: 1, r: 0.5, h: 0.77, v: 0.11 },
  { x: 13, y: 2, r: 0.5, h: 0.43, v: -0.13 },
  { x: 14, y: 3, r: 0.5, h: -0.32, v: 0.84 },
  { x: 15, y: 5, r: 0.25, h: 0.85, v: -0.48 },
  { x: 3, y: 4, r: 0.25, h: 0.43, v: 0.27 },
  { x: 2, y: 8, r: 0.25, h: -0.34, v: -0.72 },
  { x: 8, y: 6, r: 2, h: 0.17, v: 0.49 },
];
