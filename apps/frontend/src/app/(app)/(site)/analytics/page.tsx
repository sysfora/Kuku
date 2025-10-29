export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { PlatformAnalytics } from '@kuku/frontend/components/platform-analytics/platform.analytics';
import { isGeneralServerSide } from '@kuku/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Kuku' : 'Kuku'} Analytics`,
  description: '',
};
export default async function Index() {
  return <PlatformAnalytics />;
}
