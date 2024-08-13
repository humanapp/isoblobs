import {
  AlgorithmId,
  IsoblobsParams,
  PerlinWindParams,
  LightCookiesParams,
  initialIsoblobsParams,
  initialPerlinWindParams,
  initialLightCookiesParams,
} from "../types";
import { WIDTH_IN_CELLS, HEIGHT_IN_CELLS } from "../constants";

export type AlgorithmParams =
  | IsoblobsParams
  | PerlinWindParams
  | LightCookiesParams;

export type EphimeralState = {
  board: number[]; // WIDTH_IN_CELLS * HEIGHT_IN_CELLS
  lightCookiesParams: LightCookiesParams;
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
    lightCookiesParams: { ...initialLightCookiesParams },
  },
  persistent: {
    showLeds: false,
    algorithm: AlgorithmId.ISOBLOBS,
    isoBlobsParams: { ...initialIsoblobsParams },
    perlinWindParams: { ...initialPerlinWindParams },
  },
};
