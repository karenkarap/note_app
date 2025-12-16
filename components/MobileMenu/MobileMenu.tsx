import { useEffect, useState } from 'react';
import css from './MobileMenu.module.css';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { User } from '@/types/user';
import { usePathname } from 'next/navigation';
import { tagsList } from '@/types/note';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
}

const MobileMenu = ({ isOpen, onClose, isAuthenticated, onLogout, user }: MobileMenuProps) => {
  const [isOpenAccardion, setIsOpenAccardion] = useState(false);
  const pathname = usePathname();

  const handleClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClickMenu = () => {
    onClose();
  };

  const handleLogout = () => {
    onClose();
    onLogout();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClickAccardeon = () => {
    setIsOpenAccardion(!isOpenAccardion);
  };

  return (
    <div className={`${css.backdrop} ${isOpen ? css.open : ''}`} onClick={handleClickBackdrop}>
      <div className={`${css.mobileMenu} ${css.open}`}>
        <button
          className={css.burgerBtnClose}
          type="button"
          onClick={() => onClose()}
          aria-label="close-menu"
        >
          <IoClose />
        </button>

        <nav aria-label="Main Navigation">
          <ul className={css.mobileNavList}>
            {isAuthenticated ? (
              <>
                <li className={`${css.headerNavListItem} ${pathname === '/' ? css.active : ''}`}>
                  <Link href="/" onClick={handleClickMenu}>
                    Home
                  </Link>
                </li>
                <li
                  className={`${css.headerNavListItem} ${pathname.startsWith('/profile') ? css.active : ''}`}
                >
                  <Link
                    href="/profile"
                    prefetch={false}
                    className={css.navigationLink}
                    onClick={handleClickMenu}
                  >
                    {user?.username || 'Profile'}
                  </Link>
                </li>

                <li className={`${css.headerNavListItem} ${css.accardeon}`}>
                  <div onClick={handleClickAccardeon}>Notes</div>
                  {isOpenAccardion && (
                    <ul className={css.menuList}>
                      {tagsList.map((tag) => {
                        const href = `/notes/filter/${tag}`;
                        const isActive = pathname === href;

                        return (
                          <li
                            key={tag}
                            className={`${css.menuItem} ${isActive ? css.active : ''}`}
                            onClick={onClose}
                          >
                            <Link href={href}>{tag}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
                <li className={`${css.headerNavListItem} ${css.logout}`}>
                  <button className={css.logoutButton} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li
                  className={`${css.headerNavListItem} ${pathname === '/sign-in' ? css.active : ''}`}
                  onClick={onClose}
                >
                  <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                    Login
                  </Link>
                </li>
                <li
                  className={`${css.headerNavListItem} ${pathname === '/sign-up' ? css.active : ''}`}
                  onClick={onClose}
                >
                  <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
