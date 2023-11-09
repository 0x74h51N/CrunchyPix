"use client";
import React, { createContext, useState } from "react";

export const DropdownContext = createContext<
  | {
      isDropdownOpen: boolean;
      setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const DropdownProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isDropdownOpen, setIsDropdownOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};
