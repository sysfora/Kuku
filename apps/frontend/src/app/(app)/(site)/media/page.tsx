import { MediaLayoutComponent } from '@kuku/frontend/components/new-layout/layout.media.component';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@kuku/helpers/utils/is.general.server.side';

export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Kuku' : 'Kuku'} Media`,
  description: '',
};

export default async function Page() {
  return <MediaLayoutComponent />
}
