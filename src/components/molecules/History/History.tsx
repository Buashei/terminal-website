import { useEffect, useState } from 'react';

import { ShellService } from '@/services';
import { Label } from '@/components';
import './History.scss';

import type { THistory } from './History.types';

const shell = ShellService.getInstance();

export const History: THistory = () => {
  const [state, setState] = useState(shell.state);

  useEffect(() => {
    shell.subscribe(setState);

    return () => shell.unsubscribe(setState);
  }, []);

  return (
    <div className='history'>
      {state.terminalOutput.map((element, idx) => {
        return (
          <div key={`history__row--${idx}`} className='history__row'>
            <div className='history__info'>
              <Label className='history__label' />
              <div className='history__command'>commandName</div>
            </div>
            <div className='history__shell-output'>{element}</div>
          </div>
        );
      })}
    </div>
  );
};
