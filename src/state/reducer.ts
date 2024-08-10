import { AppState } from "./state";
import { Action } from "./actions";
import { AlgorithmId } from "../types";

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_SHOW_LEDS": {
      return {
        ...state,
        persistent: {
          ...state.persistent,
          showLeds: action.showLeds,
        },
      };
    }
    case "SET_ALGORITHM": {
      return {
        ...state,
        persistent: {
          ...state.persistent,
          algorithm: action.algorithm,
        },
      };
    }
    case "SET_BOARD": {
      return {
        ...state,
        ephemeral: {
          ...state.ephemeral,
          board: action.board,
          generation: state.ephemeral.generation + 1, // Idempotency not a concern here
        },
      };
    }
    case "ISOBLOBS_SET_SPEED_SCALAR": {
      const newState = {
        ...state,
        persistent: {
          ...state.persistent,
          params: [...state.persistent.params],
        },
      };
      newState.persistent.params[AlgorithmId.ISOBLOBS].speedScalar =
        action.speedScalar;
      return newState;
    }
    case "ISOBLOBS_SET_HORIZONTAL": {
      const newState = {
        ...state,
        persistent: {
          ...state.persistent,
          params: [...state.persistent.params],
        },
      };
      newState.persistent.params[AlgorithmId.ISOBLOBS].horizontal =
        action.horizontal;
      return newState;
    }
    case "ISOBLOBS_SET_VERTICAL": {
      const newState = {
        ...state,
        persistent: {
          ...state.persistent,
          params: [...state.persistent.params],
        },
      };
      newState.persistent.params[AlgorithmId.ISOBLOBS].vertical = action.vertical;
      return newState;
    }
    case "ISOBLOBS_SET_COUNT": {
      const newState = {
        ...state,
        persistent: {
          ...state.persistent,
          params: [...state.persistent.params],
        },
      };
      newState.persistent.params[AlgorithmId.ISOBLOBS].count = action.count;
      return newState;
    }
  }
}
