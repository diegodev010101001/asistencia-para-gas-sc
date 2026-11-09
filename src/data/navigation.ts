export interface NavItem {
  label: string;
  href: string;
  /** id de la sección en el inicio, para el indicador de sección activa. */
  section: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Seguros', href: '/#seguros', section: 'seguros' },
  { label: 'Cómo cotizar', href: '/#proceso', section: 'proceso' },
  { label: 'Preguntas', href: '/#preguntas', section: 'preguntas' },
  { label: 'Contacto', href: '/#contacto', section: 'contacto' },
];

export const QUOTE_HREF = '/#cotizar';
