import { User } from '@/types/user';
import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';
import css from './DesktopMenu.module.css';

interface Props {
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
}

const DesktopMenu = ({ isAuthenticated, user, onLogout }: Props) => {
  return (
    <nav aria-label="main-menu">
      <ul className={css.menu}>
        {isAuthenticated ? (
          <>
            <li className={css.navigationItem}>
              <Link href="/profile" prefetch={false} className={css.navigationLink}>
                {user?.username}
              </Link>
            </li>

            <li>
              <TagsMenu />
            </li>

            <li className={css.navigationItem}>
              <Link href={'/notes/action/create'} className={css.navigationLink}>
                Create note
              </Link>
            </li>

            <li className={css.navigationItem}>
              <button className={css.logoutButton} onClick={onLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={css.navigationItem}>
              <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                Login
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
