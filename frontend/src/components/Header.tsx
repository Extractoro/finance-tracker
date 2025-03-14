"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import Container from '@/components/Container';
import { RiDashboardLine } from 'react-icons/ri';
import LogoIcon from '@/assets/logoIcon';
import { GrTransaction } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';

const Header = () => {
  const pathname = usePathname();

  const getLinkClasses = (path: string) =>
    `group flex items-center gap-2 transition duration-300 ${
      pathname === path ? "text-accent font-semibold" : "text-link hover:text-hover"
    }`;

  const getIconClasses = (path: string) =>
    `transition duration-300 ${
      pathname === path ? "text-accent" : "text-accent group-hover:text-hover"
    }`;

  return (
    <Container>
      <header className="w-full max-w-screen-md py-3 px-6 my-7 bg-header-background rounded-[2rem]">
        <nav className="flex items-center justify-between gap-16">
          <Link href="/dashboard">
            <LogoIcon size={60} className="fill-accent hover:fill-hover transition duration-300" />
          </Link>
          <ul className="flex items-center justify-evenly flex-grow">
            <li>
              <Link href="/dashboard" className={getLinkClasses("/dashboard")}>
                <RiDashboardLine className={getIconClasses("/dashboard")} size={24} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/transactions" className={getLinkClasses("/transactions")}>
                <GrTransaction className={getIconClasses("/transactions")} size={24} />
                Transactions
              </Link>
            </li>
            <li>
              <Link href="/profile" className={getLinkClasses("/profile")}>
                <CgProfile className={getIconClasses("/profile")} size={24} />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
