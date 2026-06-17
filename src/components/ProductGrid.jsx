import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductGrid.module.css';
import addStyles from './ProductCardAdditions.module.css';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

function ProductCard({ product, isTall }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const [favorited, setFavorited] = useState(isFavorite(product.id));
  const [selectedSize, setSelectedSize] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !favorited;
    setFavorited(nextState);
    toggleFavorite(product.id);
  };

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert("Please log in or register to add items to your cart.");
      navigate('/signup');
      return;
    }

    if (!selectedSize) {
      setShowError(true);
      return;
    }
    setShowError(false);
    addToCart({
      ...product,
      size: selectedSize
    });
  };

  const isAlreadyInCart = selectedSize ? isInCart(product.id, selectedSize) : false;

  return (
    <div className={styles.productCard}>
      <div className={isTall ? styles.tallImageDiv : styles.shortImageDiv}>
        <img
          className={isTall ? styles.tallImage : styles.shortImage}
          src={product.image}
          alt={product.title}
        />
        {/* Hover Overlay */}
        <div className={styles.overlay}>
          <span className={styles.quickViewText}>Quick View</span>
        </div>
        {/* Heart Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`${styles.favoriteButton} ${favorited ? styles.active : ''}`}
          aria-label="Add to favorites"
        >
          {favorited ? '♥' : '♡'}
        </button>
      </div>
      <div className={styles.productInfo}>
        <p className={styles.designer}>{product.designer}</p>
        <p className={addStyles.priceText}>€{product.price}</p>
        <p className={styles.titleText}>{product.title}</p>
        <p className={styles.ctaText}>{product.cta}</p>

        {/* Size Selector & Add to Cart Section */}
        <div className={addStyles.sizeSelectorContainer}>
          <span className={addStyles.sizeLabel}>Select Size</span>
          <div className={addStyles.sizeButtonsRow}>
            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                type="button"
                className={`${addStyles.sizeBtn} ${selectedSize === size ? addStyles.sizeBtnActive : ''}`}
                onClick={() => {
                  setSelectedSize(size);
                  setShowError(false);
                }}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to Cart Button */}
          {isAlreadyInCart ? (
            <button type="button" className={addStyles.inCartBtn}>
              IN CART ✓
            </button>
          ) : (
            <button type="button" className={addStyles.addToCartBtn} onClick={handleAddToCart}>
              ADD TO CART
            </button>
          )}

          {showError && <span className={addStyles.errorText}>Please select a size</span>}
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ products }) {
  if (!products || products.length < 4) return null;

  return (
    <div className={styles.clothesMain}>
      {/* Column 1 */}
      <div className={styles.clothesDiv}>
        <ProductCard product={products[0]} isTall={true} />
        <ProductCard product={products[1]} isTall={false} />
      </div>

      {/* Column 2 */}
      <div className={styles.clothesDiv2}>
        <ProductCard product={products[2]} isTall={false} />
        <ProductCard product={products[3]} isTall={true} />
      </div>
    </div>
  );
}
