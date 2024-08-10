import { useContext } from "react";
import { AppStateContext } from "../state/Context";

export function useAppState() {
  const { state, dispatch } = useContext(AppStateContext);

  return { state, dispatch };
}
