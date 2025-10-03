import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import LiquidGauge from "react-liquid-gauge"; // Corrected main import

// 1. УДАЛИТЬ НЕПРАВИЛЬНЫЙ ИМПОРТ:
// import { interpolateColor } from "react-liquid-gauge"; // 👈 This was the error

export interface WaterCircleRef {
  addWater: (amount?: number) => void;
  removeWater: (amount?: number) => void;
  setWater: (value: number) => void;
}

interface WaterCircleProps {
  maxValue?: number;
}

// 2. ДОБАВИТЬ ЭТУ ВСПОМОГАТЕЛЬНУЮ ФУНКЦИЮ:
// This function will blend two colors based on a percentage.
const interpolateColor = (color1: string, color2: string, factor: number) => {
  const result = color1
    .slice(1)
    .match(/.{2}/g)!
    .map((hex, i) => {
      const c1 = parseInt(hex, 16);
      const c2 = parseInt(color2.slice(1).match(/.{2}/g)![i], 16);
      const blended = Math.round(c1 + factor * (c2 - c1));
      return ("0" + blended.toString(16)).slice(-2);
    })
    .join("");
  return `#${result}`;
};

const WaterCircle = forwardRef<WaterCircleRef, WaterCircleProps>(
  ({ maxValue = 200 }, ref) => {
    const [value, setValue] = useState(0);
    const [target, setTarget] = useState(0);

    const percentage = (value / maxValue) * 100;

    useImperativeHandle(ref, () => ({
      addWater: (amount = 10) => {
        setTarget((currentTarget) =>
          Math.min(currentTarget + amount, maxValue)
        );
      },
      removeWater: (amount = 10) => {
        setTarget((currentTarget) => Math.max(currentTarget - amount, 0));
      },
      setWater: (val: number) => {
        const newTarget = Math.max(0, Math.min(val, maxValue));
        setTarget(newTarget);
      },
    }));

    useEffect(() => {
      if (value === target) return;
      const timeout = 20;
      const step = target > value ? 1 : -1;
      const interval = setInterval(() => {
        setValue((currentValue) => {
          const nextValue = currentValue + step;
          if (
            (step > 0 && nextValue >= target) ||
            (step < 0 && nextValue <= target)
          ) {
            clearInterval(interval);
            return target;
          }
          return nextValue;
        });
      }, timeout);
      return () => clearInterval(interval);
    }, [target, value]);

    const startColor = "#4facfe"; // Lighter blue
    const endColor = "#05668d"; // Darker blue for full state
    const radius = 110;

    // 3. ТЕПЕРЬ ЭТА СТРОКА БУДЕТ РАБОТАТЬ ПРАВИЛЬНО:
    const waveColor = interpolateColor(startColor, endColor, value / maxValue);

    return (
      <div className="w-64 h-64 mx-auto my-4">
        <LiquidGauge
          style={{ margin: "0 auto" }}
          width={radius * 2}
          height={radius * 2}
          value={percentage}
          textRenderer={() => {
            return (
              <tspan>
                <tspan style={{ fontSize: "36px", fontWeight: "bold" }}>
                  {Math.round(value)}
                </tspan>
                <tspan style={{ fontSize: "16px" }} dy="-20">
                  /{maxValue}
                </tspan>
              </tspan>
            );
          }}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={4}
          circleStyle={{ fill: "#e0f7fa" }}
          waveStyle={{ fill: waveColor }}
          textStyle={{ fill: "#444", fontFamily: "Arial" }}
          waveTextStyle={{ fill: "#fff", fontFamily: "Arial" }}
        />
      </div>
    );
  }
);

export default WaterCircle;
