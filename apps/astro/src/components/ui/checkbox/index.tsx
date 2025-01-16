import type { FieldErrors } from 'react-hook-form';
import Error from '../error';
import styles from './Checkbox.module.scss';

type Props = {
  register: {
    name: string;
  };
  children: React.ReactNode;
  errors: FieldErrors;
  disabled?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Checkbox({ children, register, errors, disabled = false, ...props }: Props) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      target.checked = !target.checked;
      event.target.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };
  return (
    <label className={styles.Checkbox} {...props}>
      <div className={styles.checkmark}>
        <input
          type="checkbox"
          disabled={disabled}
          {...register}
          aria-invalid={!!errors[register.name]}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path stroke="#E9F2ED" stroke-linecap="round" stroke-linejoin="round" d="m7.5 12 3 3 6-6" />
          </svg>
        </div>
      </div>
      <p>{children}</p>
      <Error error={errors[register.name]?.message?.toString()} />
    </label>
  );
}
