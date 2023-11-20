import { useRef, useEffect, CSSProperties } from "react";

export const ColorfulBorder: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boxElement = boxRef.current;

    if (!boxElement) {
      return;
    }

    const updateAnimation = () => {
      const angle =
        (parseFloat(boxElement.style.getPropertyValue("--angle")) + 0.5) % 360;
      boxElement.style.setProperty("--angle", `${angle}deg`);
      requestAnimationFrame(updateAnimation);
    };

    requestAnimationFrame(updateAnimation);
  }, []);

  return (
    <div
      ref={boxRef}
      style={
        {
          "--angle": "0deg",
          "--border-color": "linear-gradient(var(--angle), #000000, #687aff)",
          "--bg-color": "linear-gradient(#202020, #131219)",
        } as CSSProperties
      }
      className={`${className} flex h-auto w-auto items-center justify-center rounded-2xl border-2 border-transparent  [background:padding-box_var(--bg-color),border-box_var(--border-color)]`}
    >
      {children}
    </div>
  );
};
