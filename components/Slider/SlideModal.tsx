import { slide } from "@/app/common.types";
import { RootState } from "@/store";
import { clearSlide } from "@/store/redux/selectedSlide";
import React from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import GitHubButton from "./githubButton";
import Label from "../Labels";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const SlideModal = () => {
  const { t } = useTranslation(["translation"]);

  const dispatch = useDispatch();
  const selectedSlide: slide | any = useSelector(
    (state: RootState) => state.selectedSlide
  );
  const closeModal = () => {
    dispatch(clearSlide());
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <AnimatePresence>
      <ReactModal
        isOpen={!!selectedSlide}
        onRequestClose={closeModal}
        contentLabel="Selected Slide Modal"
        className="modal"
        overlayClassName="overlay"
        shouldCloseOnOverlayClick={true}
      >
        {selectedSlide && (
          <motion.div
            className="modal-content"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            onClick={closeModal}
          >
            <img
              src={selectedSlide.imageUrl}
              alt={selectedSlide.title}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
              <h2 className="text-lg font-bold">
                {t(`${selectedSlide.title}`)}
              </h2>
              <p className="text-[13px] font-extralight">
                {t(`${selectedSlide.description}`)}
              </p>
              <div className="flex flex-wrap">
                {selectedSlide.labels &&
                  selectedSlide.labels.map(
                    (label: string, labelIndex: number) => (
                      <Label key={labelIndex} text={label} />
                    )
                  )}
                {selectedSlide.githubLink && (
                  <GitHubButton githubLink={selectedSlide.githubLink} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </ReactModal>
    </AnimatePresence>
  );
};

export default SlideModal;
