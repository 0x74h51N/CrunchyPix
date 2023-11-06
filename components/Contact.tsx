"use client";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import { ColorfulBorder } from "./ColorfulBorder";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Full Name"
          className={`w-full rounded-md border border-transparent bg-neutral-600  py-3 px-6 text-base font-medium text-gray-700 outline-none ${
            errors.name ? "focus:border-red-700" : "focus:border-log-col"
          } focus:shadow-md`}
          {...register("name", { required: true })}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          placeholder="example@domain.com"
          className={`w-full rounded-md border border-transparent  bg-neutral-600 py-3 px-6 text-base font-medium text-gray-700 outline-none ${
            errors.name ? "focus:border-red-700" : "focus:border-log-col"
          } focus:shadow-md`}
          {...register("email", { required: true })}
        />{" "}
      </div>
      <div className="mb-3">
        <textarea
          rows={4}
          placeholder="Type your message..."
          className={`w-full rounded-md border border-transparent bg-neutral-600 py-3 px-6 text-base font-medium text-gray-700 outline-none ${
            errors.name ? "focus:border-red-700" : "focus:border-log-col"
          } focus:shadow-md`}
          {...register("message", { required: true })}
        ></textarea>
      </div>

      <button className="hover:shadow-form rounded-md bg-neutral-500 bg-opacity-70 py-3 px-8 text-base font-semibold text-white outline-none hover:bg-opacity-100 active:bg-log-col">
        Submit
      </button>
    </form>
  );
};

export default Contact;
