import { stateAndDispatch } from "../../state/Context";
import { Action } from "../../state/actions";
import { reducer } from "../../state/reducer";
import * as storage from "../../services/storage";

export function setVertical(vertical: number) {
  const { state, dispatch } = stateAndDispatch();
  const action: Action = { type: "ISOBLOBS_SET_VERTICAL", vertical };
  const newState = reducer(state, action);
  dispatch(action);
  storage.setPersistentState(newState.persistent);
}
