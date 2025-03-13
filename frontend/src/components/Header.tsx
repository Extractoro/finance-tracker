import React from 'react';
import Link from 'next/link';
import Container from '@/components/Container';
import { RiDashboardLine } from 'react-icons/ri';
import LogoIcon from '@/assets/logoIcon';
import { GrTransaction } from 'react-icons/gr';

const Header = () => {
  return (
    <Container>
      <header className="w-full max-w-screen-md py-3 px-6 mt-5 bg-header-background rounded-[2rem]">
        <nav className='flex items-center justify-between gap-16'>
          <Link href="/dashboard"><LogoIcon size={60} classname='fill-accent hover:fill-hover transition duration-300' /></Link>
          <ul className='flex items-center justify-evenly flex-grow'>
            <li>
              <Link href="/dashboard"
                    className="group flex items-center gap-2 text-link hover:text-hover transition duration-300">
                <RiDashboardLine className="text-accent transition duration-300 group-hover:text-hover" size={24} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/transactions"
                    className="group flex items-center gap-2 text-link hover:text-hover transition duration-300">
                <GrTransaction className="text-accent transition duration-300 group-hover:text-hover" size={24} />
                Transactions
              </Link>
            </li>
            <li>
              <Link href="/transactions"
                    className="group flex items-center gap-2 text-link hover:text-hover transition duration-300">
                <GrTransaction className="text-accent transition duration-300 group-hover:text-hover" size={24} />
                Transactions
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
};
export default Header;
