import { stateAndDispatch } from "../state/Context";
import { Algorithm } from "../types";
import { MAX_FPS } from "../constants";
import * as algorithms from "../algorithms";
import * as xfrms from "../transforms";

let running: boolean = false;
let lastUpdate: number = 0;
let animFrame: number = 0;

let updating = false;

function update() {
  if (updating) {
    return;
  }
  updating = true;

  const { state } = stateAndDispatch();
  const { ephemeral, persistent } = state;
  const { board } = ephemeral;
  const { algorithm } = persistent;

  const scaledFps = MAX_FPS;
  const scaledSpeed = 1000 / scaledFps;

  const now = Date.now();
  const delta = now - lastUpdate;
  const shouldUpdate = delta >= scaledSpeed;

  if (shouldUpdate) {
    lastUpdate = now;
    switch (algorithm) {
      case Algorithm.ISOBLOBS:
        const nextBoard = algorithms.isoblobs.step(board, persistent.params[Algorithm.ISOBLOBS]);
        xfrms.setBoard(nextBoard);
        break;
    }
  }

  if (running) {
    animFrame = window.requestAnimationFrame(update);
  }
  updating = false;
}

export function start() {
  if (running) {
    return;
  }
  running = true;
  animFrame = window.requestAnimationFrame(update);
}

export function stop() {
  if (!running) {
    return;
  }
  running = false;
  window.cancelAnimationFrame(animFrame);
  animFrame = 0;
}
