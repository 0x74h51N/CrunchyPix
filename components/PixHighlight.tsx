import React, { useState, useEffect } from "react";

interface PixHighlightProps {
  children: string;
}

const PixHighlight: React.FC<PixHighlightProps> = ({ children }) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const delay = 700;
    const timer = setTimeout(() => {
      setHighlight(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const text = children;
  const pixIndex = text.indexOf("Pix");

  return (
    <span>
      <span>{text.substring(0, 6)}</span>
      {highlight ? (
        <span className={highlight ? "pix-text" : ""}>Pix</span>
      ) : null}
      <span>{text.substring(9)}</span>
    </span>
  );
};

export default PixHighlight;
