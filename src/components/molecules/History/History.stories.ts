import type { ComponentMeta } from '@storybook/react';

import { Output } from './History';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Output',
  component: Output,
} as ComponentMeta<typeof Output>;
