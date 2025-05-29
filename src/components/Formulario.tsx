"use client"

import Form from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import { rjsfShadcnTheme } from "./rjsfShadcnTheme";
import { cn } from "../utils/cn";
import {
  FormStep,
  SimpleFormSchema,
  FormResult,
  FormularioProps
} from "../types";

// Widget customizado para select
const CustomSelectWidget = (props: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { id, options, value, required, disabled, multiple, onChange, onBlur, onFocus, placeholder, schema } = props;
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value === '' ? undefined : event.target.value;
    onChange(newValue);
  };

  const handleBlur = () => {
    if (onBlur) onBlur(id, value);
  };

  const handleFocus = () => {
    if (onFocus) onFocus(id, value);
  };
  
  return (
    <select
      id={id}
      value={value || ''}
      required={required}
      disabled={disabled}
      multiple={multiple}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      aria-label={schema?.title || placeholder || 'Select option'}
      className="flex h-10 w-full rounded-md border-2 border-blue-700 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.enumOptions?.map((option: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Tema customizado com widget de select estilizado
const customTheme = {
  ...rjsfShadcnTheme,
  widgets: {
    ...rjsfShadcnTheme.widgets,
    SelectWidget: CustomSelectWidget,
  },
};

export default function Formulario({ 
  formJson, 
  onSubmit, 
  className,
  customTheme: userCustomTheme 
}: FormularioProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const finalTheme = userCustomTheme || customTheme;

  useEffect(() => {
    const form = window.document.querySelector("button[type='submit']") as HTMLButtonElement;
    if (form) {
      form.style.display = "none";
    }
  }, []);

  // Converte o schema customizado para o formato RJSF (para multi-step)
  const convertToRJSFSchema = (stepSchema: FormStep["schema"]): RJSFSchema => {
    const properties: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    const required: string[] = [];

    Object.entries(stepSchema.properties).forEach(([key, field]) => {
      properties[key] = {
        type: field.type,
        title: field.label,
        description: field.description,
        ...(field.validation?.minLength && { minLength: field.validation.minLength }),
        ...(field.validation?.maxLength && { maxLength: field.validation.maxLength }),
      };

      if (field.required) {
        required.push(key);
      }
    });

    return {
      type: "object",
      properties,
      required,
    };
  };

  // Converte campos object para file inputs em formulários simples
  const convertSimpleSchemaForFiles = (schema: SimpleFormSchema): RJSFSchema => {
    const convertedProperties: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    
    Object.entries(schema.properties).forEach(([key, field]) => {
      if (field.type === "object") {
        // Converte campos object para file input
        convertedProperties[key] = {
          type: "string",
          format: "data-url",
          title: field.title,
          description: "Selecione um arquivo",
        };
      } else {
        convertedProperties[key] = {
          type: field.type,
          title: field.title,
          placeholder: field.placeholder,
          ...(field.maxLength && { maxLength: field.maxLength }),
          ...(field.minLength && { minLength: field.minLength }),
          ...(field.enum && { enum: field.enum }),
          ...(field.enumNames && { enumNames: field.enumNames }),
        };
      }
    });

    return {
      type: "object",
      properties: convertedProperties,
      required: schema.required,
    } as RJSFSchema;
  };

  // Valida campos obrigatórios e outras validações dinâmicas
  const validateCurrentStep = (schema: RJSFSchema): boolean => {
    const currentErrors: Record<string, string> = {};
    const requiredFields = schema.required || [];
    const properties = schema.properties || {};
    
    // Verifica campos obrigatórios
    requiredFields.forEach((fieldName) => {
      const value = formData[fieldName];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        const fieldTitle = (properties[fieldName] as any)?.title || fieldName; // eslint-disable-line @typescript-eslint/no-explicit-any
        currentErrors[fieldName] = `${fieldTitle} é obrigatório`;
      }
    });

    // Verifica validações dinâmicas para todos os campos preenchidos
    Object.entries(formData).forEach(([fieldName, value]) => {
      if (value && properties[fieldName]) {
        const fieldSchema = properties[fieldName] as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        const fieldTitle = fieldSchema.title || fieldName;
        
        // Validação de minLength
        if (fieldSchema.minLength && typeof value === 'string' && value.length < fieldSchema.minLength) {
          currentErrors[fieldName] = `${fieldTitle} deve ter pelo menos ${fieldSchema.minLength} caracteres`;
        }
        
        // Validação de maxLength
        if (fieldSchema.maxLength && typeof value === 'string' && value.length > fieldSchema.maxLength) {
          currentErrors[fieldName] = `${fieldTitle} deve ter no máximo ${fieldSchema.maxLength} caracteres`;
        }
        
        // Validação de minimum (para números)
        if (fieldSchema.minimum !== undefined && typeof value === 'number' && value < fieldSchema.minimum) {
          currentErrors[fieldName] = `${fieldTitle} deve ser pelo menos ${fieldSchema.minimum}`;
        }
        
        // Validação de maximum (para números)
        if (fieldSchema.maximum !== undefined && typeof value === 'number' && value > fieldSchema.maximum) {
          currentErrors[fieldName] = `${fieldTitle} deve ser no máximo ${fieldSchema.maximum}`;
        }
        
        // Validação de pattern (regex)
        if (fieldSchema.pattern && typeof value === 'string') {
          const regex = new RegExp(fieldSchema.pattern);
          if (!regex.test(value)) {
            currentErrors[fieldName] = `${fieldTitle} não está no formato correto`;
          }
        }
        
        // Validação de enum (valores permitidos)
        if (fieldSchema.enum && !fieldSchema.enum.includes(value)) {
          currentErrors[fieldName] = `${fieldTitle} deve ser um dos valores permitidos`;
        }
        
        // Validação de format (email, date, etc.)
        if (fieldSchema.format && typeof value === 'string') {
          switch (fieldSchema.format) {
            case 'email':
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                currentErrors[fieldName] = `${fieldTitle} deve ser um email válido`;
              }
              break;
            case 'date':
              const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
              if (!dateRegex.test(value)) {
                currentErrors[fieldName] = `${fieldTitle} deve ser uma data válida (YYYY-MM-DD)`;
              }
              break;
            case 'uri':
            case 'url':
              try {
                new URL(value);
              } catch {
                currentErrors[fieldName] = `${fieldTitle} deve ser uma URL válida`;
              }
              break;
          }
        }
      }
    });

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  // Atualiza os dados acumulados
  const handleChange = (e: { formData?: Record<string, unknown> }) => {
    if (e.formData) {
      setFormData((prev) => ({
        ...prev,
        ...e.formData,
      }));
      // Limpa erros quando o usuário começa a digitar
      setErrors({});
    }
  };

  // Avança para o próximo step (apenas para multi-step)
  const handleNext = () => {
    const multiStepSchema = formJson.json_schema as { steps: FormStep[]; isMultiStep: boolean };
    const currentStep = multiStepSchema.steps[step];
    const currentSchema = convertToRJSFSchema(currentStep.schema);
    
    if (validateCurrentStep(currentSchema)) {
      setStep((s) => s + 1);
    }
  };

  // Volta para o step anterior (apenas para multi-step)
  const handleBack = () => {
    setStep((s) => s - 1);
    setErrors({}); // Limpa erros ao voltar
  };

  // Submete o formulário
  const handleSubmit = () => {
    let schema: RJSFSchema;
    
    if (formJson.isMultiStep) {
      const multiStepSchema = formJson.json_schema as { steps: FormStep[]; isMultiStep: boolean };
      const currentStep = multiStepSchema.steps[step];
      schema = convertToRJSFSchema(currentStep.schema);
    } else {
      const simpleSchema = formJson.json_schema as SimpleFormSchema;
      schema = convertSimpleSchemaForFiles(simpleSchema);
    }
    
    if (validateCurrentStep(schema)) {
      // Cria o JSON estruturado com valores e tipos
      const formResult: FormResult = {
        formInfo: {
          id: formJson.id,
          title: formJson.title,
          isMultiStep: formJson.isMultiStep,
          submittedAt: new Date().toISOString(),
        },
        fields: {} as Record<string, {
          name: string;
          value: unknown;
          type: string;
          title: string;
          required: boolean;
        }>
      };

      // Para formulários multi-step, coleta dados de todos os steps
      if (formJson.isMultiStep) {
        const multiStepSchema = formJson.json_schema as { steps: FormStep[]; isMultiStep: boolean };
        
        multiStepSchema.steps.forEach((stepData) => {
          Object.entries(stepData.schema.properties).forEach(([fieldKey, fieldInfo]) => {
            const value = formData[fieldKey];
            if (value !== undefined) {
              formResult.fields[fieldKey] = {
                name: fieldKey,
                value: value,
                type: fieldInfo.type,
                title: fieldInfo.label,
                required: fieldInfo.required
              };
            }
          });
        });
      } else {
        // Para formulários simples
        const simpleSchema = formJson.json_schema as SimpleFormSchema;
        
        Object.entries(simpleSchema.properties).forEach(([fieldKey, fieldInfo]) => {
          const value = formData[fieldKey];
          if (value !== undefined) {
            formResult.fields[fieldKey] = {
              name: fieldKey,
              value: value,
              type: fieldInfo.type === "object" ? "file" : fieldInfo.type, // Marca campos object como file
              title: fieldInfo.title,
              required: simpleSchema.required.includes(fieldKey)
            };
          }
        });
      }

      setSubmitted(true);
      
      // Chama callback se fornecido, senão apenas loga
      if (onSubmit) {
        onSubmit(formResult);
      } else {
        console.log("Form Result JSON:", JSON.stringify(formResult, null, 2));
      }
      
      return formResult;
    }
  };

  // Verifica se é um formulário multi-step ou simples
  const isMultiStep = formJson?.isMultiStep;
  
  if (isMultiStep) {
    // Lógica para formulários multi-step
    const multiStepSchema = formJson.json_schema as { steps: FormStep[]; isMultiStep: boolean };

    const steps = multiStepSchema.steps;
    const currentStep = steps[step];
    const currentSchema = convertToRJSFSchema(currentStep.schema);

    return (
      <div className={cn("flex flex-col gap-4 min-w-200", className)}>
        {/* Título geral do formulário */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{formJson.title}</h1>
          {formJson.description && (
            <p className="text-gray-600 mt-2">{formJson.description}</p>
          )}
        </div>

        {/* Indicador de progresso */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{currentStep.title}</h2>
            <span className="text-sm text-gray-500">
              {step + 1} de {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <Form
          schema={currentSchema}
          validator={validator as any} // eslint-disable-line @typescript-eslint/no-explicit-any
          formData={formData}
          onChange={handleChange}
          onSubmit={step === steps.length - 1 ? handleSubmit : handleNext}
          showErrorList={false}
          noHtml5Validate
          {...finalTheme}
          templates={{
            ...finalTheme.templates,
            SubmitButton: () => null,
          } as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        />
        
        {/* Exibição de erros de validação */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
            <h4 className="text-red-800 font-semibold mb-2">Corrija os seguintes erros:</h4>
            <ul className="text-red-700 list-disc list-inside">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold shadow-md transition-colors duration-200"
            onClick={handleBack}
            disabled={step === 0}
          >
            Voltar
          </Button>
          {step < steps.length - 1 ? (
            <Button
              type="button"
              className="bg-blue-700 cursor-pointer text-white hover:bg-blue-800 px-6 py-2 rounded-md font-semibold shadow-md transition-colors duration-200"
              onClick={handleNext}
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-green-700 cursor-pointer text-white hover:bg-green-800 px-6 py-2 rounded-md font-semibold shadow-md transition-colors duration-200"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          )}
        </div>
        
        {submitted && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            Formulário enviado com sucesso!
          </div>
        )}
      </div>
    );
  } else {
    // Lógica para formulários simples (sem steps)
    const simpleSchema = formJson.json_schema as SimpleFormSchema;
    const convertedSchema = convertSimpleSchemaForFiles(simpleSchema);

    return (
      <div className={cn("flex flex-col gap-4 min-w-200", className)}>
        {/* Título do formulário */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{simpleSchema.title}</h2>
          {simpleSchema.description && (
            <p className="text-gray-600 mt-2">{simpleSchema.description}</p>
          )}
        </div>

        <Form
          schema={convertedSchema}
          validator={validator as any} // eslint-disable-line @typescript-eslint/no-explicit-any
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          showErrorList={false}
          noHtml5Validate
          {...finalTheme}
          templates={{
            ...finalTheme.templates,
            SubmitButton: () => null,
          } as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        />
        
        {/* Exibição de erros de validação */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
            <h4 className="text-red-800 font-semibold mb-2">Corrija os seguintes erros:</h4>
            <ul className="text-red-700 list-disc list-inside">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex justify-end mt-6">
          <Button
            type="button"
            className="bg-green-700 cursor-pointer text-white hover:bg-green-800 px-6 py-2 rounded-md font-semibold shadow-md transition-colors duration-200"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </div>
        
        {submitted && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            Formulário enviado com sucesso!
          </div>
        )}
      </div>
    );
  }
} 