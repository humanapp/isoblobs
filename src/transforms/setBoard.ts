import { stateAndDispatch } from "../state/Context";
import { Action } from "../state/actions";
import { reducer } from "../state/reducer";
import * as storage from "../services/storage";

export function setBoard(board: number[]) {
  const { state, dispatch } = stateAndDispatch();
  const action: Action = { type: "SET_BOARD", board };
  const newState = reducer(state, action);
  dispatch(action);
  storage.setPersistentState(newState.persistent);
}
