'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useModals } from '@kuku/frontend/components/layout/new-modal';
import { Button } from '@kuku/react/form/button';
import { ConnectChannels } from '@kuku/frontend/components/onboarding/connect.channels';
import { useVariables } from '@kuku/react/helpers/variable.context';
import { useT } from '@kuku/react/translation/get.transation.service.client';
import { ModalWrapperComponent } from '@kuku/frontend/components/new-launch/modal.wrapper.component';

const Welcome: FC = () => {
  const { isGeneral } = useVariables();
  const [step, setStep] = useState(1);
  const router = useRouter();

  const goToLaunches = useCallback(() => {
    router.push('/launches');
  }, []);

  return (
    <div className="relative">
      {step === 2 - (isGeneral ? 1 : 0) && (
        <div>
          <ConnectChannels />
          <div className="flex justify-end gap-[8px]">
            <Button onClick={goToLaunches}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};
export const Onboarding: FC = () => {
  const query = useSearchParams();
  const modal = useModals();
  const modalOpen = useRef(false);
  const t = useT();

  useEffect(() => {
    const onboarding = query.get('onboarding');
    if (!onboarding) {
      modalOpen.current = false;
      modal.closeAll();
      return;
    }
    modalOpen.current = true;
    modal.openModal({
      title: t('onboarding', 'Onboarding'),
      withCloseButton: false,
      closeOnEscape: false,
      size: '900px',
      children: <Welcome />,
    });
  }, [query]);
  return null;
};
