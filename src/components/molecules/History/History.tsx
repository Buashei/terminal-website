import { useEffect, useState } from 'react';

import { ShellService } from '@/services';
import { Label } from '@/components';
import * as commands from '@/services/Shell/commands';
import './History.scss';

import type { THistory } from './History.types';

const shell = ShellService.getInstance();
shell.setHistory({
  date: Date.now(),
  command: 'version',
  output: commands.version(),
});

export const History: THistory = () => {
  const [state, setState] = useState(shell.state);

  useEffect(() => {
    shell.subscribe(setState);

    return () => shell.unsubscribe(setState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [state.history.length]);

  return (
    <div className='history'>
      {state.history.map(({ id, command, output }) => {
        return (
          <div key={`history__row--${id}`} className='history__row'>
            <div className='history__info'>
              <Label className='history__label' />
              <div className='history__command'>{command}</div>
            </div>
            <p className='history__shell-output'>{output}</p>
          </div>
        );
      })}
    </div>
  );
};
