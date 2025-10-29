import { ContinueIntegration } from '@kuku/frontend/components/launches/continue.integration';
export const dynamic = 'force-dynamic';
export default async function Page({
  params: { provider },
  searchParams,
}: {
  params: {
    provider: string;
  };
  searchParams: any;
}) {
  return <ContinueIntegration searchParams={searchParams} provider={provider} />;
}
