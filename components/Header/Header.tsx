'use client';

import Link from 'next/link';
import css from './Header.module.css';
import { useState } from 'react';
import Container from '../Container/Container';
import { IoMenu } from 'react-icons/io5';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import DesktopMenu from '../DesktopMenu/DesktopMenu';

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleClickLogOut = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerWrapper}>
          <Link href="/" aria-label="Home" className={css.logo}>
            NoteHub
          </Link>

          <button
            onClick={handleOpenMenu}
            type="button"
            aria-label="open menu"
            className={css.burgerBtn}
          >
            <IoMenu />
          </button>

          {/* <nav aria-label="Main Navigation">
          <AuthNavigation />
        </nav> */}

          {isOpenMenu && (
            <div className={css.mobileNav}>
              <MobileMenu
                isOpen={isOpenMenu}
                onClose={handleOpenMenu}
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleClickLogOut}
              />
            </div>
          )}

          <div className={css.desktopNav}>
            <DesktopMenu
              isAuthenticated={isAuthenticated}
              user={user}
              onLogout={handleClickLogOut}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
