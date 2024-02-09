"use client";
import { RootState } from "@/store";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getCookie, hasCookie } from "cookies-next";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const Cookies = () => {
  const cookiesConsent = useSelector(
    (state: RootState) => state.cookieConsent.cookieConsent
  );
  const beforeSendHandler = useCallback(
    (e: any) => {
      if (
        hasCookie("cookiesConsent") &&
        getCookie("cookiesConsent") === "true"
      ) {
        return e;
      }
      return null;
    },
    [cookiesConsent]
  );

  useEffect(() => {
    beforeSendHandler(undefined);
  }, [cookiesConsent]);

  return (
    <>
      <Analytics mode="auto" beforeSend={beforeSendHandler} />
      <SpeedInsights beforeSend={beforeSendHandler} />
    </>
  );
};

export default Cookies;
