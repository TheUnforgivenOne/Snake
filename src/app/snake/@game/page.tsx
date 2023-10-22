import { FC } from 'react';
import Info from './_components/Info';
import Settings from './_components/Settings';
import Game from './_components/Game';

import { defaultBinds } from '@/snake/entities/Settings';
import classes from './page.module.css';

const getSettings = async () => {
  return await Promise.resolve(defaultBinds);
};

const SnakePage: FC = async () => {
  const binds = await getSettings();
  return (
    <div className={classes.layout}>
      <div className={classes.utilitiesLayout}>
        <Info />
        <Settings binds={binds} />
      </div>
      <Game binds={binds} />
    </div>
  );
};

export default SnakePage;
