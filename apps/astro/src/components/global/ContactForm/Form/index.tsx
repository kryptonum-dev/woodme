import Checkbox from '@/src/components/ui/checkbox';
import Input from '@/src/components/ui/input/Input';
import { REGEX } from '@/src/global/constants';
import { sendContactEmail, type Props as sendContactEmailProps } from '@/src/pages/api/contact/sendContactEmail';
import { useEffect, useState } from 'preact/hooks';
import { useForm, type FieldValues } from 'react-hook-form';

export default function Form({
  children,
  ...props
}: { children: React.ReactNode } & React.FormHTMLAttributes<HTMLFormElement>) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [step, setStep] = useState<1 | 2>(1);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({ mode: 'onTouched' });

  const hideElements = () => {
    document.querySelector('#submit')?.setAttribute('aria-hidden', 'false');
    document.querySelector('#submit')?.setAttribute('tabindex', '0');
    document.querySelector('.react-international-phone-country-selector-button')?.setAttribute('disabled', 'false');
    document.querySelector('.react-international-phone-country-selector-button')?.setAttribute('aria-hidden', 'false');
    document.querySelector('.react-international-phone-input')?.setAttribute('disabled', 'false');
    document.querySelector('.react-international-phone-input')?.setAttribute('aria-hidden', 'false');
  };

  const showElements = () => {
    document.querySelector('#submit')?.setAttribute('aria-hidden', 'true');
    document.querySelector('#submit')?.setAttribute('tabindex', '-1');
    document.querySelector('.react-international-phone-country-selector-button')?.setAttribute('disabled', 'true');
    document.querySelector('.react-international-phone-country-selector-button')?.setAttribute('aria-hidden', 'true');
    document.querySelector('.react-international-phone-input')?.setAttribute('disabled', 'true');
    document.querySelector('.react-international-phone-input')?.setAttribute('aria-hidden', 'true');
  };

  useEffect(() => {
    const tryAgain = () => {
      setStatus('idle');
      showElements();
    };

    document.addEventListener('Contact-TryAgain', tryAgain);
    return () => document.removeEventListener('Contact-TryAgain', tryAgain);
  }, []);

  const onSubmit = async (data: FieldValues) => {
    setStatus('loading');
    hideElements();

    const response = await sendContactEmail(data as sendContactEmailProps);

    if (response.success) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)} data-status={status}>
      <Input
        aria-hidden={status === 'loading'}
        tabIndex={status === 'loading' ? -1 : 0}
        label="Email"
        register={register('email', {
          required: { value: true, message: 'Email jest wymagany' },
          pattern: { value: REGEX.email, message: 'Niepoprawny adres e-mail' },
        })}
        errors={errors}
        type="email"
      />
      <Input
        aria-hidden={status === 'loading'}
        disabled={status === 'loading'}
        register={{ name: 'phone' }}
        errors={errors}
        additonalInfo="Obiecujemy kontaktować się wyłącznie w ramach bezpłatnej konsultacji"
        label="Telefon (opcjonalnie)"
        phone={{
          isPhone: true,
          control,
        }}
      />
      <Input
        aria-hidden={status === 'loading'}
        disabled={status === 'loading'}
        label="Temat wiadomości"
        register={register('message', {
          required: { value: true, message: 'Temat jest wymagany' },
        })}
        errors={errors}
        isTextarea
        placeholder="Napisz o czym chcesz porozmawiać"
      />
      <Checkbox
        aria-hidden={status === 'loading'}
        disabled={status === 'loading'}
        register={register('legal', {
          required: { value: true, message: 'Zgoda jest wymagana' },
        })}
        errors={errors}
      >
        Akceptuję{' '}
        <a
          href="/polityka-prywatnosci"
          aria-hidden={status === 'loading'}
          tabIndex={status === 'loading' ? -1 : 0}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          politykę prywatności
        </a>
      </Checkbox>
      {children}
    </form>
  );
}
