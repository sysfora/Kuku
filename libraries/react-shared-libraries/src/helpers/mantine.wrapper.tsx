'use client';

import { ReactNode } from 'react';
import {
  DecisionEverywhere,
  ModalManager,
} from '@kuku/frontend/components/layout/new-modal';
export const MantineWrapper = (props: { children: ReactNode }) => {
  return (
    <ModalManager>
      <DecisionEverywhere />
      {props.children}
    </ModalManager>
  );
};
