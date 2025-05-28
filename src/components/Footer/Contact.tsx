'use client';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Captcha from './Captcha';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import { sendEmail } from '@/app/actions/sendMailAction';
import { ContactTypes } from '@/lib/schemas';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactTypes>();
  const [turnstileToken, setTurnstileToken] = useState('');
  const [pending, setPending] = useState(false);
  const { t } = useTranslation(['index']);
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();

  const onSubmit = async (data: ContactTypes) => {
    setPending(true);
    if (!turnstileToken) {
      alert('Please complete the CAPTCHA challenge.');
      setPending(false);
      return;
    }

    try {
      const response = await sendEmail(data);
      if (response.success) {
        alert(t('contact.submit'));
        reset();
      } else {
        alert(t('contact.submitFail'));
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert(t('contact.submitFail'));
    }

    setCaptchaKey(Date.now());
    setPending(false);
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
        <div
          className={`mb-1  w-full ${errors.name && 'input-error-tooltip'}`}
          data-tip={errors.name ? errors.name.message : ''}
        >
          <input
            type="text"
            placeholder={t('contact.placeName')}
            className={`contactBox max-h-10 ${
              errors.name
                ? 'focus:border-red-700'
                : 'focus:border-log-col focus:shadow-inner'
            }`}
            {...register('name', {
              required: t('contact.data-tips.required'),
              pattern: {
                value: /^[\p{L}\s\-']+$/u,
                message: t('contact.data-tips.invalidChars'),
              },
              maxLength: {
                value: 25,
                message: `${t('contact.data-tips.tooLong')} 25`,
              },
            })}
          />
        </div>
        <div
          className={`mb-1  w-full ${errors.email && 'input-error-tooltip'}`}
          data-tip={errors.email ? errors.email.message : ''}
        >
          <input
            type="email"
            placeholder="example@domain.com"
            className={`contactBox max-h-10 ${
              errors.email
                ? 'focus:border-red-700'
                : 'focus:border-log-col focus:shadow-inner'
            }`}
            {...register('email', {
              required: t('contact.data-tips.required'),
              maxLength: {
                value: 35,
                message: `${t('contact.data-tips.tooLong')} 35`,
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t('contact.data-tips.invalidMail'),
              },
            })}
          />
        </div>
        <div
          className={`mb-1 flex flex-row gap-1 ${errors.message && 'input-error-tooltip'}`}
          data-tip={errors.message ? errors.message.message : ''}
        >
          <textarea
            rows={4}
            placeholder={t('contact.placeMessage')}
            className={`contactBox h-20 min-h-[80px] max-h-40 ${
              errors.message ? 'focus:border-red-700' : 'focus:border-log-col'
            } focus:shadow-md`}
            {...register('message', {
              required: t('contact.data-tips.required'),
              maxLength: {
                value: 500,
                message: `${t('contact.data-tips.tooLong')} 500`,
              },
              pattern: {
                value: /^[\p{L}\p{N}\s.,?!'"-()]+$/u,
                message: t('contact.data-tips.invalidChars'),
              },
            })}
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
            {...register('turnstileToken', {
              required: t('contact.data-tips.chaptcha'),
            })}
          />
          <button
            disabled={pending}
            data-tip={
              errors.turnstileToken ? errors.turnstileToken.message : ''
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative w-[85px] h-20 hover:shadow-form rounded-md bg-neutral-500/70 py-2 px-4 text-base font-semibold text-white outline-none ${!pending && !errors.turnstileToken && 'hover:bg-neutral-500/100 active:bg-log-col'} cursor-none ${errors.turnstileToken && 'tooltip tooltip-bottom tooltip-error before:-left-5 flexCenter'}`}
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
