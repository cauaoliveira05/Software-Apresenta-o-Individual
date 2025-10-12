import React from 'react';
import type { Feature } from './types';
import { ProjectIcon, FinanceIcon, ClientIcon, AutomationIcon, TimeIcon, IntegrationIcon, DocumentIcon, ReportsIcon, MobileIcon, SecurityIcon } from './components/Icons';

export const FEATURES: Feature[] = [
  {
    id: 'projects',
    name: 'Gerenciamento de Projetos e Tarefas',
    description: 'Organize projetos, atribua tarefas e acompanhe prazos de forma eficiente.',
    icon: <ProjectIcon />,
  },
  {
    id: 'finance',
    name: 'Controle Financeiro',
    description: 'Emita faturas, acompanhe pagamentos, gerencie despesas e visualize relatórios.',
    icon: <FinanceIcon />,
  },
  {
    id: 'clients',
    name: 'Gerenciamento de Clientes (CRM)',
    description: 'Mantenha um banco de dados de clientes e acompanhe as comunicações.',
    icon: <ClientIcon />,
  },
  {
    id: 'automation',
    name: 'Automação de Processos',
    description: 'Automatize tarefas recorrentes como lembretes de pagamento e geração de relatórios.',
    icon: <AutomationIcon />,
  },
  {
    id: 'time',
    name: 'Controle de Tempo',
    description: 'Registre as horas gastas em tarefas e projetos para faturamento e análise precisos.',
    icon: <TimeIcon />,
  },
  {
    id: 'integrations',
    name: 'Integrações com Terceiros',
    description: 'Conecte-se com gateways de pagamento, calendários, e-mail e outras ferramentas.',
    icon: <IntegrationIcon />,
  },
  {
    id: 'documents',
    name: 'Armazenamento de Documentos',
    description: 'Armazene e compartilhe contratos, propostas e outros arquivos com segurança.',
    icon: <DocumentIcon />,
  },
  {
    id: 'reports',
    name: 'Análise e Relatórios',
    description: 'Gere relatórios sobre desempenho, lucratividade e progresso dos projetos.',
    icon: <ReportsIcon />,
  },
  {
    id: 'mobile',
    name: 'Acesso Móvel',
    description: 'Acesse e gerencie seu negócio de qualquer lugar com um app ou site responsivo.',
    icon: <MobileIcon />,
  },
  {
    id: 'security',
    name: 'Segurança de Dados',
    description: 'Garanta que seus dados e de seus clientes estejam protegidos com segurança.',
    icon: <SecurityIcon />,
  },
];