import React, { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import { AppStateReady } from "./state/Context";
import { usePromise } from "./hooks/usePromise";
import { Controls } from "./Controls";
import { Sim } from "./Sim";
import * as sim from "./services/simulator";

export const App: React.FC = () => {
  const [ready, setReady] = useState(false);

  usePromise(AppStateReady, setReady);

  useEffect(() => {
    if (ready) {
      sim.start();
    }
    return () => {
      sim.stop();
    };
  }, [ready]);

  return (
    <div className="app">
      {ready ? (
        <div className="flex flex-col lg:flex-row gap-2 m-2">
          <Sim />
          <Controls />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
