import React, { useState } from 'react';
import styles from './MenPage.module.css';
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
import heroImg from '../assets/clothing-styles/style-1.jpg';
import p1 from '../assets/clothing-styles/style-2.jpg';
import p2 from '../assets/clothing-styles/style-6.jpg';
import p3 from '../assets/clothing-styles/style-3.jpg';
import p4 from '../assets/clothing-styles/style5.jpg';
import s1 from '../assets/clothing-styles/style7.jpg';
import s2 from '../assets/clothing-styles/style8.jpg';
import s3 from '../assets/clothing-styles/style9.jpg';

export default function MenPage() {
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const [cartOpen, setCartOpen] = useState(false);

  const products = [
    {
      id: 'm1',
      image: p1,
      designer: 'VIVIENNE WESTWOOD',
      title: 'Rock the Season',
      cta: 'DISCOVER THE SELECTION',
      price: 890,
      category: 'men',
      name: 'VIVIENNE WESTWOOD - Rock the Season'
    },
    {
      id: 'm2',
      image: p2,
      designer: 'BRUNELLO CUCINELLI BARBOUR',
      title: 'Unexpected Pairing',
      cta: 'SHOP NOW',
      price: 1250,
      category: 'men',
      name: 'BRUNELLO CUCINELLI BARBOUR - Unexpected Pairing'
    },
    {
      id: 'm3',
      image: p3,
      designer: 'MAISON KITSUNÉ X BARBOUR',
      title: 'Cold Season, New Wardrobe',
      cta: 'SHOP NOW',
      price: 620,
      category: 'men',
      name: 'MAISON KITSUNÉ X BARBOUR - Cold Season, New Wardrobe'
    },
    {
      id: 'm4',
      image: p4,
      designer: '3PARADIS',
      title: 'Empower Your Wardrobe',
      cta: 'DISCOVER OUR SELECTION',
      price: 480,
      category: 'men',
      name: '3PARADIS - Empower Your Wardrobe'
    }
  ];

  const styleItems = [
    {
      id: 'ms1',
      image: s1,
      brand: "LEVI'S X ERL",
      title: 'Denim Ispiration',
      cta: 'SHOP NOW'
    },
    {
      id: 'ms2',
      image: s2,
      brand: 'BAGS EDIT',
      title: 'Brighten your wardrobe',
      cta: 'DISCOVER THE SELECTION'
    },
    {
      id: 'ms3',
      image: s3,
      brand: 'THE BEST BOOTS',
      title: 'MM6 Maison Margiela x Salomon',
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
      <Navbar activePage="men" />
      <Logo />
      <SubMenu favoritesCount={favoritesCount} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <HeroBanner src={heroImg} alt="Men's Collection Banner" />
      
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
