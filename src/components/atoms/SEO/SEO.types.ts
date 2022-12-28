import type { ReactElement } from 'react';

type SEOProps = {
  title: string;
  description: string;
  name: string;
  type: string;
};

export type TSEO = (props: SEOProps) => ReactElement;
