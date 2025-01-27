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
    trigger,
    setFocus,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  useEffect(() => {
    const tryAgain = () => setStatus('idle');
    document.addEventListener('Faq-TryAgain', tryAgain);

    const nextStep = async () => {
      const isMessageValid = await trigger('message');
      if (isMessageValid) setStep(2);
      requestAnimationFrame(() => setFocus('email'));
    };
    const prevStep = () => {
      setStep(1);
      requestAnimationFrame(() => setFocus('message'));
    };
    document.addEventListener('Faq-NextStep', nextStep);
    document.addEventListener('Faq-PrevStep', prevStep);
    return () => {
      document.removeEventListener('Faq-TryAgain', tryAgain);
      document.removeEventListener('Faq-NextStep', nextStep);
      document.removeEventListener('Faq-PrevStep', prevStep);
    };
  }, []);

  const onSubmit = async (data: FieldValues) => {
    setStatus('loading');

    const response = await sendContactEmail(data as sendContactEmailProps);

    if (response.success) {
      setStatus('success');
      reset();
      if (typeof fathom !== 'undefined') fathom.trackEvent('faqForm_submit');
    } else {
      setStatus('error');
      if (typeof fathom !== 'undefined') fathom.trackEvent('faqForm_error');
    }
  };

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)} data-status={status} data-step={step}>
      <Input
        aria-hidden={status === 'loading'}
        disabled={status === 'loading'}
        label="Temat wiadomości"
        register={register('message', {
          required: { value: true, message: 'Temat jest wymagany' },
        })}
        errors={errors}
        isTextarea
      />
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
