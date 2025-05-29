"use client";

import Formulario from './Formulario';
import { FormularioProps } from '../types';

/**
 * Client Component wrapper for Next.js App Router
 * Use this component when you need to render the form in a Client Component context
 */
export default function FormularioClient(props: FormularioProps) {
  return <Formulario {...props} />;
} 