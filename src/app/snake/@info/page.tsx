import { FC } from 'react';
import classes from './page.module.css';

const Info: FC = () => {
  return (
    <div className={classes.layout}>
      <h2>Snake game</h2>
      <div>Eat food, grow, increase score!</div>
      <div>Use arrows to change move direction.</div>
    </div>
  );
};

export default Info;
