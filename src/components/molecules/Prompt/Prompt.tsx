import { useEffect, useState } from 'react';

import { ShellService } from '@/services';
import { Label } from '@/components';
import { isMobile } from '@/helpers';
import './Prompt.scss';

import type { TPrompt } from './Prompt.types';

const shell = ShellService.getInstance();

export const Prompt: TPrompt = () => {
  const [state, setState] = useState(shell.state);

  useEffect(() => {
    shell.subscribe(setState);

    return () => shell.unsubscribe(setState);
  }, []);

  if (isMobile) {
    return (
      <div className='prompt'>
        <div className='prompt__row'>
          <div className='prompt__decorator'>╭─</div>
          <Label className='prompt__label' htmlFor='prompt_input' />
        </div>
        <div className='prompt__row'>
          <div className='prompt__decorator'>╰─</div>
          <input
            id='prompt_input'
            name='prompt_input'
            type='text'
            className='prompt__input'
            onBlurCapture={(e) => e.target.focus()}
            value={state.prompt}
            onChange={(e) => shell.setPrompt(e.target.value)}
            onKeyDown={(e) => shell.handleKeyboard(e)}
          />
        </div>
      </div>
    );
  }
  return (
    <div className='prompt'>
      <Label className='prompt__label' htmlFor='prompt_input' />
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={true}
        id='prompt_input'
        name='prompt_input'
        type='text'
        className='prompt__input'
        onBlur={(e) =>
          setTimeout(() => {
            e.target.focus();
          }, 100)
        }
        value={state.prompt}
        onChange={(e) => shell.setPrompt(e.target.value)}
        onKeyDown={(e) => shell.handleKeyboard(e)}
      />
    </div>
  );
};
