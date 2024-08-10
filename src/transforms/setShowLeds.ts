import { stateAndDispatch } from "../state/Context";
import { Action } from "../state/actions";
import { reducer } from "../state/reducer";
import * as storage from "../services/storage";

export function setShowLeds(showLeds: boolean) {
  const { state, dispatch } = stateAndDispatch();
  const action: Action = { type: "SET_SHOW_LEDS", showLeds };
  const newState = reducer(state, action);
  dispatch(action);
  storage.setPersistentState(newState.persistent);
}
