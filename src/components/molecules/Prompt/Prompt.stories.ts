import type { ComponentMeta } from '@storybook/react';

import { Prompt } from './Prompt';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Prompt',
  component: Prompt,
} as ComponentMeta<typeof Prompt>;
