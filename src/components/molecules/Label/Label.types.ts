import type { CSSProperties, ReactElement } from 'react';

type LabelProps = {
  style: CSSProperties;
  className: string;
  htmlFor?: string;
};

export type TLabel = (props: LabelProps) => ReactElement;
