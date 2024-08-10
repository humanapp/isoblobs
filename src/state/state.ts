import { AlgorithmId, IsoblobsParams, initialIsoblobsParams } from "../types";
import { WIDTH_IN_CELLS, HEIGHT_IN_CELLS } from "../constants";

export type AlgorithmParams = IsoblobsParams;

export type EphimeralState = {
  // Values in 0-1 range
  board: number[]; // WIDTH_IN_CELLS * HEIGHT_IN_CELLS
  generation: number;
};

export type PersistentState = {
  showLeds: boolean;
  algorithm: AlgorithmId;
  params: AlgorithmParams[];
};

export type AppState = {
  ephemeral: EphimeralState;
  persistent: PersistentState;
};

export const initialState: AppState = {
  ephemeral: {
    board: new Array(WIDTH_IN_CELLS * HEIGHT_IN_CELLS).fill(0),
    generation: 0,
  },
  persistent: {
    showLeds: false,
    algorithm: AlgorithmId.ISOBLOBS,
    params: [initialIsoblobsParams],
  },
};
