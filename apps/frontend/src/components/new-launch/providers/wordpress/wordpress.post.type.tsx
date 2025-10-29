'use client';

import { FC, useEffect, useState } from 'react';
import { Select } from '@kuku/react/form/select';
import { useT } from '@kuku/react/translation/get.transation.service.client';
import { useCustomProviderFunction } from '@kuku/frontend/components/launches/helpers/use.custom.provider.function';
import { useSettings } from '@kuku/frontend/components/launches/helpers/use.values';
export const WordpressPostType: FC<{
  name: string;
  onChange: (event: {
    target: {
      value: string;
      name: string;
    };
  }) => void;
}> = (props) => {
  const { onChange, name } = props;
  const t = useT();
  const customFunc = useCustomProviderFunction();
  const [orgs, setOrgs] = useState([]);
  const { getValues } = useSettings();
  const [currentMedia, setCurrentMedia] = useState<string | undefined>();
  const onChangeInner = (event: {
    target: {
      value: string;
      name: string;
    };
  }) => {
    setCurrentMedia(event.target.value);
    onChange(event);
  };
  useEffect(() => {
    customFunc.get('postTypes').then((data) => setOrgs(data));
    const settings = getValues()[props.name];
    if (settings) {
      setCurrentMedia(settings);
    }
  }, []);
  if (!orgs.length) {
    return null;
  }
  return (
    <Select
      name={name}
      label="Select type"
      onChange={onChangeInner}
      value={currentMedia}
    >
      <option value="">{t('select_1', '--Select--')}</option>
      {orgs.map((org: any) => (
        <option key={org.id} value={org.id}>
          {org.name}
        </option>
      ))}
    </Select>
  );
};
