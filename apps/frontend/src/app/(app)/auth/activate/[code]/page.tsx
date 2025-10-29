export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { AfterActivate } from '@kuku/frontend/components/auth/after.activate';
import { isGeneralServerSide } from '@kuku/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${
    isGeneralServerSide() ? 'Kuku' : 'Kuku'
  } - Activate your account`,
  description: '',
};
export default async function Auth() {
  return <AfterActivate />;
}
