import { CSSProperties, useEffect, useRef, memo } from 'react';

interface ColorfulBorderProps {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}

const ColorfulBorder: React.FC<ColorfulBorderProps> = ({
  children,
  className,
  enabled = true,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const boxElement = boxRef.current;
    if (!boxElement) return;

    let animationFrameId: number;
    const updateAnimation = () => {
      const angle =
        (parseFloat(boxElement.style.getPropertyValue('--angle')) + 0.7) % 360;
      boxElement.style.setProperty('--angle', `${angle}deg`);
      animationFrameId = requestAnimationFrame(updateAnimation);
    };

    animationFrameId = requestAnimationFrame(updateAnimation);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  return enabled ? (
    <div
      ref={boxRef}
      style={
        {
          '--angle': '0deg',
          '--border-color':
            'linear-gradient(var(--angle), #131313 55%, #ffffff)',
          '--bg-color': 'radial-gradient(#131313, #131313)',
        } as CSSProperties
      }
      className={`${className} flex h-auto w-auto items-center justify-center rounded-lg border-[1px] border-transparent [background:padding-box_var(--bg-color),border-box_var(--border-color)]`}
    >
      {children}
    </div>
  ) : (
    <div className=" bg-neutral-800 rounded-lg">{children}</div>
  );
};

export default memo(ColorfulBorder);
