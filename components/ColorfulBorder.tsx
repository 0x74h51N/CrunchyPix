import { CSSProperties, useEffect, useRef } from "react";

interface ColorfulBorderProps {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}

export const ColorfulBorder: React.FC<ColorfulBorderProps> = ({
  children,
  className,
  enabled = true,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enabled === false) {
      return;
    }

    const boxElement = boxRef.current;

    if (!boxElement) {
      return;
    }

    const updateAnimation = () => {
      const angle =
        (parseFloat(boxElement.style.getPropertyValue("--angle")) + 0.8) % 360;
      boxElement.style.setProperty("--angle", `${angle}deg`);
      requestAnimationFrame(updateAnimation);
    };

    requestAnimationFrame(updateAnimation);
  }, [enabled]);

  return enabled ? (
    <div
      ref={boxRef}
      style={
        {
          "--angle": "0deg",
          "--border-color": "linear-gradient(var(--angle), #111111, #ffffff)",
          "--bg-color": "radial-gradient(#181818, #181818)",
        } as CSSProperties
      }
      className={`${className} flex h-auto w-auto items-center justify-center rounded-lg border-[1px] border-transparent [background:padding-box_var(--bg-color),border-box_var(--border-color)]`}
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  );
};
