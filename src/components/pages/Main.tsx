import { useEffect, useState } from 'react';
import { ShellService } from 'src/services';
import { Input, SEO } from 'src/components';

const shell = new ShellService();

export const Main = () => {
  const [state, setState] = useState(shell.state);

  useEffect(() => {
    shell.subscribe(setState);

    return () => shell.unsubscribe(setState);
  }, []);

  return (
    <>
      <SEO
        title='buashei.codes | terminal'
        description='test description of terminal on buashei.codes page'
        name='buashei.codes'
        type='website'
      />
      <div className='terminalOutput'>
        {state.terminalOutput.map((element, idx) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`element${idx}`} style={{ marginBottom: '0.2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.1rem' }}>
                <div style={{ flexShrink: 1 }}>
                  <span style={{ color: 'rgb(215, 153, 33)' }}>guest</span>
                  <span style={{ color: 'rgb(168, 153, 132)' }}>@</span>
                  <span style={{ color: 'rgb(152, 151, 26)' }}>buashei.codes</span>
                  <span style={{ color: 'rgb(168, 153, 132)' }}>:$ ~</span>
                </div>
                <div style={{ flexGrow: 1, marginLeft: '0.5rem' }}>commandName</div>
              </div>
              <div className='typewriter'>{element}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100vw' }}>
        <label htmlFor='prompt' style={{ flexShrink: 1 }}>
          <span style={{ color: 'rgb(215, 153, 33)' }}>guest</span>
          <span style={{ color: 'rgb(168, 153, 132)' }}>@</span>
          <span style={{ color: 'rgb(152, 151, 26)' }}>buashei.codes</span>
          <span style={{ color: 'rgb(168, 153, 132)' }}>:$ ~</span>
        </label>
        <Input
          id='prompt'
          type='text'
          className='terminalInput'
          onBlurCapture={(e) => e.target.focus()}
          value={state.terminalInput}
          onChange={(e) => shell.setTerminalInput(e.target.value)}
          onKeyDown={(e) => shell.handleEnter(e)}
        />
      </div>
    </>
  );
};
