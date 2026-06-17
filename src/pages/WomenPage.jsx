import React, { useState } from 'react';
import styles from './WomenPage.module.css';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import SubMenu from '../components/SubMenu';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import PromoBanner from '../components/PromoBanner';
import StyleRow from '../components/StyleRow';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { subscribeNewsletter } from '../services/api';

// Import assets
import heroImg from '../assets/clothing-styles/wm-1.jpg';
import p1 from '../assets/clothing-styles/wm-2.jpg';
import p2 from '../assets/clothing-styles/wm4.jpg';
import p3 from '../assets/clothing-styles/wm-3.jpg';
import p4 from '../assets/clothing-styles/wm-5.jpg';
import s1 from '../assets/clothing-styles/wm-6.jpg';
import s2 from '../assets/clothing-styles/wm7.jpg';
import s3 from '../assets/clothing-styles/wm-8.jpg';

export default function WomenPage() {
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const [cartOpen, setCartOpen] = useState(false);

  const products = [
    {
      id: 'w1',
      image: p1,
      designer: 'VICTORIA BECKHAM',
      title: 'New look to discover',
      cta: 'DISCOVER THE SELECTION',
      price: 1100,
      category: 'women',
      name: 'VICTORIA BECKHAM - New look to discover'
    },
    {
      id: 'w2',
      image: p2,
      designer: 'RENE CAOVILLA',
      title: 'Highlighted Shoes',
      cta: 'SHOP NOW',
      price: 780,
      category: 'women',
      name: 'RENE CAOVILLA - Highlighted Shoes'
    },
    {
      id: 'w3',
      image: p3,
      designer: 'BAGS',
      title: 'Bags to Invest in',
      cta: 'SHOP NOW',
      price: 950,
      category: 'women',
      name: 'BAGS - Bags to Invest in'
    },
    {
      id: 'w4',
      image: p4,
      designer: 'KHAITE',
      title: 'Cold Season, New Wardrobe',
      cta: 'DISCOVER OUR SELECTION',
      price: 1350,
      category: 'women',
      name: 'KHAITE - Cold Season, New Wardrobe'
    }
  ];

  const styleItems = [
    {
      id: 'ws1',
      image: s1,
      brand: 'MAISON KITSUNÉ X BARBOUR',
      title: 'Unexpected Pairing',
      cta: 'SHOP NOW'
    },
    {
      id: 'ws2',
      image: s2,
      brand: 'MM6 MAISON MARGIELA X SALOMON',
      title: 'Elevate your look',
      cta: 'SHOP NOW'
    },
    {
      id: 'ws3',
      image: s3,
      brand: 'TRANSITIONAL LAYERING',
      title: 'Brighten your wardrobe',
      cta: 'SHOP NOW'
    }
  ];

  const handleNewsletterSubscribe = async (email) => {
    console.log('Newsletter subscription request payload:', { email });
    // TODO: replace with API call
    try {
      const result = await subscribeNewsletter(email);
      console.log('Newsletter subscription result:', result);
    } catch (err) {
      console.error('Newsletter subscription failed:', err);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar activePage="women" />
      <Logo />
      <SubMenu favoritesCount={favoritesCount} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <HeroBanner src={heroImg} alt="Women's Collection Banner" />
      
      <div className={styles.titleContainer}>
        <h1 className={styles.pageTitle}>Discover latest arrivals</h1>
      </div>

      <ProductGrid products={products} />
      <PromoBanner />
      <StyleRow styles={styleItems} />
      <Newsletter onSubscribe={handleNewsletterSubscribe} />
      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
