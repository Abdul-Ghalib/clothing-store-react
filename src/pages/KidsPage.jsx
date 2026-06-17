import React, { useState } from 'react';
import styles from './KidsPage.module.css';
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
import heroImg from '../assets/clothing-styles/kid-1.jpg';
import p1 from '../assets/clothing-styles/kid-6.jpg';
import p2 from '../assets/clothing-styles/kid-3.jpg';
import p3 from '../assets/clothing-styles/kid-5.jpg';
import p4 from '../assets/clothing-styles/kid-4.jpg';
import s1 from '../assets/clothing-styles/kid-7.jpg';
import s2 from '../assets/clothing-styles/kid-8.jpg';
import s3 from '../assets/clothing-styles/kid-9.jpg';

export default function KidsPage() {
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const [cartOpen, setCartOpen] = useState(false);

  const products = [
    {
      id: 'k1',
      image: p1,
      designer: 'VERSACE F/W 23',
      title: 'All New Arrivals for her',
      cta: 'SHOP NOW',
      price: 220,
      category: 'kids',
      name: 'VERSACE F/W 23 - All New Arrivals for her'
    },
    {
      id: 'k2',
      image: p2,
      designer: 'KENZO KIDS F/W 23',
      title: 'Sports Jackets',
      cta: 'DISCOVER THE SELECTION',
      price: 180,
      category: 'kids',
      name: 'KENZO KIDS F/W 23 - Sports Jackets'
    },
    {
      id: 'k3',
      image: p3,
      designer: 'SWEATERS EDIT',
      title: 'Fall is Coming',
      cta: 'SHOP NOW',
      price: 195,
      category: 'kids',
      name: 'SWEATERS EDIT - Fall is Coming'
    },
    {
      id: 'k4',
      image: p4,
      designer: 'CANADA GOOSE F/W 23',
      title: 'All New Arrivals for him',
      cta: 'SHOP NOW',
      price: 165,
      category: 'kids',
      name: 'CANADA GOOSE F/W 23 - All New Arrivals for him'
    }
  ];

  const styleItems = [
    {
      id: 'ks1',
      image: s1,
      brand: 'BABY SELECTION',
      title: 'Fashion for the Little Ones',
      cta: 'SHOP NOW'
    },
    {
      id: 'ks2',
      image: s2,
      brand: 'SKIRTS',
      title: 'Relaxed and Cool',
      cta: 'DISCOVER NOW'
    },
    {
      id: 'ks3',
      image: s3,
      brand: 'DENIM MANIA',
      title: 'Urban Style',
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
      <Navbar activePage="kids" />
      <Logo />
      <SubMenu favoritesCount={favoritesCount} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <HeroBanner src={heroImg} alt="Kids' Collection Banner" />
      
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
