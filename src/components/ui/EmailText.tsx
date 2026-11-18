/**
 * Correo con punto de corte después de la @ (<wbr>): si no cabe en una línea,
 * se parte en «contacto@» / «asistenciaparagas.com», nunca a mitad de palabra.
 */
export function EmailText({ email }: { email: string }) {
  const at = email.indexOf('@');
  if (at < 0) return <span>{email}</span>;
  return (
    <span>
      {email.slice(0, at + 1)}
      <wbr />
      {email.slice(at + 1)}
    </span>
  );
}
