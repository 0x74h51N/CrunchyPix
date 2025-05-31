import { useTranslation } from 'react-i18next';
import getErrorMessage from '@/utils/getErrorMessage';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface FieldInputProps {
  field: string;
  type?: string;
  errors?: string[];
  placeholder?: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  maxLength?: number;
  hasChange: boolean;
}

export default function FieldInput({
  field,
  type = 'text',
  errors,
  placeholder,
  value,
  onChange,
  maxLength,
  hasChange = false,
}: FieldInputProps) {
  const { t } = useTranslation(['index']);
  const hasError = errors && errors.length > 0;
  const errorClass =
    hasError && !hasChange
      ? 'border-red-700'
      : 'focus:border-log-col not-focus:border-transparent';
  const errorMessage =
    (errors &&
      errors!
        .map((el) => getErrorMessage({ error: el, field, t }))
        .join(', ')) ||
    '';
  return (
    <div
      key={field}
      className={clsx(
        'mb-1 w-full',
        hasError && !hasChange && 'input-error-tooltip tooltip-open',
      )}
      data-tip={hasError && !hasChange ? errorMessage : ''}
    >
      {field === 'message' ? (
        <>
          <textarea
            rows={4}
            name={field}
            placeholder={placeholder}
            className={clsx(
              'contactBox h-20 min-h-[80px] max-h-40 focus:shadow-md relative',
              errorClass,
            )}
            value={value}
            onChange={onChange}
            aria-label={placeholder}
            aria-invalid={hasError && !hasChange}
            aria-errormessage={
              hasError && !hasChange ? `error-${field}` : undefined
            }
            aria-describedby={
              hasError && !hasChange ? `error-${field}` : undefined
            }
          />
          <motion.div
            key={value!.length > maxLength! ? 'shake' : 'normal'}
            className={clsx(
              'absolute  text-xs',
              value!.length > maxLength! ? 'text-red-800' : 'text-stone-500',
              hasError && !hasChange ? 'right-3 bottom-2' : 'right-24 bottom-4',
            )}
            animate={
              value!.length > maxLength! ? { x: [0, -8, 8, -8, 8, 0] } : {}
            }
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {value!.length + '/' + maxLength}
          </motion.div>
          {hasError && !hasChange && (
            <div
              id={`error-${field}`}
              className="text-xs mt-1 text-red-700 sr-only"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
        </>
      ) : (
        <>
          <input
            type={type}
            name={field}
            placeholder={placeholder}
            className={clsx(
              'contactBox max-h-10 focus:shadow-inner',
              errorClass,
            )}
            value={value}
            onChange={onChange}
            aria-label={placeholder}
            aria-invalid={hasError && !hasChange}
            aria-errormessage={
              hasError && !hasChange ? `error-${field}` : undefined
            }
            aria-describedby={
              hasError && !hasChange ? `error-${field}` : undefined
            }
          />
          {hasError && !hasChange && (
            <div
              id={`error-${field}`}
              className="text-xs mt-1 text-red-700 sr-only"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
        </>
      )}
    </div>
  );
}
