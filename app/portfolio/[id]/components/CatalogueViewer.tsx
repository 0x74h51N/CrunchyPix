"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import ArrowSVG from "@/components/Buttons/ArrowSVG";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const CatalogueViewer = ({
  Item,
}: {
  Item: { folderPath: string; pageNumber: number };
}) => {
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [mouseEvent, setMouseEvent] = useState(false);
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const isTouch = useSelector((state: RootState) => state.isTouch.touch);
  const size = screenWidth <= 550 ? "fixed" : "stretch";
  const width =
    screenWidth >= 550
      ? 700
      : screenWidth >= 450
      ? 400
      : screenWidth >= 400
      ? 350
      : 300;
  const height =
    screenWidth >= 550
      ? 700
      : screenWidth >= 450
      ? 400
      : screenWidth >= 400
      ? 350
      : 300;
  const imagePaths = useMemo(() => {
    const folderPath = Item.folderPath;
    const pageNumber = Item.pageNumber;
    const paths: string[] = [];
    for (let count = 1; count <= pageNumber; count++) {
      const imagePath = `${folderPath}/page${count}.jpg`;
      if (imagePath.endsWith(".jpg")) {
        paths.push(imagePath);
      }
    }
    return paths;
  }, [Item.folderPath, Item.pageNumber]);

  const handleNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (isTouch === true) {
      setMouseEvent(true);
    } else if (isTouch === false) {
      setMouseEvent(false);
    }
  }, [isTouch]);
  return (
    <div className="w-full h-auto">
      <HTMLFlipBook
        ref={flipBookRef}
        style={{}}
        startPage={0}
        width={width}
        height={height}
        drawShadow={true}
        flippingTime={1250}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={mouseEvent}
        swipeDistance={0}
        showPageCorners={true}
        disableFlipByClick={true}
        size={size}
        minWidth={140}
        maxWidth={1300}
        minHeight={140}
        maxHeight={1300}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={() => {}}
        onChangeOrientation={() => {}}
        onChangeState={() => {}}
        className="w-full h-full relative"
      >
        {imagePaths.length > 1 &&
          imagePaths.map((imagePath, index) => (
            <Image
              key={index}
              src={imagePath}
              alt={""}
              quality={100}
              fill
              sizes="(max-width: 600px) 100vw, 600px"
              style={{
                objectFit: "cover",
              }}
              loading="lazy"
              placeholder="empty"
              className="w-full h-full bg-white"
            />
          ))}
      </HTMLFlipBook>

      {!isTouch && (
        <>
          <div className="absolute bottom-1/2 right-0  animate-bounceX">
            <div className="hover:stroke-log-col stroke-neutral-900 transition-all ease-in-out duration-500">
              <ArrowSVG
                width={40}
                height={40}
                strokeWidth={2}
                onClick={handleNextPage}
              />
            </div>
          </div>
          {currentPage == 0 ? null : (
            <div className="absolute bottom-1/2 left-0  animate-bounceX">
              <div className="rotate-180 hover:stroke-log-col stroke-neutral-900 transition-all ease-in-out duration-500">
                <ArrowSVG
                  width={40}
                  height={40}
                  strokeWidth={2}
                  onClick={handlePrevPage}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CatalogueViewer;
