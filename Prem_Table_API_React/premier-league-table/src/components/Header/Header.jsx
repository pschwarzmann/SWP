import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 70);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.logoContainer}>
        <img 
          src="/img/premierleague-1024x1024.png" 
          className={styles.logo} 
          alt="Premier League Logo" 
        />
        <span className={styles.title}>Premier League</span>
      </div>

      <div className={styles.navContainer}>
        <div className={styles.buttonGroup}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `${styles.navButton} ${isActive ? styles.active : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/table" 
            className={({ isActive }) => 
              `${styles.navButton} ${isActive ? styles.active : ''}`
            }
          >
            Table
          </NavLink>
        </div>
        <img 
          src="/img/kbalken.png" 
          className={styles.navIndicator} 
          alt="Navigation indicator" 
        />
      </div>
    </header>
  );
}