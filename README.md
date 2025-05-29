# React Schema Form Wizard

A customizable React library for JSON Schema-based forms with multi-step support and shadcn/ui components.

## 🚀 Features

- ✅ **JSON Schema-based Forms** - Configure forms using JSON Schema
- 🎯 **Multi-step Forms** - Native support for multi-step forms
- 🎨 **shadcn/ui Components** - Modern and accessible interface
- 🔧 **Highly Customizable** - Customizable themes and widgets
- ✨ **Robust Validation** - Real-time and custom validation
- 📱 **Responsive** - Works perfectly on desktop and mobile
- 🌐 **TypeScript** - Full TypeScript support

## 📦 Installation

```bash
npm install react-schema-form-wizard
# or
yarn add react-schema-form-wizard
# or
pnpm add react-schema-form-wizard
```

### Required Dependencies

The library requires some peer dependencies:

```bash
npm install react react-dom
```

## 🔧 Basic Usage

### Simple Form

```tsx
import { Formulario } from 'react-schema-form-wizard';

const formSchema = {
  id: 1,
  documentId: "simple-form",
  title: "Contact Form",
  description: "Fill in your contact details",
  isMultiStep: false,
  json_schema: {
    $id: "contact-form",
    type: "object",
    title: "Contact",
    required: ["name", "email"],
    properties: {
      name: {
        type: "string",
        title: "Full name",
        placeholder: "Enter your name"
      },
      email: {
        type: "string",
        title: "Email",
        placeholder: "Enter your email"
      },
      message: {
        type: "string",
        title: "Message",
        placeholder: "Your message"
      }
    }
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString()
};

function App() {
  const handleSubmit = (result) => {
    console.log('Form data:', result);
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

### Multi-Step Form

```tsx
import { Formulario } from 'react-schema-form-wizard';

const multiStepFormSchema = {
  id: 2,
  documentId: "multi-step-form",
  title: "Complete Registration",
  description: "Complete your registration in a few steps",
  isMultiStep: true,
  json_schema: {
    isMultiStep: true,
    steps: [
      {
        id: "step1",
        title: "Personal Information",
        schema: {
          type: "object",
          required: ["firstName", "lastName"],
          properties: {
            firstName: {
              id: "firstName",
              name: "firstName",
              type: "string",
              label: "First Name",
              required: true,
              placeholder: "Your first name"
            },
            lastName: {
              id: "lastName",
              name: "lastName", 
              type: "string",
              label: "Last Name",
              required: true,
              placeholder: "Your last name"
            }
          }
        }
      },
      {
        id: "step2",
        title: "Contact",
        schema: {
          type: "object",
          required: ["email"],
          properties: {
            email: {
              id: "email",
              name: "email",
              type: "string",
              label: "Email",
              required: true,
              placeholder: "your@email.com"
            },
            phone: {
              id: "phone",
              name: "phone",
              type: "string",
              label: "Phone",
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

## 🎨 Customization

### Custom Theme

```tsx
import { Formulario, rjsfShadcnTheme } from 'react-schema-form-wizard';

const customTheme = {
  ...rjsfShadcnTheme,
  widgets: {
    ...rjsfShadcnTheme.widgets,
    // Your custom widgets
  },
  templates: {
    ...rjsfShadcnTheme.templates,
    // Your custom templates
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

### CSS Styles

The library uses Tailwind CSS. Make sure to include the necessary classes in your project or use a custom theme.

## 📋 API Props

### FormularioProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `formJson` | `FormJsonStructure` | ✅ | Form configuration |
| `onSubmit` | `(result: FormResult) => void` | ❌ | Callback executed on submit |
| `className` | `string` | ❌ | Additional CSS classes |
| `customTheme` | `any` | ❌ | Custom theme |

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

## 🛠️ Development

### Build the library

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

### Type checking

```bash
npm run type-check
```

## 📄 License

MIT © Hélio Fragão Fila

## 🤝 Contributing

Contributions are welcome! Please open an issue or pull request.

## 📧 Contact

- Author: Hélio Fragão Fila
- Email: heliofragaofila.helio@gmail.com
- GitHub: https://github.com/H3lio2f/react-schema-form-wizard

## 🔗 Useful Links

- [JSON Schema](https://json-schema.org/)
- [React JSON Schema Form](https://rjsf-team.github.io/react-jsonschema-form/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/) 