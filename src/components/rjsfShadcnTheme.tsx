import type { ThemeProps } from "@rjsf/core";
import type { FieldTemplateProps, WidgetProps } from "@rjsf/utils";
import { Input } from "./ui/input";
import React from "react";

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
    className="border-2 border-blue-600 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 text-black px-4 py-2 rounded-lg transition-all duration-200 shadow-sm bg-white"
    aria-label={label}
    aria-required={required}
    aria-disabled={disabled}
    aria-readonly={readonly}
  />
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
  <div className={`mb-6 ${classNames}`}>
    {label && (
      <label htmlFor={id} className="block font-semibold text-blue-700 mb-1 text-base">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    {description && (
      <div className="text-gray-500 text-xs mb-1">{description}</div>
    )}
    {children}
    {errors && (
      <div className="text-red-500 text-xs mt-1">{errors}</div>
    )}
    {help && (
      <div className="text-gray-400 text-xs mt-1">{help}</div>
    )}
  </div>
);

export const rjsfShadcnTheme: Partial<ThemeProps> = {
  widgets: {
    TextWidget: CustomTextWidget,
    // Adicione outros widgets customizados aqui
  },
  templates: {
    FieldTemplate: ModernFieldTemplate,
    // Adicione outros templates customizados aqui
  },
  // Você pode adicionar fields customizados se quiser
}; 