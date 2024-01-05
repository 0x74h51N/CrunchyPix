"use client";
import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [partyTime, setPartyTime] = useState(false);
  const [targetDate, setTargetDate] = useState(new Date("01/12/2024 21:19:59"));

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
        setTimeout(() => {
          setPartyTime(false);
          setTargetDate((prevTargetDate) => {
            const newTargetDate = new Date(prevTargetDate);
            newTargetDate.setDate(newTargetDate.getDate() + 14);
            newTargetDate.setHours(15, 0, 0, 0);
            return newTargetDate;
          });
        }, 2 * 24 * 60 * 60 * 1000);
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div>
      {partyTime ? (
        <div className="text-center">
          <h2 className="h2">It's Party Time!</h2>
          <p className="h3">IMPACT!</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8">
          <h2 className="h1 text-center">
            Jasmin
            <br />
            Countdown Timer
          </h2>
          <div className="flex flex-row gap-6 h3 justify-center items-center">
            <div className="flex flex-col justify-center items-center p-4 bg-cool-gray-600 rounded-lg w-[120px]">
              <span className="time">{days}</span>
              <span className="label">Days</span>
            </div>
            <span className="divider">:</span>
            <div className="flex flex-col justify-center items-center p-4 bg-cool-gray-600 rounded-lg w-[120px]">
              <span className="time">{hours}</span>
              <span className="label">Hours</span>
            </div>
            <span className="divider">:</span>
            <div className="flex flex-col justify-center items-center p-4 bg-cool-gray-600 rounded-lg w-[120px]">
              <span className="time">{minutes}</span>
              <span className="label">Minutes</span>
            </div>
            <span className="divider">:</span>
            <div className="flex flex-col justify-center items-center p-4 bg-cool-gray-600 rounded-lg w-[120px]">
              <span className="time">{seconds}</span>
              <span className="label">Seconds</span>
            </div>
          </div>
          <h2 className="h2">Left To Impact!</h2>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
