import { TFunction } from 'i18next';

const FIELD_MAX = {
  name: 25,
  message: 900,
};

interface GetErrorMessageParams {
  error: string;
  field: keyof typeof FIELD_MAX | string;
  t: TFunction<readonly ['index'], undefined>;
}

export default function getErrorMessage({
  error,
  field,
  t,
}: GetErrorMessageParams): string {
  if (
    error === 'contact.data-tips.tooLong' &&
    FIELD_MAX[field as keyof typeof FIELD_MAX]
  ) {
    return t(error, { max: FIELD_MAX[field as keyof typeof FIELD_MAX] });
  }
  return t(error);
}
