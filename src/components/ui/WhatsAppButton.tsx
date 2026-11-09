import { whatsappHref } from '@/data/site';

import { buttonClass, type ButtonSize, type ButtonVariant } from './Button';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppButtonProps {
  /** Mensaje con el que se abre la conversación. */
  message: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * Botón que abre una conversación de WhatsApp con el número de src/data/site.ts.
 * Usa los estilos de botón del sitio (sin introducir el verde de WhatsApp, para
 * respetar el acento único). No se renderiza si el número es un marcador.
 */
export function WhatsAppButton({ message, label = 'Escríbenos por WhatsApp', variant = 'secondary', size = 'm', className }: WhatsAppButtonProps) {
  const href = whatsappHref(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, size, className)}>
      <WhatsAppIcon size={18} />
      <span>{label}</span>
      <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
    </a>
  );
}
