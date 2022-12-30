import type { ComponentMeta } from '@storybook/react';

import { Label } from './Label';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Label',
  component: Label,
} as ComponentMeta<typeof Label>;
