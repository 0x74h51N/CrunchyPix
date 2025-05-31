'use client';
import { useTranslation } from 'react-i18next';
import { useActionState, useEffect, useRef, useState } from 'react';
import Captcha from './Captcha';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import { sendEmail } from '@/app/actions/sendMailAction';
import FieldInput from './FieldInput';
import clsx from 'clsx';
import { ToastType } from '@/lib/types/common.types';
import Toaster from './Toaster';
import { ContactSchema } from '@/lib/schemas';

const Contact = () => {
  const [state, action, pending] = useActionState(sendEmail, undefined);
  const [hasChange, setHasChange] = useState({
    name: false,
    email: false,
    message: false,
    turnstileToken: false,
  });

  const [turnstileToken, setTurnstileToken] = useState('');
  const [toast, setToasts] = useState<ToastType[]>([]);

  const { t } = useTranslation(['index']);
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormValues((v) => ({ ...v, [name]: value }));
    setHasChange((prev) => ({ ...prev, [name]: true }));
  }
  const toastId = useRef(0);

  function showToast(type: ToastType['type'], msg: ToastType['msg']) {
    setToasts((prev) => [...prev, { id: toastId.current++, type, msg }]);
  }

  useEffect(() => {
    if (!state) return;
    if (state.success === true) {
      showToast('success', t('contact.submit'));
      setFormValues({ name: '', email: '', message: '' });
    }
    if (state.success === false && state.message === 'contact.submitFail') {
      showToast('error', t('contact.submitFail'));
    }
    setHasChange({
      name: false,
      email: false,
      message: false,
      turnstileToken: false,
    });
    setTurnstileToken('');
    setCaptchaKey(Date.now());
  }, [state]);
  const turnstileHasError =
    !hasChange.turnstileToken &&
    state?.errors?.turnstileToken &&
    state.errors.turnstileToken.length > 0;

  const turnstileErrorMsg = turnstileHasError
    ? state.errors!.turnstileToken!.map((el) => t(el)).join('\n')
    : '';
  return (
    <>
      {toast && (
        <Toaster
          toasts={toast}
          onClose={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
        />
      )}
      <h1 className="text-start text-stone-300 text-2xl font-medium mb-2">
        {t('contact.title')}
      </h1>
      <form action={action} className="w-full relative">
        <FieldInput
          field="name"
          errors={state?.errors?.name}
          placeholder={t('contact.placeName')}
          value={formValues.name}
          onChange={handleChange}
          hasChange={hasChange.name}
        />

        <FieldInput
          field="email"
          type="email"
          errors={state?.errors?.email}
          placeholder="example@domain.com"
          value={formValues.email}
          onChange={handleChange}
          hasChange={hasChange.email}
        />

        <div className="mb-1 flex flex-row gap-1">
          <FieldInput
            field="message"
            errors={state?.errors?.message}
            placeholder={t('contact.placeMessage')}
            value={formValues.message}
            onChange={handleChange}
            maxLength={
              ContactSchema.shape.message._def.checks.find(
                (c) => c.kind === 'max',
              )?.value
            }
            hasChange={hasChange.message}
          />
          <Captcha
            key={captchaKey}
            theme="dark"
            callback={(token) => {
              setTurnstileToken(token);
              setHasChange((prev) => ({ ...prev, turnstileToken: true }));
            }}
            errorCallback={() => setTurnstileToken('')}
            expiredCallback={() => setTurnstileToken('')}
          />
          <input type="hidden" name="turnstileToken" value={turnstileToken} />
          <button
            disabled={pending}
            aria-describedby={turnstileHasError ? 'error-turnstile' : undefined}
            data-tip={turnstileErrorMsg}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={clsx(
              'relative w-[85px] h-20 rounded-md bg-neutral-500/70 py-2 px-4 text-base font-semibold text-white outline-none cursor-none',
              !pending &&
                'hover:bg-neutral-500/100 active:bg-log-col hover:shadow-form',
              turnstileHasError &&
                'tooltip tooltip-bottom tooltip-error tooltip-open tooltip-offset',
            )}
          >
            {pending ? (
              <span className="loading loading-spinner text-log-col text-xl"></span>
            ) : (
              t('contact.button')
            )}
          </button>
          {turnstileHasError && (
            <div
              id="error-turnstile"
              className="text-xs mt-1 text-red-700 sr-only"
              role="alert"
              aria-live="polite"
            >
              {turnstileErrorMsg}
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Contact;
