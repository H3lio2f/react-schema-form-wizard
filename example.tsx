import React from 'react';
import { Formulario, FormResult } from './src/index';

// Exemplo de formulário simples
const simpleFormExample = {
  id: 1,
  documentId: "contact-form",
  title: "Formulário de Contato",
  description: "Entre em contato conosco",
  isMultiStep: false,
  json_schema: {
    $id: "contact",
    type: "object",
    title: "Contato",
    required: ["name", "email"],
    properties: {
      name: {
        type: "string",
        title: "Nome completo",
        placeholder: "Digite seu nome completo"
      },
      email: {
        type: "string",
        title: "E-mail",
        placeholder: "seu@email.com"
      },
      subject: {
        type: "string",
        title: "Assunto",
        enum: ["suporte", "vendas", "geral"],
        enumNames: ["Suporte Técnico", "Vendas", "Geral"]
      },
      message: {
        type: "string",
        title: "Mensagem",
        placeholder: "Digite sua mensagem"
      }
    }
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString()
};

// Exemplo de formulário multi-step
const multiStepFormExample = {
  id: 2,
  documentId: "registration-form",
  title: "Cadastro de Usuário",
  description: "Complete seu cadastro em algumas etapas simples",
  isMultiStep: true,
  json_schema: {
    isMultiStep: true,
    steps: [
      {
        id: "personal-info",
        title: "Informações Pessoais",
        schema: {
          type: "object",
          required: ["firstName", "lastName", "birthDate"],
          properties: {
            firstName: {
              id: "firstName",
              name: "firstName",
              type: "string",
              label: "Nome",
              required: true,
              placeholder: "Seu primeiro nome",
              validation: {
                minLength: 2
              }
            },
            lastName: {
              id: "lastName",
              name: "lastName",
              type: "string",
              label: "Sobrenome",
              required: true,
              placeholder: "Seu sobrenome",
              validation: {
                minLength: 2
              }
            },
            birthDate: {
              id: "birthDate",
              name: "birthDate",
              type: "string",
              label: "Data de Nascimento",
              required: true,
              placeholder: "DD/MM/AAAA"
            }
          }
        }
      },
      {
        id: "contact-info",
        title: "Informações de Contato",
        schema: {
          type: "object",
          required: ["email", "phone"],
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
              required: true,
              placeholder: "(11) 99999-9999"
            },
            address: {
              id: "address",
              name: "address",
              type: "string",
              label: "Endereço",
              required: false,
              placeholder: "Rua, número, bairro"
            }
          }
        }
      },
      {
        id: "preferences",
        title: "Preferências",
        schema: {
          type: "object",
          required: [],
          properties: {
            newsletter: {
              id: "newsletter",
              name: "newsletter",
              type: "boolean",
              label: "Receber newsletter",
              required: false
            },
            notifications: {
              id: "notifications",
              name: "notifications",
              type: "boolean",
              label: "Receber notificações",
              required: false
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

// Componente de exemplo
export function FormExample() {
  const handleFormSubmit = (result: FormResult) => {
    console.log('Formulário submetido:', result);
    alert('Formulário enviado com sucesso! Verifique o console.');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Exemplos de Uso - React Schema Form Wizard
      </h1>
      
      {/* Formulário Simples */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Formulário Simples</h2>
        <Formulario 
          formJson={simpleFormExample}
          onSubmit={handleFormSubmit}
          className="w-full"
        />
      </div>
      
      {/* Formulário Multi-Step */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Formulário Multi-Step</h2>
        <Formulario 
          formJson={multiStepFormExample}
          onSubmit={handleFormSubmit}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default FormExample; 