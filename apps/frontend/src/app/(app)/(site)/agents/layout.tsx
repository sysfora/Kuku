import { Metadata } from 'next';
import { Agent } from '@kuku/frontend/components/agents/agent';
export const metadata: Metadata = {
  title: 'Kuku - Agent',
  description: '',
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Agent>{children}</Agent>;
}
