import { Metadata } from 'next';
import { Agent } from '@kuku/frontend/components/agents/agent';
import { AgentChat } from '@kuku/frontend/components/agents/agent.chat';
export const metadata: Metadata = {
  title: 'Kuku - Agent',
  description: '',
};
export default async function Page() {
  return (
    <AgentChat />
  );
}
