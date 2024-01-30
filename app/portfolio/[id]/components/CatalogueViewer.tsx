"use client";
import { useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

const CatalogueViewer = ({
  Item,
}: {
  Item: { folderPath: string; pageNumber: number };
}) => {
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
  return (
    <HTMLFlipBook
      style={{}}
      // children={{}}
      startPage={0}
      width={600}
      height={600}
      drawShadow={true}
      flippingTime={12}
      usePortrait={false}
      startZIndex={0}
      autoSize={true}
      clickEventForward={true}
      useMouseEvents={true}
      swipeDistance={0}
      showPageCorners={true}
      disableFlipByClick={false}
      size="stretch"
      minWidth={600}
      maxWidth={1300}
      minHeight={600}
      maxHeight={1300}
      maxShadowOpacity={0.5}
      showCover={true}
      mobileScrollSupport={true}
      onFlip={() => {}}
      onChangeOrientation={() => {}}
      onChangeState={() => {}}
      className="w-full h-full"
    >
      {imagePaths.map((imagePath, index) => (
        <Image
          key={index}
          src={imagePath}
          alt={imagePath}
          fill
          loading={"lazy"}
          quality={100}
          className="object-cover"
        />
      ))}
    </HTMLFlipBook>
  );
};

export default CatalogueViewer;
