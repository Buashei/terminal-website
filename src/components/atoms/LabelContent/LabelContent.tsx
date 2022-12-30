import type { TLabelContent } from './LabelContent.types';

export const LabelContent: TLabelContent = ({
  attrs = [
    { color: 'rgb(215, 153, 33)', text: 'guest' },
    { color: 'rgb(168, 153, 132)', text: '@' },
    { color: 'rgb(168, 153, 132)', text: 'buashei.codes' },
    { color: 'rgb(168, 153, 132)', text: ':$ ~' },
  ],
}) => {
  return (
    <div className='labelContent'>
      {attrs.map(({ color, text }, idx) => (
        <span className={`labelContent__element--${idx}`} key={`prompt_label_content#${idx}`} style={{ color: color }}>
          {text}
        </span>
      ))}
    </div>
  );
};
