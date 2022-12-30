import { useEffect, useState } from 'react';

import { ShellService } from '@/services';
import { Label } from '@/components';
import './Prompt.scss';

import type { TPrompt } from './Prompt.types';

const shell = ShellService.getInstance();

export const Prompt: TPrompt = () => {
  const [state, setState] = useState(shell.state);

  useEffect(() => {
    shell.subscribe(setState);

    return () => shell.unsubscribe(setState);
  }, []);

  return (
    <div className='prompt'>
      <Label className='prompt__label' htmlFor='prompt_input' />
      <input
        id='prompt_input'
        name='prompt_input'
        type='text'
        className='prompt__input'
        onBlurCapture={(e) => e.target.focus()}
        value={state.terminalInput}
        onChange={(e) => shell.setTerminalInput(e.target.value)}
        onKeyDown={(e) => shell.handleEnter(e)}
      />
    </div>
  );
};
