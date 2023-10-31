"use client";
import Head from "next/head";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import styles from "./countDown.module.css";
import Footer from "./Footer";
import { Navbar } from "./Navbar";

type CountdownTimerProps = {
  children: ReactNode;
};

const CountdownTimer = ({ children }: CountdownTimerProps) => {
  //Binding element 'children' implicitly has an 'any' type.ts(7031)
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("10/29/2023 12:39:59");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

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
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {partyTime ? (
        <>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </>
      ) : (
        <>
          <Head>
            <title>Countdown Timer</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="timer-wrapper">
            <div className="timer-inner">
              <div className="timer-segment">
                <span className="time">{days}</span>
                <span className="label">Days</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{hours}</span>
                <span className="label">Hours</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{minutes}</span>
                <span className="label">Minutes</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{seconds}</span>
                <span className="label">Seconds</span>
              </div>
            </div>
          </div>
          <Image
            alt="background image"
            src="/image.webp"
            layout="fill"
            quality={100}
          />
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
