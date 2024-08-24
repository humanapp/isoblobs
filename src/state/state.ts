import {
  AlgorithmId,
  IsoblobsParams,
  PerlinWindParams,
  LightCookiesParams,
  initialIsoblobsParams,
  initialPerlinWindParams,
  initialLightCookiesParams,
  PlasmaParams,
  initialPlasmaParams,
} from "../types";
import { WIDTH_IN_CELLS, HEIGHT_IN_CELLS } from "../constants";

export type AlgorithmParams =
  | IsoblobsParams
  | PerlinWindParams
  | LightCookiesParams
  | PlasmaParams;

export type EphimeralState = {
  board: number[]; // WIDTH_IN_CELLS * HEIGHT_IN_CELLS
  lightCookiesParams: LightCookiesParams;
  plasmaParams: PlasmaParams;
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
    plasmaParams: { ...initialPlasmaParams },
  },
  persistent: {
    showLeds: false,
    algorithm: AlgorithmId.ISOBLOBS,
    isoBlobsParams: { ...initialIsoblobsParams },
    perlinWindParams: { ...initialPerlinWindParams },
  },
};
