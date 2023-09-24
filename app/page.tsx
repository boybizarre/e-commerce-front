import Image from 'next/image';
import Header from './components/Header';
import Featured from './components/Featured';

export default function Home() {
  return (
    <div>
      <Header />
      <Featured />
    </div>
  );
}
