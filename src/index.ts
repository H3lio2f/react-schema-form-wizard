// Estilos CSS
import './styles/index.css';

// Componente principal
export { default as FormSchemaWizard } from './components/FormSchemaWizard';

// Client Component wrapper for Next.js App Router
export { default as FormSchemaWizardClient } from './components/FormSchemaWizardClient';

// Tipos
export type {
  FormField,
  FormStep,
  SimpleFormSchema,
  FormJsonStructure,
  FormResult,
  FormularioProps,
  FormSchemaWizardProps
} from './types';

// Tema
export { rjsfShadcnTheme } from './components/rjsfShadcnTheme';

// Componentes UI (caso o usuário queira usar separadamente)
export { Button } from './components/ui/button';
export { Input } from './components/ui/input';

// Utilitários
export { cn } from './utils/cn'; 