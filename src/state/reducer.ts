import { AppState } from "./state";
import { Action, CommonAction, IsoblobsAction, PerlinWindAction } from "./actions";

function commonReducer(state: AppState, action: CommonAction): AppState {
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
        },
      };
    }
  }
}

function isoBlobsReducer(state: AppState, action: IsoblobsAction): AppState {
  switch (action.type) {
    case "ISOBLOBS_SET_SPEED_SCALAR": {
      return {
        ...state,
        persistent: {
          ...state.persistent,
          isoBlobsParams: { ...state.persistent.isoBlobsParams, speedScalar: action.speedScalar },
        },
      };
    }
    case "ISOBLOBS_SET_HORIZONTAL": {
      return {
        ...state,
        persistent: {
          ...state.persistent,
          isoBlobsParams: { ...state.persistent.isoBlobsParams, horizontal: action.horizontal },
        },
      };
    }
    case "ISOBLOBS_SET_VERTICAL": {
      return {
        ...state,
        persistent: {
          ...state.persistent,
          isoBlobsParams: { ...state.persistent.isoBlobsParams, vertical: action.vertical },
        },
      };
    }
    case "ISOBLOBS_SET_COUNT": {
      return {
        ...state,
        persistent: {
          ...state.persistent,
          isoBlobsParams: { ...state.persistent.isoBlobsParams, count: action.count },
        },
      };
    }
  }
}

function perlinWindReducer(state: AppState, action: PerlinWindAction): AppState {
  switch (action.type) {
    case "PERLINWIND_SET_SPEED_SCALAR": {
      return {
        ...state,
        persistent: {
          ...state.persistent,
          perlinWindParams: { ...state.persistent.perlinWindParams, speedScalar: action.speedScalar },
        },
      };
    }
  }
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_SHOW_LEDS":
    case "SET_ALGORITHM":
    case "SET_BOARD": {
      return commonReducer(state, action);
    }
    case "ISOBLOBS_SET_SPEED_SCALAR":
    case "ISOBLOBS_SET_HORIZONTAL":
    case "ISOBLOBS_SET_VERTICAL":
    case "ISOBLOBS_SET_COUNT": {
      return isoBlobsReducer(state, action);
    }
    case "PERLINWIND_SET_SPEED_SCALAR": {
      return perlinWindReducer(state, action);
    }
  }
}
