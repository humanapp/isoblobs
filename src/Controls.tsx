import React from "react";
import "./App.css";
import { Slider } from "@/components/ui/slider";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ChevronsUpDown } from "lucide-react";
import { useAppState } from "./hooks/useAppState";
import * as xfrms from "./transforms";
import { AlgorithmId, Algorithms, initialIsoblobsParams } from "./types";

const ShowLEDs: React.FC = () => {
  const { state } = useAppState();
  const { persistent } = state;
  const { showLeds } = persistent;

  const onLedToggle = (value: boolean) => {
    xfrms.setShowLeds(value);
  };

  return (
    <>
      <div className="content-center">LEDs</div>
      <Switch checked={showLeds} onCheckedChange={onLedToggle} />
      <div></div>
    </>
  );
};

const AlgorithmSelector: React.FC = () => {
  const { state } = useAppState();
  const { persistent } = state;

  const onAlgorithmChange = (algorithm: AlgorithmId) => {
    xfrms.setAlgorithm(algorithm);
  };

  return (
    <>
      <div className="content-center">Algorithm</div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="justify-between">
            {Algorithms[persistent.algorithm].name}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.values(Algorithms).map((algorithm) => (
            <DropdownMenuItem
              key={algorithm.id}
              onClick={() => onAlgorithmChange(algorithm.id)}
            >
              {algorithm.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div></div>
    </>
  );
};

const IsoBlobParams: React.FC = () => {
  const { state } = useAppState();
  const { persistent } = state;
  const params = persistent.isoBlobsParams;
  let { speedScalar, horizontal, vertical, count } = params;
  speedScalar =
    speedScalar === undefined ? initialIsoblobsParams.speedScalar : speedScalar;
  horizontal =
    horizontal === undefined ? initialIsoblobsParams.horizontal : horizontal;
  vertical = vertical === undefined ? initialIsoblobsParams.vertical : vertical;
  count = count === undefined ? initialIsoblobsParams.count : count;

  const onSpeedScalarChange = (value: number[]) => {
    xfrms.isoblobs.setSpeedScalar(value[0] / 100);
  };
  const onHorizontalChange = (value: number[]) => {
    xfrms.isoblobs.setHorizontal(value[0] / 100);
  };
  const onVerticalChange = (value: number[]) => {
    xfrms.isoblobs.setVertical(value[0] / 100);
  };
  const onCountChange = (value: number[]) => {
    xfrms.isoblobs.setCount(value[0]);
  };

  return (
    <>
      <div className="content-center">Speed</div>
      <Slider
        className="w-100"
        min={0}
        max={100}
        value={[speedScalar * 100]}
        onValueChange={onSpeedScalarChange}
      />
      <div>{Math.round(speedScalar * 100)}%</div>
      <div className="content-center">Horizontal</div>
      <Slider
        className="w-100"
        min={0}
        max={100}
        value={[horizontal * 100]}
        onValueChange={onHorizontalChange}
      />
      <div>{Math.round(horizontal * 100)}%</div>

      <div className="content-center">Vertical</div>
      <Slider
        className="w-100"
        min={0}
        max={100}
        value={[vertical * 100]}
        onValueChange={onVerticalChange}
      />
      <div>{Math.round(vertical * 100)}%</div>

      <div className="content-center">Blob Count</div>
      <Slider
        className="w-100"
        min={0}
        max={10}
        value={[count]}
        onValueChange={onCountChange}
      />
      <div>{count}</div>
    </>
  );
};

export const Controls: React.FC = () => {
  const { state } = useAppState();
  const { persistent } = state;

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2">
        <ShowLEDs />
        <Separator />
        <Separator />
        <Separator />
        <AlgorithmSelector />
        {persistent.algorithm === AlgorithmId.ISOBLOBS && <IsoBlobParams />}
      </CardContent>
    </Card>
  );
};
