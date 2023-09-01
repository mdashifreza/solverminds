import React, { useRef, useEffect, useState } from "react";

export default function App() {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the zoomed font size
    const fontSize = Math.min(14, 14 / zoom);

    // Draw the grid
    const cellSize = 50 * zoom;
    const rows = 5;
    const cols = columns;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellSize;
        const y = row * cellSize;

        // Draw rectangle
        ctx.strokeRect(x, y, cellSize, cellSize);

        // Draw symbols in corners
        if (col === 0) {
          ctx.fillText("▲", x + 5, y + 20);
        } else if (col === cols - 1) {
          ctx.beginPath();
          ctx.arc(x + cellSize - 25, y + 25, 15, 0, 2 * Math.PI);
          ctx.stroke();
        } else {
          const symbols = ["RE", "$", "*", ""];
          symbols.forEach((symbol, index) => {
            const cornerX = x + (index % 2) * (cellSize - fontSize);
            const cornerY = y + Math.ceil(index / 2) * (cellSize - fontSize);

            //the zoom level
            const opacity = zoom >= 1 ? 1 : Math.max(0, 1 - zoom * 1.5);
            // Seting symbol's opacity
            ctx.globalAlpha = opacity;

            // Drawing symbol
            ctx.fillText(symbol, cornerX, cornerY);
            // Reset the opacity
            ctx.globalAlpha = 1;
          });

          // Draw center number
          const centerX = x + cellSize / 2 - fontSize / 2;
          const centerY = y + cellSize / 2 + fontSize / 2;
          ctx.fillText("1", centerX, centerY);
        }
      }
    }
  }, [zoom, columns]);
  return (
    <div style={{margin: '50px'}}>
      <div style={{marginBottom: '10px'}}>
        <label>Number of Columns: </label>
        <input
          type="number"
          value={columns}
          min={1}
          max={10}
          onChange={(e) => setColumns(parseInt(e.target.value))}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={columns * 50 * zoom}
        height={250 * zoom}
        style={{ border: "1px solid black" }}
      />
      <button onClick={() => setZoom(zoom + 0.1)}>Zoom In</button>
      <button onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}>
        Zoom Out
      </button>
    </div>
  );
}
