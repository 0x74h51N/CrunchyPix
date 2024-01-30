"use client";
import { memo, useMemo } from "react";
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
      className="w-full h-full"
    >
      {imagePaths.map((imagePath, index) => (
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
  );
};

export default memo(CatalogueViewer);
