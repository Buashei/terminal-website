import type { ReactElement } from 'react';

type LabelContentProps = {
  attrs?: { color: string; text: string }[];
};

export type TLabelContent = (props: LabelContentProps) => ReactElement;
