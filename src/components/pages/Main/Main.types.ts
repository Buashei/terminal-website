import type { ReactElement } from 'react';

type MainProps = Record<string, unknown>;

export type TMain = (props: MainProps) => ReactElement;
