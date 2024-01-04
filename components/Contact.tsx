"use client";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import { useTranslation } from "react-i18next";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }
  const { t } = useTranslation(["index"]);

  return (
    <>
      <h1 className="text-start text-stone-300 text-2xl font-medium mb-2">
        {t("contact.title")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-1">
          <input
            type="text"
            placeholder={t("contact.placeName")}
            className={`contactBox max-h-10 ${
              errors.name
                ? "focus:border-red-700"
                : "focus:border-log-col focus:shadow-inner"
            } `}
            {...register("name", { required: true })}
          />
        </div>
        <div className="mb-1">
          <input
            type="email"
            placeholder="example@domain.com"
            className={`contactBox max-h-10 ${
              errors.name
                ? "focus:border-red-700"
                : "focus:border-log-col focus:shadow-inner"
            } `}
            {...register("email", { required: true })}
          />{" "}
        </div>
        <div className="mb-1 flex flex-row gap-1">
          <textarea
            rows={4}
            placeholder={t("contact.placeMessage")}
            className={`contactBox h-20 max-h-40 ${
              errors.name ? "focus:border-red-700" : "focus:border-log-col"
            } focus:shadow-md`}
            {...register("message", { required: true })}
          ></textarea>
          <button className="hover:shadow-form rounded-md bg-neutral-500 bg-opacity-70 py-2 px-4 text-base font-semibold text-white outline-none hover:bg-opacity-100 active:bg-log-col cursor-none">
            {t("contact.button")}
          </button>
        </div>
      </form>
    </>
  );
};

export default Contact;
