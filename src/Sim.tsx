import React, { useEffect } from "react";
import "./App.css";
import { useAppState } from "./hooks/useAppState";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WIDTH_IN_CELLS, HEIGHT_IN_CELLS, CELL_SIZE } from "./constants";
import { TinyColor } from "@ctrl/tinycolor";

const maxColor = new TinyColor("#FFFF77");
const minColor = new TinyColor("#0E0E00");

const getColorFromRange = (pct: number) => {
  return minColor.mix(maxColor, pct);
};

export const Sim: React.FC = () => {
  const { state } = useAppState();
  const { ephemeral, persistent } = state;
  const { board } = ephemeral;
  const { showLeds } = persistent;
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null);

  const setCanvasRef = (canvas: HTMLCanvasElement | null) => {
    setCanvas(canvas);
  };

  useEffect(() => {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#0E0E00";
        ctx.fillRect(
          0,
          0,
          WIDTH_IN_CELLS * CELL_SIZE,
          HEIGHT_IN_CELLS * CELL_SIZE
        );
        for (let i = 0; i < WIDTH_IN_CELLS; i++) {
          for (let j = 0; j < HEIGHT_IN_CELLS; j++) {
            const idx = i + j * WIDTH_IN_CELLS;
            const cellValue = board[idx];
            const color = getColorFromRange(cellValue * 100);
            if (showLeds) {
              // Draw as a circle in the center of the cell
              ctx.fillStyle = color.toHexString();
              ctx.beginPath();
              ctx.arc(
                i * CELL_SIZE + CELL_SIZE / 2,
                j * CELL_SIZE + CELL_SIZE / 2,
                CELL_SIZE / 3,
                0,
                2 * Math.PI
              );
              ctx.fill();
            } else {
              // Fill the cell
              ctx.fillStyle = color.toHexString();
              ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
          }
        }
      }
    }
  }, [canvas, board, showLeds]);

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Sim</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          width={WIDTH_IN_CELLS * CELL_SIZE}
          height={HEIGHT_IN_CELLS * CELL_SIZE}
          ref={setCanvasRef}
        ></canvas>
      </CardContent>
    </Card>
  );
};
