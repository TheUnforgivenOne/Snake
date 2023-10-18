import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h2>Home page</h2>
      <div>List of games</div>
      <ul>
        <li>
          <Link href="/snake">Snake</Link>
        </li>
        <li>
          <Link href="/core">Core playground</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
