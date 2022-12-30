import { LabelContent } from '@/components';

import type { TLabel } from './Label.types';

export const Label: TLabel = ({ style, className, htmlFor }) => {
  if (htmlFor === undefined) {
    return (
      <label className={className} style={style} htmlFor={htmlFor}>
        <LabelContent />
      </label>
    );
  }
  return (
    <div className={className} style={style}>
      <LabelContent />
    </div>
  );
};
