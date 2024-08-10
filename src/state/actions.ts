import { AlgorithmId } from "../types";

type ActionBase = {
  type: string;
};

export type SetShowLeds_Action = ActionBase & {
  type: "SET_SHOW_LEDS";
  showLeds: boolean;
};

export type SetAlgorithm_Action = ActionBase & {
  type: "SET_ALGORITHM";
  algorithm: AlgorithmId;
};

export type SetBoard_Action = ActionBase & {
  type: "SET_BOARD";
  board: number[];
};

export type Isoblobs_SetSpeedScalar_Action = ActionBase & {
  type: "ISOBLOBS_SET_SPEED_SCALAR";
  speedScalar: number;
};

export type Isoblobs_SetHorizontal_Action = ActionBase & {
  type: "ISOBLOBS_SET_HORIZONTAL";
  horizontal: number;
};

export type Isoblobs_SetVertical_Action = ActionBase & {
  type: "ISOBLOBS_SET_VERTICAL";
  vertical: number;
};

export type Isoblobs_SetCount_Action = ActionBase & {
  type: "ISOBLOBS_SET_COUNT";
  count: number;
};

export type Action =
  | SetShowLeds_Action
  | SetAlgorithm_Action
  | SetBoard_Action
  | Isoblobs_SetSpeedScalar_Action
  | Isoblobs_SetHorizontal_Action
  | Isoblobs_SetVertical_Action
  | Isoblobs_SetCount_Action;
