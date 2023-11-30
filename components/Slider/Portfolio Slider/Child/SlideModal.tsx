import { Icon, slide } from "@/app/common.types";
import { RootState } from "@/store";
import { clearSlide } from "@/store/redux/selectedSlide";
import React, { useEffect } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../IconButton";
import Label from "../../../Labels";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const SlideModal = () => {
  const { t } = useTranslation(["translation"]);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const dispatch = useDispatch();
  const selectedSlide = useSelector(
    (state: RootState) => state.selectedSlide.selectedSlide
  );
  const isScrolled = useSelector(
    (state: RootState) => state.isScrolled.scrolled
  );
  const closeModal = () => {
    dispatch(clearSlide());
  };
  useEffect(() => {
    if (isScrolled) {
      closeModal();
    }
  }, [isScrolled]);
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <AnimatePresence>
      <ReactModal
        style={{ overlay: { zIndex: 1000 }, content: { zIndex: 1001 } }}
        isOpen={!!selectedSlide}
        onRequestClose={closeModal}
        contentLabel="Selected Slide Modal"
        className={`absolute flex justify-center items-center top-1/2 left-1/2 ${
          isMobile ? "w-[92svw] h-[70svh]" : "w-[63svw] h-[70svh]"
        }  translate-x-[-50%] translate-y-[-50%] outline-none`}
        overlayClassName="overlay"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        {selectedSlide && (
          <motion.div
            className="relative w-auto h-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            onClick={closeModal}
          >
            <Image
              loading="lazy"
              src={selectedSlide.imageUrl || ""}
              alt={selectedSlide.title || ""}
              width={1150}
              height={850}
              style={{ objectFit: isMobile ? "cover" : "contain" }}
              quality={100}
              className="object-fill w-auto h-auto"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
              <h2 className="text-lg font-bold">
                {t(`${selectedSlide.title}`)}
              </h2>
              <p
                className={` font-extralight ${
                  isMobile
                    ? "overflow-hidden overflow-ellipsis line-clamp-3 text-[10px]"
                    : "text-[13px]"
                } `}
              >
                {t(`${selectedSlide.description}`)}
              </p>
              <div className="flex">
                <div className="flex flex-wrap items-start mr-auto">
                  {selectedSlide.labels &&
                    selectedSlide.labels.map(
                      (label: string, labelIndex: number) => (
                        <Label key={labelIndex} text={label} />
                      )
                    )}
                </div>
                <div className="flex items-end gap-2">
                  {selectedSlide.icons &&
                    selectedSlide.icons.map((icon: Icon, iconIndex: number) => (
                      <IconButton key={iconIndex} icon={icon} />
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </ReactModal>
    </AnimatePresence>
  );
};

export default SlideModal;
