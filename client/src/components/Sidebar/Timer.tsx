/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoginStore } from "@/store/loginStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TimerProps {
  exp: string | null;
}

export const Timer = ({ exp }: TimerProps) => {
  const clearUser = useLoginStore((state: any) => state.clearUser);
  const navigate = useNavigate();
  const [time, setTime] = useState<number>(() => {
    if (exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return exp ? parseInt(exp, 10) - currentTime : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (time <= 0) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          clearUser();
          navigate("/login");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time, clearUser, navigate]);

  const formatTime = (unit: number) => String(unit).padStart(2, "0");
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="timer text-center bg-[#1e1e1e] rounded-lg p-4 text-white shadow-md">
        <h3 className="text-lg font-semibold mb-2">Tiempo Restante</h3>
        <div className="flex space-x-2 text-3xl font-bold">
          <span
            className="jst-minutes animate-pulse text-green-400"
            title="Minutos"
          >
            {formatTime(minutes)}
          </span>
          <span className="text-gray-300">:</span>
          <span
            className="jst-seconds animate-pulse text-red-400"
            title="Segundos"
          >
            {formatTime(seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};
