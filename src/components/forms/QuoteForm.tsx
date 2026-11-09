'use client';

import { useActionState, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
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
  validateField,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
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

/** Contenedor: al pedir «enviar otra solicitud» se remonta el formulario y se reinicia su estado. */
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
  const [state, formAction, isPending] = useActionState(submitQuote, INITIAL_QUOTE_STATE);
  const [values, setValues] = useState<QuoteValues>(() => ({ ...EMPTY_QUOTE, seguro: defaultSeguro }));
  const [touched, setTouched] = useState<Partial<Record<QuoteField, boolean>>>({});
  const [clientErrors, setClientErrors] = useState<QuoteErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  // Errores del servidor (p. ej. sin JS o validación remota) se muestran hasta que el campo cambie.
  const serverErrors: QuoteErrors = state.status === 'invalid' ? state.errors : {};
  const errorFor = (field: QuoteField) => clientErrors[field] ?? (touched[field] ? undefined : serverErrors[field]);

  function update(field: QuoteField, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field]) {
      setClientErrors((e) => ({ ...e, [field]: validateField(field, value) }));
    }
  }

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = event.currentTarget;
    const field = name as QuoteField;
    const next = type === 'checkbox' ? ((event.currentTarget as HTMLInputElement).checked ? 'on' : '') : value;
    update(field, next);
    // Selects y checkbox: se valida al elegir.
    if (type === 'checkbox' || event.currentTarget.tagName === 'SELECT') {
      setTouched((t) => ({ ...t, [field]: true }));
      setClientErrors((e) => ({ ...e, [field]: validateField(field, next) }));
    }
  }

  function onBlur(field: QuoteField) {
    setTouched((t) => ({ ...t, [field]: true }));
    setClientErrors((e) => ({ ...e, [field]: validateField(field, values[field]) }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const errors = validateQuote(values);
    if (Object.keys(errors).length === 0) return; // continúa con la Server Action
    event.preventDefault();
    setClientErrors(errors);
    setTouched(Object.fromEntries(QUOTE_FIELDS.map((f) => [f, true])));
    const first = QUOTE_FIELDS.find((f) => errors[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
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

  const id = (field: string) => `${uid}-${field}`;
  const isValid = (field: QuoteField) => touched[field] && !errorFor(field) && values[field].trim() !== '';

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

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className={styles.form} aria-describedby={id('required')}>
      <p id={id('required')} className={styles.required}>
        Los campos marcados con <span aria-hidden="true">*</span>
        <span className="visually-hidden">asterisco</span> son obligatorios.
      </p>

      <div className={styles.grid}>
        <Field label="Nombre" required id={id('nombre')} error={errorFor('nombre')} valid={isValid('nombre')} errorId={id('nombre-error')}>
          <input {...fieldProps('nombre')} type="text" autoComplete="name" maxLength={LIMITS.nombre.max} required className={styles.input} />
        </Field>

        <Field label="Empresa" id={id('empresa')} error={errorFor('empresa')} valid={isValid('empresa')} errorId={id('empresa-error')}>
          <input {...fieldProps('empresa')} type="text" autoComplete="organization" maxLength={LIMITS.empresa.max} className={styles.input} />
        </Field>

        <Field label="Correo electrónico" required id={id('correo')} error={errorFor('correo')} valid={isValid('correo')} errorId={id('correo-error')}>
          <input {...fieldProps('correo')} type="email" inputMode="email" autoComplete="email" required className={styles.input} />
        </Field>

        <Field
          label="Teléfono"
         
          id={id('telefono')}
          error={errorFor('telefono')}
          valid={isValid('telefono')}
          errorId={id('telefono-error')}
          hint={{ id: id('telefono-hint'), text: '10 dígitos, con lada.' }}
        >
          <input {...fieldProps('telefono', true)} type="tel" inputMode="tel" autoComplete="tel" className={styles.input} />
        </Field>

        <Field label="Seguro de interés" required id={id('seguro')} error={errorFor('seguro')} valid={isValid('seguro')} errorId={id('seguro-error')}>
          <select {...fieldProps('seguro')} required className={`${styles.input} ${styles.select}`}>
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

        <Field label="Tipo de operación" required id={id('operacion')} error={errorFor('operacion')} valid={isValid('operacion')} errorId={id('operacion-error')}>
          <select {...fieldProps('operacion')} required className={`${styles.input} ${styles.select}`}>
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
         
          id={id('mensaje')}
          error={errorFor('mensaje')}
          valid={isValid('mensaje')}
          errorId={id('mensaje-error')}
          hint={{ id: id('mensaje-hint'), text: `Ubicación, flota, capacidad de almacenamiento… (${values.mensaje.length}/${LIMITS.mensaje.max})` }}
        >
          <textarea {...fieldProps('mensaje', true)} rows={5} maxLength={LIMITS.mensaje.max} required className={`${styles.input} ${styles.textarea}`} />
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
          aria-invalid={errorFor('privacidad') ? true : undefined}
          aria-describedby={errorFor('privacidad') ? id('privacidad-error') : undefined}
          className={styles.checkbox}
        />
        <label htmlFor={id('privacidad')} className={styles.consentLabel}>
          Acepto que mis datos se usen para responder esta solicitud, según el{' '}
          {privacyUrl ? (
            <a href={privacyUrl} target="_blank" rel="noopener">
              aviso de privacidad
            </a>
          ) : (
            <span>aviso de privacidad [URL pendiente]</span>
          )}
          . <span aria-hidden="true">*</span>
        </label>
        {errorFor('privacidad') ? (
          <p id={id('privacidad-error')} className={styles.error}>
            <AlertCircle size={14} aria-hidden="true" /> {errorFor('privacidad')}
          </p>
        ) : null}
      </div>

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
        {state.status === 'invalid' && Object.keys(clientErrors).length === 0 ? (
          <div className={styles.alert} role="alert">
            <AlertCircle size={18} strokeWidth={1.75} aria-hidden="true" />
            <p>{state.message}</p>
          </div>
        ) : null}
      </div>

      <button type="submit" className={styles.submit} disabled={isPending} aria-disabled={isPending}>
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
