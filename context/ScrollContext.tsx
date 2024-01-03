"use client";
import { createContext, useContext, ReactNode } from "react";

interface ScrollContextProps {
  sectionRefs: React.RefObject<HTMLDivElement>[];
}

const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

export const ScrollProvider: React.FC<
  { children: ReactNode } & ScrollContextProps
> = ({ children, ...props }) => (
  <ScrollContext.Provider value={props}>{children}</ScrollContext.Provider>
);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};
