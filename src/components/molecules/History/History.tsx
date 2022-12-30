import { useEffect, useState } from 'react';

import { ShellService } from '@/services';
import { Label } from '@/components';

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
          <div key={`history__row--${idx}`} className='history__row' style={{ marginBottom: '0.2rem' }}>
            <div className='history__info' style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.1rem' }}>
              <Label className='history__label' style={{ flexShrink: 1 }} />
              <div className='history__command' style={{ flexGrow: 1, marginLeft: '0.5rem' }}>
                commandName
              </div>
            </div>
            <div className='history__typewriter'>{element}</div>
          </div>
        );
      })}
    </div>
  );
};
