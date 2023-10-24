import { FC } from 'react';
import Info from './_components/Info';
import Settings from './_components/Settings';
import Game from './_components/Game';

import classes from './page.module.css';

const getSettings = async () => {
  const res = await fetch('http://localhost:3000/api/snake/settings').then(
    (res) => res.json(),
  );
  return res.data;
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
