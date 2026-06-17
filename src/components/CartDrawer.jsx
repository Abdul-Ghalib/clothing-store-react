import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div className={styles.drawerOverlay} onClick={onClose} />

      {/* Slide-in Drawer */}
      <div className={`${styles.drawerContainer} ${isOpen ? styles.drawerContainerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>YOUR CART</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        <div className={styles.itemList}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyMessage}>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.itemImg} />
                <div className={styles.itemDetails}>
                  <p className={styles.itemDesigner}>{item.designer}</p>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemSize}>SIZE: {item.size}</p>
                  <p className={styles.itemPrice}>€{item.price}</p>
                  
                  <div className={styles.quantityRow}>
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className={styles.qtyNum}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer sticky section */}
        <div className={styles.drawerFooter}>
          <div className={styles.subtotalRow}>
            <span>SUBTOTAL</span>
            <span className={styles.subtotalPrice}>€{cartTotal.toLocaleString()}</span>
          </div>

          {cartItems.length > 0 ? (
            <Link to="/checkout" className={styles.checkoutBtn} onClick={onClose}>
              PROCEED TO CHECKOUT
            </Link>
          ) : (
            <button className={styles.checkoutBtn} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              PROCEED TO CHECKOUT
            </button>
          )}

          <button className={styles.continueBtn} onClick={onClose}>
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </>
  );
}
