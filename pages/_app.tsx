import '../styles/globals.css';

// pages/index.js
import Link from 'next/link';
import Main from "./Main/Main"
import Header from '../components/layout/Header';
import NavBar from '../components/layout/NavBar';

export default function Home() {
  return (
    <div>
      {/* MainHome */}
      <Link href="/">
        <Header/>
      </Link>
      <Main/>
      <NavBar/>
    </div>
  );
}
