import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function AdminNotice({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "error";
}) {
  const toneClass =
    tone === "error"
      ? "border-black/20 bg-white text-black"
      : tone === "success"
        ? "border-black/10 bg-[#f7f7f6] text-black/70"
        : "border-black/10 bg-white text-black/60";

  return (
    <p className={`mt-5 border px-4 py-3 text-sm leading-6 ${toneClass}`}>
      {children}
    </p>
  );
}

export function AdminButton({
  children,
  disabled,
  onClick,
  to,
  type = "button",
  variant = "secondary",
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
}) {
  const className =
    variant === "primary"
      ? "border-black bg-black text-white hover:bg-white hover:text-black"
      : variant === "danger"
        ? "border-black/20 bg-white text-black/70 hover:border-black hover:text-black"
        : "border-black/15 bg-white text-black/65 hover:border-black hover:text-black";
  const baseClass = `inline-flex w-fit items-center justify-center border px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] transition disabled:cursor-not-allowed disabled:border-black/20 disabled:bg-black/10 disabled:text-black/40 ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClass}
    >
      {children}
    </button>
  );
}

export function AdminInput({
  error,
  helper,
  label,
  onChange,
  required,
  type = "text",
  value,
}: {
  error?: string;
  helper?: string;
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        className={`mt-2 w-full border bg-white px-3 py-3 text-sm outline-none transition focus:border-black ${
          error ? "border-black" : "border-black/15"
        }`}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
      <FieldHelp helper={error || helper} isError={Boolean(error)} />
    </label>
  );
}

export function AdminTextarea({
  error,
  helper,
  label,
  onChange,
  value,
}: {
  error?: string;
  helper?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        className={`mt-2 min-h-28 w-full border bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-black ${
          error ? "border-black" : "border-black/15"
        }`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldHelp helper={error || helper} isError={Boolean(error)} />
    </label>
  );
}

export function AdminSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  value: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <select
        className="mt-2 w-full border border-black/15 bg-white px-3 py-3 text-sm outline-none transition focus:border-black"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AdminToggle({
  checked,
  helper,
  label,
  onChange,
}: {
  checked: boolean;
  helper?: string;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 border border-black/10 bg-white p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1"
      />
      <span>
        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-black/65">
          {label}
        </span>
        {helper ? (
          <span className="mt-1 block text-xs leading-5 text-black/45">
            {helper}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export function AdminFieldSection({
  children,
  helper,
  title,
}: {
  children: ReactNode;
  helper?: string;
  title: string;
}) {
  return (
    <section className="border border-black/10 bg-[#f7f7f6] p-4 sm:p-5">
      <div className="border-b border-black/10 pb-4">
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>
        {helper ? <p className="mt-2 text-sm leading-6 text-black/55">{helper}</p> : null}
      </div>
      <div className="pt-5">{children}</div>
    </section>
  );
}

export function AdminImagePreview({
  alt,
  src,
}: {
  alt: string;
  src: string;
}) {
  return (
    <div className="overflow-hidden border border-black/10 bg-white">
      <img src={src} alt={alt} className="max-h-80 w-full object-contain" />
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/45">
      {children}
    </span>
  );
}

function FieldHelp({
  helper,
  isError,
}: {
  helper?: string;
  isError?: boolean;
}) {
  if (!helper) {
    return null;
  }

  return (
    <p
      className={`mt-2 text-xs leading-5 ${
        isError ? "text-black" : "text-black/45"
      }`}
    >
      {helper}
    </p>
  );
}
