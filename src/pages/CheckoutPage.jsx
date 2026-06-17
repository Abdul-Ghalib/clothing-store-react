import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import SubMenu from '../components/SubMenu';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import styles from './CheckoutPage.module.css';

// Import logos for payment
import paypalLogo from '../assets/logos/paypal.png';
import visaLogo from '../assets/logos/visa.png';
import payment3Logo from '../assets/logos/payment3.png';
import mastercardLogo from '../assets/logos/mastercard.png';
import payment5Logo from '../assets/logos/payment5.png';
import bankLogo from '../assets/logos/bank.png';
import alipayLogo from '../assets/logos/alipay.png';
import wechatPayLogo from '../assets/logos/wechat-pay.png';

export default function CheckoutPage({ onPlaceOrder }) {
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  const [cartOpen, setCartOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');

  // Credit Card states
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Errors state
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    if (!email.trim()) {
      errs.email = 'Email Address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) errs.email = 'Invalid email address format';
    }
    if (!phone.trim()) errs.phone = 'Phone Number is required';
    if (!address.trim()) errs.address = 'Shipping Address is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!postalCode.trim()) errs.postalCode = 'Postal Code is required';
    if (!country.trim()) errs.country = 'Country is required';

    if (paymentMethod === 'Credit/Debit Card') {
      const cardNumClean = cardNumber.replace(/\s+/g, '');
      if (!cardNumber.trim()) {
        errs.cardNumber = 'Card Number is required';
      } else if (cardNumClean.length !== 16 || !/^\d+$/.test(cardNumClean)) {
        errs.cardNumber = 'Card Number must be exactly 16 digits';
      }

      if (!expiryDate.trim()) {
        errs.expiryDate = 'Expiry Date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        errs.expiryDate = 'Expiry Date must be in MM/YY format';
      }

      if (!cvv.trim()) {
        errs.cvv = 'CVV is required';
      } else if ((cvv.length !== 3 && cvv.length !== 4) || !/^\d+$/.test(cvv)) {
        errs.cvv = 'CVV must be 3 or 4 digits';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const defaultOnPlaceOrder = (formData) => {
    console.log('Order form payload:', formData);
    // TODO: replace with API call to POST /api/orders
    clearCart();
    navigate('/order-success');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = {
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        paymentMethod,
        ...(paymentMethod === 'Credit/Debit Card' ? { cardNumber, expiryDate, cvv } : {})
      };

      if (onPlaceOrder) {
        onPlaceOrder(formData);
      } else {
        defaultOnPlaceOrder(formData);
      }
    }
  };

  return (
    <div className={styles.checkoutWrapper}>
      <Navbar activePage="checkout" />
      <Logo />
      <SubMenu favoritesCount={favoritesCount} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <div className={styles.checkoutTitleContainer}>
        <h1 className={styles.checkoutTitle}>CHECKOUT</h1>
      </div>

      <div className={styles.checkoutGrid}>
        {/* Left Column: Form */}
        <div className={styles.formColumn}>
          <h2 className={styles.sectionTitle}>SHIPPING & PAYMENT DETAILS</h2>
          <form onSubmit={handleSubmit} noValidate>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name *</label>
              <input
                type="text"
                className={styles.input}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && <p className={styles.errorText}>{errors.fullName}</p>}
            </div>

            <div className={styles.rowInputs}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address *</label>
                <input
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Shipping Address *</label>
              <textarea
                className={styles.textarea}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <p className={styles.errorText}>{errors.address}</p>}
            </div>

            <div className={styles.rowInputs}>
              <div className={styles.formGroup}>
                <label className={styles.label}>City *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && <p className={styles.errorText}>{errors.city}</p>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Postal Code *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                {errors.postalCode && <p className={styles.errorText}>{errors.postalCode}</p>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Country *</label>
              <input
                type="text"
                className={styles.input}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              {errors.country && <p className={styles.errorText}>{errors.country}</p>}
            </div>

            <h2 className={styles.sectionTitle} style={{ marginTop: '30px' }}>Payment Method</h2>
            <div className={styles.paymentOptions}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  className={styles.radioInput}
                  value="Credit/Debit Card"
                  checked={paymentMethod === 'Credit/Debit Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit/Debit Card
              </label>
              
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  className={styles.radioInput}
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  className={styles.radioInput}
                  value="Bank Transfer"
                  checked={paymentMethod === 'Bank Transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Bank Transfer
              </label>
            </div>

            {paymentMethod === 'Credit/Debit Card' && (
              <div className={styles.cardFieldsContainer}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Card Number *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="1234 5678 1234 5678"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/[^\d]/g, '').substring(0, 16))}
                  />
                  {errors.cardNumber && <p className={styles.errorText}>{errors.cardNumber}</p>}
                </div>

                <div className={styles.rowInputs}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Expiry Date (MM/YY) *</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="MM/YY"
                      maxLength={5}
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                    {errors.expiryDate && <p className={styles.errorText}>{errors.expiryDate}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>CVV *</label>
                    <input
                      type="password"
                      className={styles.input}
                      placeholder="123"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, ''))}
                    />
                    {errors.cvv && <p className={styles.errorText}>{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className={styles.submitBtn}>
              PLACE ORDER
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className={styles.summaryColumn}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          
          <div className={styles.summaryItemsList}>
            {cartItems.length === 0 ? (
              <p className={styles.emptySummaryText}>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className={styles.summaryItem}>
                  <img src={item.image} alt={item.name} className={styles.summaryItemImg} />
                  <div className={styles.summaryItemDetails}>
                    <p className={styles.summaryItemName}>{item.name}</p>
                    <p className={styles.summaryItemSize}>SIZE: {item.size}</p>
                    <p className={styles.summaryItemPriceQty}>
                      €{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.totalsContainer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>€{cartTotal.toLocaleString()}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className={styles.grandTotalRow}>
              <span>Total</span>
              <span>€{cartTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className={styles.paymentLogosRow}>
            <p className={styles.logosTitle}>WE ACCEPT SECURE PAYMENTS</p>
            <div className={styles.logosFlex}>
              <img src={paypalLogo} alt="Paypal" className={styles.logoImg} />
              <img src={visaLogo} alt="Visa" className={styles.logoImg} />
              <img src={payment3Logo} alt="Payment Method" className={styles.logoImg} />
              <img src={mastercardLogo} alt="Mastercard" className={styles.logoImg} />
              <img src={payment5Logo} alt="Payment Method" className={styles.logoImg} />
              <img src={bankLogo} alt="Bank Transfer" className={styles.logoImg} />
              <img src={alipayLogo} alt="Alipay" className={styles.logoImg} />
              <img src={wechatPayLogo} alt="WeChat Pay" className={styles.logoImg} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
