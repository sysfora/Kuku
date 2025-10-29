'use client';

import React from 'react';
import { useT } from '@kuku/react/translation/get.transation.service.client';
import dynamic from 'next/dynamic';

const MetricComponent = dynamic(
  () => import('@kuku/frontend/components/settings/metric.component'),
  {
    ssr: false,
  }
);
export const GlobalSettings = () => {
  const t = useT();
  return (
    <div className="flex flex-col">
      <h3 className="text-[20px]">{t('global_settings', 'Global Settings')}</h3>
      <MetricComponent />
    </div>
  );
};
