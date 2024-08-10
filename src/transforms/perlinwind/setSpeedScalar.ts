import { stateAndDispatch } from "../../state/Context";
import { Action } from "../../state/actions";
import { reducer } from "../../state/reducer";
import * as storage from "../../services/storage";

export function setSpeedScalar(speedScalar: number) {
  const { state, dispatch } = stateAndDispatch();
  const action: Action = { type: "PERLINWIND_SET_SPEED_SCALAR", speedScalar };
  const newState = reducer(state, action);
  dispatch(action);
  storage.setPersistentState(newState.persistent);
}
