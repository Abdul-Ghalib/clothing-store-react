import React from 'react';
import styles from './Footer.module.css';

// Import logos
import paypalLogo from '../assets/logos/paypal.png';
import visaLogo from '../assets/logos/visa.png';
import payment3Logo from '../assets/logos/payment3.png';
import mastercardLogo from '../assets/logos/mastercard.png';
import payment5Logo from '../assets/logos/payment5.png';
import bankLogo from '../assets/logos/bank.png';
import alipayLogo from '../assets/logos/alipay.png';
import wechatPayLogo from '../assets/logos/wechat-pay.png';

// Import icons
import stars5Icon from '../assets/icons/stars-5.svg';
import star2Icon from '../assets/icons/star2.png';
import arrowUpIcon from '../assets/icons/arrow-up.png';
import keyIcon from '../assets/icons/key.png';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        {/* Contact Info Column */}
        <div className={styles.footerInfo}>
          <h2 className={styles.head}> CONTACT US </h2>
          <ul className={styles.list}>
            <li className={styles.details}> Opening Hours: </li>
            <li> Mon-Fri 08:30 - 13:00 / 14:00 - 17:30 (CET) </li>
            <li> Closed on Sat/Sun and holidays </li>
          </ul>

          <div style={{ marginTop: '50px' }}>
            <ul className={styles.list}>
              <li>
                <span className={styles.details}> Phone: </span> +39 0761.398011
              </li>
              <li>
                <span className={styles.details}>Email:</span> customerservice@eleonorabonucci.com
              </li>
            </ul>
          </div>
        </div>

        {/* Customer Service Column */}
        <div className={styles.footerInfo}>
          <h2 className={styles.head}> CUSTOMER SERVICE </h2>
          <ul className={styles.list2}>
            <li>Customer Service</li>
            <li>General Terms Of Sale</li>
            <li>Payment</li>
            <li>Shipment</li>
            <li>Return Policy</li>
          </ul>
        </div>

        {/* About Column */}
        <div className={styles.footerInfo}>
          <h2 className={styles.head}> ABOUT ELEONORA BONUCCI </h2>
          <ul className={styles.list2}>
            <li>Privacy</li>
            <li>The Website</li>
            <li>The Boutiques</li>
            <li>Property Copyright</li>
            <li>Cookie Policy</li>
            <li>Careers</li>
          </ul>

          <div>
            <h3 className={styles.headPayment}> PAYMENT METHODS</h3>
            <div className={styles.paymentContainer}>
              <img className={styles.size} src={paypalLogo} alt="Paypal" />
              <img className={styles.size} src={visaLogo} alt="Visa" />
              <img className={styles.size} src={payment3Logo} alt="Payment Method" />
              <img className={styles.size} src={mastercardLogo} alt="Mastercard" />
              <img className={styles.size} src={payment5Logo} alt="Payment Method" />
              <img className={styles.size} src={bankLogo} alt="Bank Transfer" />
              <img className={styles.size} src={alipayLogo} alt="Alipay" />
              <img className={`${styles.size} ${styles.wechatPay}`} src={wechatPayLogo} alt="WeChat Pay" />
            </div>
          </div>
        </div>
      </div>

      {/* Trustpilot Bar */}
      <div className={styles.div9}>
        <span className={styles.exc}> EXCELLENT </span>
        <img className={styles.star} src={stars5Icon} alt="5 stars" />
        <span className={styles.review}> 601 reviews on </span>
        <img className={styles.star2} src={star2Icon} alt="star" />
        <span className={styles.trust}> Trustpilot </span>
      </div>

      {/* Upward scroll link */}
      <div className={styles.upward}>
        <a href="#nav" onClick={scrollToTop}>
          <img className={styles.arrow} src={arrowUpIcon} alt="Upward Arrow" />
        </a>
      </div>

      {/* Copyright Bar */}
      <div className={styles.div10}>
        <div className={styles.divKey}>
          <img className={styles.key} src={keyIcon} alt="Key" />
        </div>
        <div className={styles.copyrights}>
          Copyrights &copy; Eleonora Bonucci SRL - P.Iva 02025100567
        </div>
      </div>
    </footer>
  );
}
