import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar({ activePage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navBar} id="nav">
      {/* Mobile Hamburger Toggle Button */}
      <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
        ☰
      </button>

      {/* Desktop Left Nav Links */}
      <div className={styles.navLinksLeft}>
        <div className={styles.linkWrapper} style={{ marginRight: '5px', width: '70px' }}>
          <Link
            className={activePage === 'women' ? styles.active : styles.link}
            to="/women"
          >
            WOMEN
          </Link>
        </div>
        <div className={styles.linkWrapper} style={{ marginLeft: '5px', width: '60px' }}>
          <Link
            className={activePage === 'men' ? styles.active : styles.link}
            to="/"
          >
            MEN
          </Link>
        </div>
        <div className={styles.linkWrapper} style={{ marginLeft: '5px', width: '50px' }}>
          <Link
            className={activePage === 'kids' ? styles.active : styles.link}
            to="/kids"
          >
            KIDS
          </Link>
        </div>
      </div>

      {/* Center Animated Strip */}
      <div className={styles.animDiv}>
        <p>
          <span className={styles.animation}>
            AN EXTRA 20% OFF AT CHECKOUT ON SELECTED SALE ITEMS
          </span>
        </p>
      </div>

      {/* Desktop Right Nav Info / Account */}
      <div className={styles.navLinksRight}>
        <div className={styles.linkWrapper} style={{ marginRight: '20px', width: '100px' }}>
          ITALIA-EN|EUR-€
        </div>
        <div className={styles.linkWrapper} style={{ width: '85px' }}>
          <Link
            className={activePage === 'signup' ? styles.active2 : styles.link2}
            to="/signup"
          >
            MY ACCOUNT
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {menuOpen && (
        <div className={styles.mobileDropdown}>
          <Link
            className={activePage === 'women' ? styles.mobileActiveLink : styles.mobileLink}
            to="/women"
            onClick={() => setMenuOpen(false)}
          >
            WOMEN
          </Link>
          <Link
            className={activePage === 'men' ? styles.mobileActiveLink : styles.mobileLink}
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            MEN
          </Link>
          <Link
            className={activePage === 'kids' ? styles.mobileActiveLink : styles.mobileLink}
            to="/kids"
            onClick={() => setMenuOpen(false)}
          >
            KIDS
          </Link>
          <Link
            className={activePage === 'signup' ? styles.mobileActiveLink : styles.mobileLink}
            to="/signup"
            onClick={() => setMenuOpen(false)}
          >
            MY ACCOUNT
          </Link>
          <div className={styles.mobileInfo}>
            ITALIA-EN|EUR-€
          </div>
        </div>
      )}
    </nav>
  );
}
