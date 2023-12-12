import { Icon, slide } from "@/app/common.types";
import { RootState } from "@/store";
import { clearSlide } from "@/store/redux/selectedSlide";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../Buttons/IconButton";
import Label from "../../../Labels";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Loading from "@/components/Loading";
import Link from "next/link";
import CancelButton from "@/components/Buttons/CancelButton";

const SlideModal = () => {
  const [imageLoading, setImageLoading] = useState(true);
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
    setTimeout(() => {
      setImageLoading(true);
    }, 300);
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
      {selectedSlide && (
        <ReactModal
          style={{ overlay: { zIndex: 950 }, content: { zIndex: 951 } }}
          isOpen={!!selectedSlide}
          onRequestClose={closeModal}
          contentLabel="Selected Slide Modal"
          className={`absolute justify-center items-center top-1/2 left-1/2 ${
            isMobile ? "w-[95svw] h-[65svh]" : "w-[63svw] h-[70svh]"
          }  translate-x-[-50%] translate-y-[-50%] outline-none`}
          overlayClassName="overlay"
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
        >
          <motion.div
            className="relative w-full h-full"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            onClick={closeModal}
          >
            <button onClick={closeModal} className="cursor-none">
              <CancelButton />
            </button>
            <Image
              loading="lazy"
              src={selectedSlide.imageUrl || ""}
              alt={selectedSlide.title || ""}
              width={1000}
              height={1000}
              style={{ objectFit: isMobile ? "cover" : "contain" }}
              quality={100}
              className=" object-cover w-full h-full"
              onLoad={() => {
                setImageLoading(false);
              }}
            />
            {imageLoading ? (
              <Loading />
            ) : (
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
                <h2 className="text-lg font-bold">
                  {t(`${selectedSlide.title}`)}
                </h2>
                <p
                  className={`font-extralight overflow-hidden overflow-ellipsis line-clamp-1 ${
                    isMobile ? "text-[10px]" : "text-[13px]"
                  } `}
                >
                  {t(`${selectedSlide.description}`)}
                </p>
                <Link
                  href={"/portfolio"}
                  key={"portfolio"}
                  title={t("projectSlides.0.title2")}
                  className={`font-extralight overflow-hidden overflow-ellipsis line-clamp-1 hover:text-log-col underline underline-offset-1 ${
                    isMobile ? "text-[10px]" : "text-[13px]"
                  } `}
                >
                  {t("projectSlides.0.click")}
                </Link>

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
                      selectedSlide.icons.map(
                        (icon: Icon, iconIndex: number) => (
                          <IconButton key={iconIndex} icon={icon} />
                        )
                      )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </ReactModal>
      )}
    </AnimatePresence>
  );
};

export default SlideModal;
