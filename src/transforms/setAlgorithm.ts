import { stateAndDispatch } from "../state/Context";
import { Action } from "../state/actions";
import { reducer } from "../state/reducer";
import * as storage from "../services/storage";
import { Algorithm } from "../types";

export function setAlgorithm(algorithm: Algorithm) {
  const { state, dispatch } = stateAndDispatch();
  const action: Action = { type: "SET_ALGORITHM", algorithm };
  const newState = reducer(state, action);
  dispatch(action);
  storage.setPersistentState(newState.persistent);
}
