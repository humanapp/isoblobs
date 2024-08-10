import { PersistentState } from "../state/state";

const KEY_PREFIX = "isoblobs";
const PERSISTENT_STATE_KEY = [KEY_PREFIX, "persistent_state"].join("/");

function getValue(key: string, defaultValue?: string): string | undefined {
  return localStorage.getItem(key) || defaultValue;
}

function setValue(key: string, val: string) {
  localStorage.setItem(key, val);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function delValue(key: string) {
  localStorage.removeItem(key);
}

export function getPersistentState(): PersistentState {
  const state = getValue(PERSISTENT_STATE_KEY);
  return state ? JSON.parse(state) : undefined;
}

export function setPersistentState(state: PersistentState) {
  setValue(PERSISTENT_STATE_KEY, JSON.stringify(state));
}
