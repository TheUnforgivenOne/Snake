'use client';
import { FC, useEffect, useState } from 'react';
import { SnakeBinds } from '@/snake/types';
import { useRouter } from 'next/navigation';

const editingValue = 'Editing';

const Settings: FC<{ binds: SnakeBinds }> = ({ binds }) => {
  const [settings, setSettings] = useState(binds);
  const [editingKey, setEditingKey] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log('updated', binds);
    setSettings(binds);
  }, [binds]);

  useEffect(() => {
    const handleNewBind = (e: KeyboardEvent) => {
      setEditingKey('');
      setSettings((s) => ({ ...s, [editingKey]: e.code }));
    };

    document.addEventListener('keydown', handleNewBind);
    if (!editingKey) {
      document.removeEventListener('keydown', handleNewBind);
    }

    return () => {
      document.removeEventListener('keydown', handleNewBind);
    };
  }, [editingKey]);

  const handleStartEditing = (dir: string) => {
    setEditingKey(dir);
    setSettings((s) => ({ ...s, [dir]: editingValue }));
  };

  const sendData = async () => {
    await fetch('http://localhost:3000/api/snake/settings', {
      method: 'POST',
      body: JSON.stringify({ binds: settings }),
    });
    router.refresh();
  };

  return (
    <div>
      <h3>Settings</h3>
      <div>
        {Object.entries(settings).map(([dir, keyBind]) => (
          <button
            key={dir}
            id={dir}
            disabled={!!editingKey && keyBind !== editingValue}
            onClick={() => handleStartEditing(dir)}
          >
            {keyBind}
          </button>
        ))}
        <button onClick={sendData}>Apply</button>
      </div>
    </div>
  );
};

export default Settings;
