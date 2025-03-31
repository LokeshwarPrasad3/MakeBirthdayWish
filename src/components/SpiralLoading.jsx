import { useEffect, useRef } from "react";

const SpiralAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let angle = 0;
    let radius = 2;
    let lineWidth = 5;
    let speedFactor = 0.3;

    const drawSpiral = () => {
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);

      let hue = (angle * 10) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";

      ctx.lineTo(x, y);
      ctx.stroke();

      angle += speedFactor;
      radius += 0.7;

      requestAnimationFrame(drawSpiral);
    };

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    drawSpiral();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, backgroundColor: "#000" }}
    ></canvas>
  );
};

export default SpiralAnimation;