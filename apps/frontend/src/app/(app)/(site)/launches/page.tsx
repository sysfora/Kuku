export const dynamic = 'force-dynamic';
import { LaunchesComponent } from '@kuku/frontend/components/launches/launches.component';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@kuku/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Kuku Calendar' : 'Kuku Launches'}`,
  description: '',
};
export default async function Index() {
  return <LaunchesComponent />;
}
