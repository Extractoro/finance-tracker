'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import Container from '@/components/Container';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import LogoIcon from '@/assets/logoIcon';
import { GrTransaction } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineCategory } from 'react-icons/md';
import { AiOutlineDashboard } from 'react-icons/ai';

const menuVariants = {
  hidden: { opacity: 0, maxHeight: 0, overflow: 'hidden' },
  visible: { opacity: 1, maxHeight: 300, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, maxHeight: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const getLinkClasses = (path: string) =>
    `group flex items-center gap-2 transition duration-300 ${
      pathname === path ? 'text-accent font-semibold' : 'text-link hover:text-hover'
    }`;

  const getIconClasses = (path: string) =>
    `transition duration-300 ${
      pathname === path ? 'text-accent' : 'text-accent group-hover:text-hover'
    }`;

  const handleResize = () => {
    if (window.innerWidth >= 640) {
      setOpen(false);
    }
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <header className="w-full max-w-screen-lg py-3 px-6 my-7 bg-header-background rounded-[2rem] shadow-xl">
        <nav className="flex items-center justify-between gap-20">
          <Link href="/dashboard">
            <LogoIcon size={60} className="fill-accent hover:fill-hover transition duration-300" />
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="xd:hidden p-2 rounded-md text-accent hover:text-hover transition duration-300"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <RiCloseLine size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 }, ease: 'easeOut' }}
                >
                  <RiMenu3Line size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <ul className="hidden xd:flex xd:flex-grow justify-evenly items-center gap-8">
            <li>
              <Link href="/dashboard" className={getLinkClasses('/dashboard')}>
                <AiOutlineDashboard className={getIconClasses('/dashboard')} size={24} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/transactions" className={getLinkClasses('/transactions')}>
                <GrTransaction className={getIconClasses('/transactions')} size={24} />
                Transactions
              </Link>
            </li>
            <li>
              <Link href="/categories" className={getLinkClasses('/categories')} onClick={() => setOpen(false)}>
                <MdOutlineCategory  className={getIconClasses('/categories')} size={24} />
                Categories
              </Link>
            </li>
            <li>
              <Link href="/profile" className={getLinkClasses('/profile')}>
                <CgProfile className={getIconClasses('/profile')} size={24} />
                Profile
              </Link>
            </li>
          </ul>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="lg:hidden flex flex-col items-center gap-4 mt-4 p-4 bg-background border-none rounded-lg shadow-lg"
            >
              <li>
                <Link href="/dashboard" className={getLinkClasses('/dashboard')} onClick={() => setOpen(false)}>
                  <AiOutlineDashboard className={getIconClasses('/dashboard')} size={24} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/transactions" className={getLinkClasses('/transactions')} onClick={() => setOpen(false)}>
                  <GrTransaction className={getIconClasses('/transactions')} size={24} />
                  Transactions
                </Link>
              </li>
              <li>
                <Link href="/categories" className={getLinkClasses('/transactions')} onClick={() => setOpen(false)}>
                  <MdOutlineCategory className={getIconClasses('/transactions')} size={24} />
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/profile" className={getLinkClasses('/profile')} onClick={() => setOpen(false)}>
                  <CgProfile className={getIconClasses('/profile')} size={24} />
                  Profile
                </Link>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </header>
    </Container>
  );
};

export default Header;
