import { SEO, History, Prompt } from '@/components';

export const Main = () => {
  return (
    <div className='shell' style={{ width: '100%' }}>
      <SEO
        title='buashei.codes | terminal'
        description='test description of terminal on buashei.codes page'
        name='buashei.codes'
        type='website'
      />

      <div className='shell__container'>
        <History />
        <Prompt />
      </div>
    </div>
  );
};
