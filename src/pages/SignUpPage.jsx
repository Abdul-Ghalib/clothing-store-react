import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpPage.module.css';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import SubMenu from '../components/SubMenu';
import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { loginUser, registerUser } from '../services/api';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    console.log('Login request payload:', { email, password });
    try {
      const response = await loginUser(email, password);
      console.log('Login API response:', response);
      alert(response.message || 'Logged in successfully!');
      // Store user token/email if needed
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } catch (error) {
      console.error('Login API error:', error);
      alert(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setIsLoading(true);
    console.log('Register request payload:', { username, email, password });
    try {
      const response = await registerUser(username, email, password);
      console.log('Register API response:', response);
      alert(response.message || 'Registration successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      console.error('Register API error:', error);
      alert(error.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar activePage="signup" />
      <Logo />
      <SubMenu favoritesCount={favoritesCount} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <SignUpForm onLogin={handleLogin} onRegister={handleRegister} isLoading={isLoading} />
      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
