import type { ReactElement } from 'react';

type PromptProps = Record<string, unknown>;

export type TPrompt = (props: PromptProps) => ReactElement;
