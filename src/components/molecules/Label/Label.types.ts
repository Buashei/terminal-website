import type { ReactElement } from 'react';

type LabelProps = {
  className: string;
  htmlFor?: string;
};

export type TLabel = (props: LabelProps) => ReactElement;
