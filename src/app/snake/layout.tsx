import { FC, ReactNode } from 'react';
import classes from './layout.module.css';

const SnakeLayout: FC<{
  game: ReactNode;
  leaderboard: ReactNode;
}> = ({ game, leaderboard }) => {
  return (
    <div className={classes.layout}>
      {game}
      {leaderboard}
    </div>
  );
};

export default SnakeLayout;
