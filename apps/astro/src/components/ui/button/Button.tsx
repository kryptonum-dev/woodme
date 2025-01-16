import styles from './Button.module.scss';

export type Props = React.HTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string | React.ReactNode;
    children: React.ReactNode;
    theme?: 'primary' | 'secondary';
    linkType?: 'external' | 'internal';
    href?: string;
    shade?: 'light' | 'dark';
    className?: string;
    isLoading?: boolean;
    sendingMessage?: string;
    customIcon?: string;
  };

export default function Button({
  children,
  text,
  theme = 'primary',
  linkType = 'internal',
  href,
  shade = 'dark',
  className,
  isLoading,
  ...props
}: Props) {
  const Element = href ? 'a' : 'button';
  const isExternal = linkType === 'external';
  const renderedProps = {
    ...(href && { href }),
    ...(isExternal && { target: '_blank', rel: 'noreferrer' }),
    'data-theme': theme,
    'data-shade': shade,
    'data-is-loading': isLoading || false,
    className: `${styles.Button}${className ? ` ${className}` : ''}`,
    disabled: isLoading || false,
    ...props,
  };

  return (
    <Element {...renderedProps}>
      <div className={styles.content}>{children}</div>
    </Element>
  );
}
