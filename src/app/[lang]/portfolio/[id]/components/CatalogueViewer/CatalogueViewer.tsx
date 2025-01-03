'use client';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import FlipButton from './FlipButton';
import { CldImage } from 'next-cloudinary';
import { getFlipBookConfig } from './config';

interface FlipBookRefType {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
  };
}

const CatalogueViewer = ({
  Item,
}: {
  Item: { folderPath: string; pageNumber: string };
}) => {
  const flipBookRef = useRef<FlipBookRefType | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [mouseEvent, setMouseEvent] = useState(false);
  const isTouch = useSelector((state: RootState) => state.isTouch.touch);

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [flipBookConfig, setFlipBookConfig] = useState(() =>
    getFlipBookConfig(screenWidth),
  );
  useEffect(() => {
    const flipBookConfig = getFlipBookConfig(screenWidth);
    setFlipBookConfig(flipBookConfig);
  }, [screenWidth, setFlipBookConfig]);

  const imagePaths = useMemo(() => {
    const folderPath = Item.folderPath;
    const pageNumber = Item.pageNumber;
    const paths: string[] = [];
    for (let count = 1; count <= parseInt(pageNumber); count++) {
      const imagePath = `${folderPath}/page${count}.png`;
      if (imagePath.endsWith('.png')) {
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
        className="w-full h-full relative"
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
                  objectFit: 'cover',
                }}
                placeholder="empty"
                className="w-full h-full bg-white "
              />
            </div>
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

export default memo(CatalogueViewer);
