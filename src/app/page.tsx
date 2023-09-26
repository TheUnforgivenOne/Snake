import Link from 'next/link';
import styles from './page.module.css';

const Home = () => {
  return (
    <div>
      <h2>Home page</h2>
      <div>List of games</div>
      <ul>
        <li>
          <Link href="/snake">Snake</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
