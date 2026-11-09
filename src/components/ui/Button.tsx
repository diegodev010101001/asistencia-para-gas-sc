import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'inverse' | 'ghost';
export type ButtonSize = 'm' | 'l';

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'm', extra?: string) {
  return [styles.button, styles[variant], styles[size], extra].filter(Boolean).join(' ');
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Flecha que avanza al hacer hover: indica que el botón lleva a otro lugar. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant, size, arrow = false, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link {...rest} className={buttonClass(variant, size, className)}>
      <span>{children}</span>
      {arrow ? <ArrowRight className={styles.arrow} size={18} strokeWidth={1.75} aria-hidden="true" /> : null}
    </Link>
  );
}
