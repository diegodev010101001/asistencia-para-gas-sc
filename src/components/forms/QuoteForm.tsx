'use client';

import { startTransition, useActionState, useEffect, useId, useRef, useState, type ChangeEvent, type SubmitEvent, type ReactNode } from 'react';
import { AlertCircle, ArrowRight, Check, CheckCircle2, LoaderCircle } from 'lucide-react';

import { submitQuote } from '@/app/actions/submit-quote';
import {
  EMPTY_QUOTE,
  HONEYPOT_FIELD,
  INITIAL_QUOTE_STATE,
  LIMITS,
  OPERACION_OPTIONS,
  QUOTE_FIELDS,
  SEGURO_OPTIONS,
  quoteSchema,
  readQuote,
  toFieldErrors,
  validateField,
  type QuoteErrors,
  type QuoteField,
  type QuoteState,
  type QuoteValues,
} from '@/lib/quote-schema';

import styles from './QuoteForm.module.css';

interface QuoteFormProps {
  /** Seguro preseleccionado (páginas de cada seguro). */
  defaultSeguro?: string;
  /** Enlace de WhatsApp como alternativa si el envío falla (null si no está configurado). */
  whatsappHref?: string | null;
  privacyUrl?: string | null;
}

const VALID_SEGUROS = new Set<string>(SEGURO_OPTIONS.map((o) => o.value));

const NETWORK_ERROR =
  'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo; lo que escribiste se conserva.';

/**
 * Si la red falla (sin conexión, servidor inalcanzable), la llamada a la Server
 * Action rechaza en el cliente y React propagaría el error hasta romper la
 * página. Este envoltorio lo convierte en un estado de error recuperable que
 * conserva lo escrito. La validación, el honeypot, el rate limit y el envío
 * siguen ocurriendo solo en el servidor.
 */
async function submitQuoteSafely(prev: QuoteState, formData: FormData): Promise<QuoteState> {
  try {
    return await submitQuote(prev, formData);
  } catch {
    return { status: 'error', message: NETWORK_ERROR, values: readQuote(formData) };
  }
}

/**
 * Contenedor: tras un envío exitoso, «Enviar otra solicitud» remonta el
 * formulario, lo que deja los campos limpios y reinicia useActionState.
 */
export function QuoteForm(props: QuoteFormProps) {
  const [round, setRound] = useState(0);
  return <QuoteFormInner key={round} {...props} onReset={() => setRound((r) => r + 1)} />;
}

function QuoteFormInner({
  defaultSeguro = '',
  whatsappHref = null,
  privacyUrl = null,
  onReset,
}: QuoteFormProps & { onReset: () => void }) {
  const [state, formAction, isPending] = useActionState(submitQuoteSafely, INITIAL_QUOTE_STATE);
  // Campos controlados: conservan lo escrito si el envío falla.
  const [values, setValues] = useState<QuoteValues>(() => ({
    ...EMPTY_QUOTE,
    seguro: VALID_SEGUROS.has(defaultSeguro) ? defaultSeguro : '',
  }));
  const [touched, setTouched] = useState<Partial<Record<QuoteField, boolean>>>({});
  const [clientErrors, setClientErrors] = useState<QuoteErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  // Un campo validado en el cliente manda; si no, se muestra lo que respondió el servidor.
  const serverErrors: QuoteErrors = state.status === 'invalid' ? state.errors : {};
  const errorFor = (field: QuoteField) => (field in clientErrors ? clientErrors[field] : serverErrors[field]);

  const focusField = (field: QuoteField) => formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();

  // Si el servidor rechaza la validación, el foco va al primer campo con error.
  useEffect(() => {
    if (state.status !== 'invalid') return;
    const first = QUOTE_FIELDS.find((f) => state.errors[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  function setFieldError(field: QuoteField, value: string) {
    setClientErrors((e) => ({ ...e, [field]: validateField(field, value) }));
  }

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const target = event.currentTarget;
    const field = target.name as QuoteField;
    const isChoice = target instanceof HTMLSelectElement || (target instanceof HTMLInputElement && target.type === 'checkbox');
    const next = target instanceof HTMLInputElement && target.type === 'checkbox' ? (target.checked ? 'on' : '') : target.value;

    setValues((v) => ({ ...v, [field]: next }));
    // Texto: valida en vivo después del primer blur. Selects y casillas: al elegir.
    if (isChoice) setTouched((t) => ({ ...t, [field]: true }));
    if (isChoice || touched[field]) setFieldError(field, next);
  }

  function onBlur(field: QuoteField) {
    setTouched((t) => ({ ...t, [field]: true }));
    setFieldError(field, values[field]);
  }

  /**
   * Con JavaScript, el envío se despacha a mano dentro de startTransition.
   * Así React no aplica el reinicio automático del <form action>, que
   * devolvería casillas y selects a su valor por defecto en el DOM mientras el
   * estado conserva lo elegido (el servidor recibiría datos incompletos).
   * Sin JavaScript, el atributo action envía el formulario de forma nativa.
   */
  function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = quoteSchema.safeParse(values);
    if (parsed.success) {
      const formData = new FormData(event.currentTarget);
      startTransition(() => formAction(formData));
      return;
    }
    const errors = toFieldErrors(parsed.error);
    setClientErrors(Object.fromEntries(QUOTE_FIELDS.map((f) => [f, errors[f]])));
    setTouched(Object.fromEntries(QUOTE_FIELDS.map((f) => [f, true])));
    const first = QUOTE_FIELDS.find((f) => errors[f]);
    if (first) focusField(first);
  }

  if (state.status === 'success') {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <CheckCircle2 size={36} strokeWidth={1.5} aria-hidden="true" className={styles.successIcon} />
        <h3 className={styles.successTitle}>Solicitud enviada</h3>
        <p>{state.message}</p>
        <button type="button" className={styles.linkButton} onClick={onReset}>
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const id = (name: string) => `${uid}-${name}`;
  const isValid = (field: QuoteField) => Boolean(touched[field]) && !errorFor(field) && values[field].trim() !== '';

  const fieldProps = (field: QuoteField, hint?: boolean) => {
    const error = errorFor(field);
    const describedBy = [hint ? id(`${field}-hint`) : null, error ? id(`${field}-error`) : null].filter(Boolean).join(' ');
    return {
      id: id(field),
      name: field,
      value: values[field],
      onChange,
      onBlur: () => onBlur(field),
      'aria-invalid': error ? true : undefined,
      'aria-describedby': describedBy || undefined,
    } as const;
  };

  const fieldState = (field: QuoteField) => ({
    id: id(field),
    errorId: id(`${field}-error`),
    error: errorFor(field),
    valid: isValid(field),
  });

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className={styles.form} aria-describedby={id('required')}>
      <p id={id('required')} className={styles.required}>
        Los campos marcados con <span aria-hidden="true">*</span>
        <span className="visually-hidden">asterisco</span> son obligatorios.
      </p>

      <fieldset className={styles.fieldset} disabled={isPending}>
        <legend className="visually-hidden">Datos de contacto y de la operación</legend>
        <div className={styles.grid}>
          <Field label="Nombre" required {...fieldState('nombre')}>
            <input {...fieldProps('nombre')} type="text" autoComplete="name" maxLength={LIMITS.nombre.max} aria-required="true" className={styles.input} />
          </Field>

          <Field label="Empresa" {...fieldState('empresa')}>
            <input {...fieldProps('empresa')} type="text" autoComplete="organization" maxLength={LIMITS.empresa.max} className={styles.input} />
          </Field>

          <Field label="Correo electrónico" required {...fieldState('email')}>
            <input
              {...fieldProps('email')}
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={LIMITS.email.max}
              aria-required="true"
              className={styles.input}
            />
          </Field>

          <Field label="Teléfono" required hint={{ id: id('telefono-hint'), text: '10 dígitos, con lada.' }} {...fieldState('telefono')}>
            <input
              {...fieldProps('telefono', true)}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              maxLength={LIMITS.telefono.max}
              aria-required="true"
              className={styles.input}
            />
          </Field>

          <Field label="Seguro de interés" required {...fieldState('seguro')}>
            <select {...fieldProps('seguro')} aria-required="true" className={`${styles.input} ${styles.select}`}>
              <option value="" disabled>
                Selecciona una opción
              </option>
              {SEGURO_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tipo de operación" required {...fieldState('operacion')}>
            <select {...fieldProps('operacion')} aria-required="true" className={`${styles.input} ${styles.select}`}>
              <option value="" disabled>
                Selecciona una opción
              </option>
              {OPERACION_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Cuéntanos sobre tu operación"
            required
            wide
            hint={{
              id: id('mensaje-hint'),
              text: `Ubicación, flota, capacidad de almacenamiento… (${values.mensaje.length}/${LIMITS.mensaje.max})`,
            }}
            {...fieldState('mensaje')}
          >
            <textarea {...fieldProps('mensaje', true)} rows={5} maxLength={LIMITS.mensaje.max} aria-required="true" className={`${styles.input} ${styles.textarea}`} />
          </Field>
        </div>

        {/* Trampa para bots: invisible para personas y tecnologías de asistencia. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor={id(HONEYPOT_FIELD)}>No llenar este campo</label>
          <input id={id(HONEYPOT_FIELD)} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <div className={styles.consent}>
          <input
            id={id('privacidad')}
            name="privacidad"
            type="checkbox"
            checked={values.privacidad === 'on'}
            onChange={onChange}
            aria-required="true"
            aria-invalid={errorFor('privacidad') ? true : undefined}
            aria-describedby={errorFor('privacidad') ? id('privacidad-error') : undefined}
            className={styles.checkbox}
          />
          <label htmlFor={id('privacidad')} className={styles.consentLabel}>
            {/* TODO: publicar el aviso de privacidad (SITE.privacyUrl); es obligatorio antes de recabar datos en producción. */}
            {privacyUrl ? (
              <>
                Acepto que mis datos se usen para responder esta solicitud, según el{' '}
                <a href={privacyUrl} target="_blank" rel="noopener">
                  aviso de privacidad
                </a>
                .
              </>
            ) : (
              'Acepto que mis datos se usen únicamente para responder esta solicitud.'
            )}{' '}
            <span aria-hidden="true">*</span>
          </label>
          {errorFor('privacidad') ? (
            <p id={id('privacidad-error')} className={styles.error}>
              <AlertCircle size={14} aria-hidden="true" /> {errorFor('privacidad')}
            </p>
          ) : null}
        </div>
      </fieldset>

      <div aria-live="polite" className={styles.status}>
        {state.status === 'error' ? (
          <div className={styles.alert} role="alert">
            <AlertCircle size={18} strokeWidth={1.75} aria-hidden="true" />
            <p>
              {state.message}
              {whatsappHref ? (
                <>
                  {' '}
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Escribir por WhatsApp
                  </a>
                </>
              ) : null}
            </p>
          </div>
        ) : null}
        {state.status === 'invalid' ? (
          <div className={styles.alert} role="alert">
            <AlertCircle size={18} strokeWidth={1.75} aria-hidden="true" />
            <p>{state.message}</p>
          </div>
        ) : null}
      </div>

      <button type="submit" className={styles.submit} disabled={isPending} aria-busy={isPending || undefined}>
        {isPending ? (
          <>
            <LoaderCircle size={18} className={styles.spinner} aria-hidden="true" />
            <span>Enviando…</span>
          </>
        ) : (
          <>
            <span>Enviar solicitud</span>
            <ArrowRight size={18} strokeWidth={1.75} className={styles.submitArrow} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  id: string;
  errorId: string;
  error?: string;
  valid?: boolean;
  required?: boolean;
  wide?: boolean;
  hint?: { id: string; text: string };
  children: ReactNode;
}

function Field({ label, id, errorId, error, valid, required, wide, hint, children }: FieldProps) {
  return (
    <div className={[styles.field, wide ? styles.wide : ''].join(' ')} data-state={error ? 'error' : valid ? 'valid' : undefined}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <div className={styles.control}>
        {children}
        <span className={styles.validIcon} aria-hidden="true">
          <Check size={16} strokeWidth={2} />
        </span>
      </div>
      {hint ? (
        <p id={hint.id} className={styles.hint}>
          {hint.text}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={styles.error}>
          <AlertCircle size={14} aria-hidden="true" /> {error}
        </p>
      ) : null}
    </div>
  );
}
