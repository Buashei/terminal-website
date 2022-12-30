import type { ReactElement } from 'react';

type HistoryProps = Record<string, unknown>;

export type THistory = (props: HistoryProps) => ReactElement;
