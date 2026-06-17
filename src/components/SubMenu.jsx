import React, { useState } from 'react';
import styles from './SubMenu.module.css';

// Import icons
import searchIcon from '../assets/icons/search.png';
import favoriteIcon from '../assets/icons/favorite.png';
import shopIcon from '../assets/icons/shop.png';

export default function SubMenu({ favoritesCount = 0, cartCount = 0, onCartOpen }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Future search integration
  };

  return (
    <div className={styles.subMenuWrapper}>
      <div className={styles.div3}>
        {/* Category Links */}
        <div className={styles.categoriesContainer}>
          <div className={styles.subMenu}>NEW IN</div>
          <div className={styles.subMenu}>CLOTHING</div>
          <div className={styles.subMenu}>FOOTWEAR</div>
          <div className={styles.subMenu}>ACCESSORIES</div>
          <div className={styles.subMenu}>BAGS</div>
          <div className={styles.subMenu}>SALE</div>
          <div className={styles.subMenu}>DESIGNERS</div>
        </div>

        {/* Icons Action Row */}
        <div className={styles.iconsRow}>
          {/* Search Icon */}
          <div className={styles.icon} style={{ marginLeft: '30px' }} onClick={toggleSearch}>
            <img className={styles.icn} src={searchIcon} alt="Search" />
          </div>

          {/* Favorite Icon with Badge */}
          <div className={styles.icon}>
            <div className={styles.iconBadgeWrapper}>
              <img className={styles.icn} src={favoriteIcon} alt="Favorites" />
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </div>
          </div>

          {/* Cart Icon with Badge */}
          <div className={styles.icon} onClick={onCartOpen} style={{ cursor: 'pointer' }}>
            <div className={styles.iconBadgeWrapper}>
              <img className={styles.icn} src={shopIcon} alt="Cart" />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className={styles.searchBar}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search designer, product or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className={styles.searchButton}>Search</button>
            <button type="button" className={styles.closeSearch} onClick={() => setSearchOpen(false)}>×</button>
          </form>
        </div>
      )}
    </div>
  );
}
