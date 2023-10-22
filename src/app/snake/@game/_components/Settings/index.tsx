import { SnakeBinds } from '@/snake/types';
import { FC } from 'react';

const Settings: FC<{
  binds: SnakeBinds;
  // onUpdate: (newSettings?: Binds) => void;
}> = ({ binds }) => {
  return (
    <div>
      <h3>Settings</h3>
      {binds && (
        <div>
          <div>{binds.up}</div>
          <div>{binds.right}</div>
          <div>{binds.down}</div>
          <div>{binds.left}</div>
          <button>Apply</button>
        </div>
      )}
    </div>
  );
};

export default Settings;
