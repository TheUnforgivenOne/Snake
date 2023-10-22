import { Binds } from '@/snake/types';
import { FC } from 'react';

const Settings: FC<{
  settings?: Binds;
  onUpdate: (newSettings?: Binds) => void;
}> = ({ settings, onUpdate }) => {
  return (
    <div>
      <h3>Settings</h3>
      {settings && (
        <div>
          <div>{settings.up}</div>
          <div>{settings.right}</div>
          <div>{settings.down}</div>
          <div>{settings.left}</div>
          <button>Apply</button>
        </div>
      )}
    </div>
  );
};

export default Settings;
