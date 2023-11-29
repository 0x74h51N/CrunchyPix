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
  const { t } = useTranslation(["translation"]);

  return (
    <>
      <h1 className="text-start text-stone-200 text-2xl font-medium mb-3">
        {t("contact.title")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            type="text"
            placeholder={t("contact.placeName")}
            className={`contactBox ${
              errors.name
                ? "focus:border-red-700"
                : "focus:border-log-col focus:shadow-inner"
            } `}
            {...register("name", { required: true })}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="example@domain.com"
            className={`contactBox ${
              errors.name
                ? "focus:border-red-700"
                : "focus:border-log-col focus:shadow-inner"
            } `}
            {...register("email", { required: true })}
          />{" "}
        </div>
        <div className="mb-3">
          <textarea
            rows={4}
            placeholder={t("contact.placeMessage")}
            className={`contactBox ${
              errors.name ? "focus:border-red-700" : "focus:border-log-col"
            } focus:shadow-md`}
            {...register("message", { required: true })}
          ></textarea>
        </div>

        <button className="hover:shadow-form rounded-md bg-neutral-500 bg-opacity-70 py-3 px-8 text-base font-semibold text-white outline-none hover:bg-opacity-100 active:bg-log-col">
          {t("contact.button")}
        </button>
      </form>
    </>
  );
};

export default Contact;
