"use client";

import type { ThemeProps } from "@rjsf/core";
import type { FieldTemplateProps, WidgetProps } from "@rjsf/utils";
import { Input } from "./ui/input";

// Custom widget para inputs de texto usando shadcn/ui
const CustomTextWidget = ({
  id, value, required, disabled, readonly, label, onChange, onBlur, onFocus, placeholder
}: WidgetProps) => (
  <Input
    id={id}
    value={value ?? ""}
    required={required}
    disabled={disabled}
    readOnly={readonly}
    placeholder={placeholder}
    onChange={event => onChange(event.target.value)}
    onBlur={event => onBlur && onBlur(id, event.target.value)}
    onFocus={event => onFocus && onFocus(id, event.target.value)}
    className="form-control"
    aria-label={label}
    aria-required={required}
    aria-disabled={disabled}
    aria-readonly={readonly}
  />
);

// Custom widget para email
const CustomEmailWidget = (props: WidgetProps) => (
  <CustomTextWidget {...props} />
);

// Custom widget para password
const CustomPasswordWidget = ({
  id, value, required, disabled, readonly, label, onChange, onBlur, onFocus, placeholder
}: WidgetProps) => (
  <input
    type="password"
    id={id}
    value={value ?? ""}
    required={required}
    disabled={disabled}
    readOnly={readonly}
    placeholder={placeholder}
    onChange={event => onChange(event.target.value)}
    onBlur={event => onBlur && onBlur(id, event.target.value)}
    onFocus={event => onFocus && onFocus(id, event.target.value)}
    className="form-control"
    aria-label={label}
  />
);

// Custom widget para textarea
const CustomTextareaWidget = ({
  id, value, required, disabled, readonly, label, onChange, onBlur, onFocus, placeholder
}: WidgetProps) => (
  <textarea
    id={id}
    value={value ?? ""}
    required={required}
    disabled={disabled}
    readOnly={readonly}
    placeholder={placeholder}
    onChange={event => onChange(event.target.value)}
    onBlur={event => onBlur && onBlur(id, event.target.value)}
    onFocus={event => onFocus && onFocus(id, event.target.value)}
    className="form-control"
    rows={4}
    aria-label={label}
  />
);

// Custom widget para select
const CustomSelectWidget = ({
  id, value, required, disabled, readonly, label, onChange, onBlur, onFocus, placeholder, schema, options
}: WidgetProps) => (
  <select
    id={id}
    value={value ?? ""}
    required={required}
    disabled={disabled}
    onChange={event => onChange(event.target.value)}
    onBlur={event => onBlur && onBlur(id, event.target.value)}
    onFocus={event => onFocus && onFocus(id, event.target.value)}
    className="form-control"
    aria-label={label || placeholder}
  >
    {placeholder && (
      <option value="" disabled>
        {placeholder}
      </option>
    )}
    {options.enumOptions?.map((option: any) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// FieldTemplate customizado para visual moderno
const ModernFieldTemplate = ({
  id,
  classNames,
  label,
  help,
  required,
  description,
  errors,
  children,
}: FieldTemplateProps) => (
  <div className={`form-group ${classNames}`}>
    {label && (
      <label htmlFor={id} className="control-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
    )}
    {description && (
      <div className="field-description">{description}</div>
    )}
    {children}
    {errors && (
      <div className="text-danger">{errors}</div>
    )}
    {help && (
      <div className="help-block">{help}</div>
    )}
  </div>
);

export const rjsfShadcnTheme: Partial<ThemeProps> = {
  widgets: {
    TextWidget: CustomTextWidget,
    EmailWidget: CustomEmailWidget,
    PasswordWidget: CustomPasswordWidget,
    TextareaWidget: CustomTextareaWidget,
    SelectWidget: CustomSelectWidget,
  },
  templates: {
    FieldTemplate: ModernFieldTemplate,
  },
}; 