export const dynamic = 'force-dynamic';
import { Forgot } from '@kuku/frontend/components/auth/forgot';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@kuku/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Kuku' : 'Kuku'} Forgot Password`,
  description: '',
};
export default async function Auth() {
  return <Forgot />;
}
