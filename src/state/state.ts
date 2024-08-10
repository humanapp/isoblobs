import {
  AlgorithmId,
  IsoblobsParams,
  PerlinWindParams,
  initialIsoblobsParams,
  initialPerlinWindParams,
} from "../types";
import { WIDTH_IN_CELLS, HEIGHT_IN_CELLS } from "../constants";

export type AlgorithmParams = IsoblobsParams | PerlinWindParams;

export type EphimeralState = {
  board: number[]; // WIDTH_IN_CELLS * HEIGHT_IN_CELLS
};

export type PersistentState = {
  showLeds: boolean;
  algorithm: AlgorithmId;
  isoBlobsParams: IsoblobsParams;
  perlinWindParams: PerlinWindParams;
};

export type AppState = {
  ephemeral: EphimeralState;
  persistent: PersistentState;
};

export const initialState: AppState = {
  ephemeral: {
    board: new Array(WIDTH_IN_CELLS * HEIGHT_IN_CELLS).fill(0),
  },
  persistent: {
    showLeds: false,
    algorithm: AlgorithmId.ISOBLOBS,
    isoBlobsParams: { ...initialIsoblobsParams },
    perlinWindParams: { ...initialPerlinWindParams },
  },
};
