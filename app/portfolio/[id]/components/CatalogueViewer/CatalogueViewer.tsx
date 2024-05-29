"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import FlipButton from "./FlipButton";
import { CldImage } from "next-cloudinary";
import { getFlipBookConfig } from "./config";

const CatalogueViewer = ({
  Item,
}: {
  Item: { folderPath: string; pageNumber: number };
}) => {
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [mouseEvent, setMouseEvent] = useState(false);
  const isTouch = useSelector((state: RootState) => state.isTouch.touch);
  const screenWidth = useSelector((state: RootState) => state.screenWidth.width);
  
  const [flipBookConfig, setFlipBookConfig] = useState(()=>getFlipBookConfig(screenWidth));
  useEffect(()=>{
  const flipBookConfig = getFlipBookConfig(screenWidth);
    setFlipBookConfig(flipBookConfig)
  },[screenWidth])

  const imagePaths = useMemo(() => {
    const folderPath = Item.folderPath;
    const pageNumber = Item.pageNumber;
    const paths: string[] = [];
    for (let count = 1; count <= pageNumber; count++) {
      const imagePath = `${folderPath}/page${count}.png`;
      if (imagePath.endsWith(".png")) {
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
    <div className="w-full h-auto relative">
      <HTMLFlipBook
        ref={flipBookRef}
        useMouseEvents={mouseEvent}
        {...flipBookConfig}
        className= "w-full h-full relative"
      >
        {imagePaths.length > 1 &&
          imagePaths.map((imagePath, index) => (
            <div key={index}>
            <CldImage
              src={imagePath}
              alt={`Page-${index + 1}`}
              fetchPriority="auto"
              quality="auto"
              loading="eager"
              fill
              sizes="(max-width: 700px) 100vw, 40vw"
              style={{
                objectFit: "cover",
              }}
              placeholder="empty"
              className="w-full h-full bg-white "
            /></div>
          ))}
      </HTMLFlipBook>
      {!isTouch && imagePaths.length > 0 && (
        <>
          {currentPage === Math.floor(imagePaths.length / 2) ? null : (
            <FlipButton onClick={handleNextPage} currentPage={currentPage} />
          )}
          {currentPage == 0 ? null : (
            <FlipButton
              directionLeft
              onClick={handlePrevPage}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CatalogueViewer;
