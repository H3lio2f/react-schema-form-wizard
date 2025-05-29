// Tipos para formulários multi-step
export interface FormField {
  id: string;
  name: string;
  type: string;
  label: string;
  required: boolean;
  description?: string;
  placeholder?: string;
  validation?: {
    maxLength?: number;
    minLength?: number;
  };
}

export interface FormStep {
  id: string;
  title: string;
  schema: {
    type: string;
    required: string[];
    properties: Record<string, FormField>;
  };
}

// Tipos para formulários simples (sem steps)
export interface SimpleFormSchema {
  $id: string;
  type: string;
  title: string;
  required: string[];
  properties: Record<string, {
    type: string;
    title: string;
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    enum?: string[];
    enumNames?: string[];
  }>;
  description?: string;
}

// Tipo unificado para a estrutura do formulário
export interface FormJsonStructure {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  isMultiStep: boolean;
  json_schema: SimpleFormSchema | {
    steps: FormStep[];
    isMultiStep: boolean;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Tipo para o resultado do formulário submetido
export interface FormResult {
  formInfo: {
    id: number;
    title: string;
    isMultiStep: boolean;
    submittedAt: string;
  };
  fields: Record<string, {
    name: string;
    value: unknown;
    type: string;
    title: string;
    required: boolean;
  }>;
}

// Props do componente principal
export interface FormularioProps {
  formJson: FormJsonStructure;
  onSubmit?: (result: FormResult) => void;
  className?: string;
  customTheme?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Alias para o novo nome
export interface FormSchemaWizardProps extends FormularioProps {} 