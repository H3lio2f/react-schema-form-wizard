# React Schema Form Wizard

Uma biblioteca React customizável para formulários baseados em JSON Schema com suporte a multi-step e componentes shadcn/ui.

## 🚀 Características

- ✅ **Formulários baseados em JSON Schema** - Configure formulários usando JSON Schema
- 🎯 **Multi-step Forms** - Suporte nativo para formulários em várias etapas
- 🎨 **Componentes shadcn/ui** - Interface moderna e acessível
- 🔧 **Altamente customizável** - Temas e widgets personalizáveis
- ✨ **Validação robusta** - Validação em tempo real e personalizada
- 📱 **Responsivo** - Funciona perfeitamente em desktop e mobile
- 🌐 **TypeScript** - Suporte completo ao TypeScript

## 📦 Instalação

```bash
npm install react-schema-form-wizard
# ou
yarn add react-schema-form-wizard
# ou
pnpm add react-schema-form-wizard
```

### Dependências necessárias

A biblioteca requer algumas peer dependencies:

```bash
npm install react react-dom
```

## 🔧 Uso Básico

### Formulário Simples

```tsx
import { Formulario } from 'react-schema-form-wizard';

const formSchema = {
  id: 1,
  documentId: "simple-form",
  title: "Formulário de Contato",
  description: "Preencha seus dados de contato",
  isMultiStep: false,
  json_schema: {
    $id: "contact-form",
    type: "object",
    title: "Contato",
    required: ["name", "email"],
    properties: {
      name: {
        type: "string",
        title: "Nome completo",
        placeholder: "Digite seu nome"
      },
      email: {
        type: "string",
        title: "E-mail",
        placeholder: "Digite seu e-mail"
      },
      message: {
        type: "string",
        title: "Mensagem",
        placeholder: "Sua mensagem"
      }
    }
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString()
};

function App() {
  const handleSubmit = (result) => {
    console.log('Dados do formulário:', result);
  };

  return (
    <div className="p-4">
      <Formulario 
        formJson={formSchema} 
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

### Formulário Multi-Step

```tsx
import { Formulario } from 'react-schema-form-wizard';

const multiStepFormSchema = {
  id: 2,
  documentId: "multi-step-form",
  title: "Cadastro Completo",
  description: "Complete seu cadastro em algumas etapas",
  isMultiStep: true,
  json_schema: {
    isMultiStep: true,
    steps: [
      {
        id: "step1",
        title: "Dados Pessoais",
        schema: {
          type: "object",
          required: ["firstName", "lastName"],
          properties: {
            firstName: {
              id: "firstName",
              name: "firstName",
              type: "string",
              label: "Nome",
              required: true,
              placeholder: "Seu primeiro nome"
            },
            lastName: {
              id: "lastName",
              name: "lastName", 
              type: "string",
              label: "Sobrenome",
              required: true,
              placeholder: "Seu sobrenome"
            }
          }
        }
      },
      {
        id: "step2",
        title: "Contato",
        schema: {
          type: "object",
          required: ["email"],
          properties: {
            email: {
              id: "email",
              name: "email",
              type: "string",
              label: "E-mail",
              required: true,
              placeholder: "seu@email.com"
            },
            phone: {
              id: "phone",
              name: "phone",
              type: "string",
              label: "Telefone",
              required: false,
              placeholder: "(11) 99999-9999"
            }
          }
        }
      }
    ]
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString()
};

function App() {
  return (
    <div className="p-4">
      <Formulario formJson={multiStepFormSchema} />
    </div>
  );
}
```

## 🎨 Customização

### Tema Personalizado

```tsx
import { Formulario, rjsfShadcnTheme } from 'react-schema-form-wizard';

const customTheme = {
  ...rjsfShadcnTheme,
  widgets: {
    ...rjsfShadcnTheme.widgets,
    // Seus widgets customizados
  },
  templates: {
    ...rjsfShadcnTheme.templates,
    // Seus templates customizados
  }
};

function App() {
  return (
    <Formulario 
      formJson={formSchema}
      customTheme={customTheme}
    />
  );
}
```

### Estilos CSS

A biblioteca usa Tailwind CSS. Certifique-se de incluir as classes necessárias no seu projeto ou use um tema customizado.

## 📋 Props da API

### FormularioProps

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `formJson` | `FormJsonStructure` | ✅ | Configuração do formulário |
| `onSubmit` | `(result: FormResult) => void` | ❌ | Callback executado ao submeter |
| `className` | `string` | ❌ | Classes CSS adicionais |
| `customTheme` | `any` | ❌ | Tema personalizado |

### FormJsonStructure

```typescript
interface FormJsonStructure {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  isMultiStep: boolean;
  json_schema: SimpleFormSchema | MultiStepSchema;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
```

### FormResult

```typescript
interface FormResult {
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
```

## 🛠️ Desenvolvimento

### Construir a biblioteca

```bash
cd lib
npm install
npm run build
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Verificação de tipos

```bash
npm run type-check
```

## 📄 Licença

MIT © Hélio Fragão Fila

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## 📧 Contato

- Autor: Hélio Fragão Fila
- Email: heliofragaofila.helio@gmail.com
- GitHub: https://github.com/heliofragaofila/react-schema-form-wizard

## 🔗 Links Úteis

- [JSON Schema](https://json-schema.org/)
- [React JSON Schema Form](https://rjsf-team.github.io/react-jsonschema-form/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/) 