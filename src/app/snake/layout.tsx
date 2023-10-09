import { FC, ReactNode } from 'react';
import classes from './layout.module.css';

const SnakeLayout: FC<{
  info: ReactNode;
  game: ReactNode;
  leaderboard: ReactNode;
}> = ({ info, game, leaderboard }) => {
  return (
    <div className={classes.layout}>
      {info}
      {game}
      {leaderboard}
    </div>
  );
};

export default SnakeLayout;
