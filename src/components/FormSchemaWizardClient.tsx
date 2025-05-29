"use client";

import FormSchemaWizard from './FormSchemaWizard';
import { FormSchemaWizardProps } from '../types';

/**
 * Client Component wrapper for Next.js App Router
 * Use this component when you need to render the form in a Client Component context
 */
export default function FormSchemaWizardClient(props: FormSchemaWizardProps) {
  return <FormSchemaWizard {...props} />;
} 