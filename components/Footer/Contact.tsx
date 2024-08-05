'use client';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Captcha from './Captcha';
import useClickableHandlers from '@/hooks/useClickableHandlers';

export type FormData = {
  name: string;
  email: string;
  message: string;
  turnstileToken: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();
  const [turnstileToken, setTurnstileToken] = useState('');
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const [pending, setePending] = useState(false);
  const { t } = useTranslation(['index']);
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const onSubmit = async (data: FormData) => {
    setePending(true);
    if (!turnstileToken) {
      alert('Please complete the CAPTCHA challenge.');
      setePending(false);
      return;
    }
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-turnstile-token': turnstileToken,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('0x74h51N - Message send successfully');
      alert(t('contact.submit'));
      reset();
      setCaptchaKey(Date.now());
    } else {
      alert(t('contact.submitFail'));
    }
    setePending(false);
    setTurnstileToken('');
  };
  useEffect(() => {
    setValue('turnstileToken', turnstileToken);
  }, [turnstileToken, setValue]);

  return (
    <>
      <h1 className="text-start text-stone-300 text-2xl font-medium mb-2">
        {t('contact.title')}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
        <div className="mb-1">
          <input
            type="text"
            placeholder={t('contact.placeName')}
            className={`contactBox max-h-10 ${
              errors.name
                ? 'focus:border-red-700'
                : 'focus:border-log-col focus:shadow-inner'
            }`}
            {...register('name', { required: true })}
          />
        </div>
        <div className="mb-1">
          <input
            type="email"
            placeholder="example@domain.com"
            className={`contactBox max-h-10 ${
              errors.email
                ? 'focus:border-red-700'
                : 'focus:border-log-col focus:shadow-inner'
            }`}
            {...register('email', { required: true })}
          />
        </div>
        <div className="mb-1 flex flex-row gap-1">
          <textarea
            rows={4}
            placeholder={t('contact.placeMessage')}
            className={`contactBox h-20 max-h-40 ${
              errors.message ? 'focus:border-red-700' : 'focus:border-log-col'
            } focus:shadow-md`}
            {...register('message', { required: true })}
          ></textarea>
          <Captcha
            key={captchaKey}
            theme="dark"
            callback={(token) => setTurnstileToken(token)}
            errorCallback={() => setTurnstileToken('')}
            expiredCallback={() => setTurnstileToken('')}
          />
          <input
            type="hidden"
            value={turnstileToken}
            {...register('turnstileToken', { required: true })}
          />
          <button
            disabled={pending}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative w-[85px] h-20 hover:shadow-form rounded-md bg-neutral-500 bg-opacity-70 py-2 px-4 text-base font-semibold text-white outline-none ${!pending && 'hover:bg-opacity-100 active:bg-log-col'} cursor-none`}
          >
            {pending ? (
              <span className="loading loading-spinner text-log-col text-xl"></span>
            ) : (
              t('contact.button')
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Contact;
