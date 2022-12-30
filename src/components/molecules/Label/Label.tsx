import { LabelContent } from '@/components';

import type { TLabel } from './Label.types';

export const Label: TLabel = ({ className, htmlFor }) => {
  if (htmlFor === undefined) {
    return (
      <label className={className} htmlFor={htmlFor}>
        <LabelContent />
      </label>
    );
  }
  return (
    <div className={className}>
      <LabelContent />
    </div>
  );
};
