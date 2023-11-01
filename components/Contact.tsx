"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-3 block text-base font-medium text-white"
        >
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-md border border-gray-300 bg-zinc-600 py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-slate-500 focus:shadow-md"
          {...register("name", { required: true })}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-3 block text-base font-medium text-white"
        >
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@domain.com"
          className="w-full rounded-md border border-gray-300 bg-zinc-600 py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-slate-500 focus:shadow-md"
          {...register("email", { required: true })}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="message"
          className="mb-3 block text-base font-medium text-white"
        >
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Type your message"
          className="w-full resize-none rounded-md border border-gray-300 bg-zinc-600 py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-slate-500 focus:shadow-md"
          {...register("message", { required: true })}
        ></textarea>
      </div>
      <div>
        <button className="hover:shadow-form rounded-md bg-slate-500 bg-opacity-70 py-3 px-8 text-base font-semibold text-white outline-none hover:bg-opacity-100">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Contact;
