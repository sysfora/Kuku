'use client';

import {
  PostComment,
  withProvider,
} from '@kuku/frontend/components/new-launch/providers/high.order.provider';
import { FacebookDto } from '@kuku/nestjs-libraries/dtos/posts/providers-settings/facebook.dto';
import { Input } from '@kuku/react/form/input';
import { useSettings } from '@kuku/frontend/components/launches/helpers/use.values';

export const FacebookSettings = () => {
  const { register } = useSettings();

  return (
    <Input
      label={
        'Embedded URL (only for text Post)'
      }
      {...register('url')}
    />
  );
};

export default withProvider({
  postComment: PostComment.COMMENT,
  minimumCharacters: [],
  SettingsComponent: FacebookSettings,
  CustomPreviewComponent: undefined,
  dto: FacebookDto,
  checkValidity: undefined,
  maximumCharacters: 63206,
});
