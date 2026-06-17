import React, { useState } from 'react';
import styles from './SignUpForm.module.css';

export default function SignUpForm({ onLogin, onRegister, isLoading = false }) {
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});

  // Register form state
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    
    const emailErr = validateEmail(loginEmail);
    if (emailErr) errors.email = emailErr;

    if (!loginPassword) {
      errors.password = 'Password is required';
    } else if (loginPassword.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setLoginErrors(errors);

    if (Object.keys(errors).length === 0 && onLogin) {
      onLogin(loginEmail, loginPassword);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!registerUsername.trim()) {
      errors.username = 'Username is required';
    } else if (registerUsername.length < 5 || registerUsername.length > 10) {
      errors.username = 'Username must be between 5 and 10 characters';
    }

    const emailErr = validateEmail(registerEmail);
    if (emailErr) errors.email = emailErr;

    if (!registerPassword) {
      errors.password = 'Password is required';
    } else if (registerPassword.length < 6 || registerPassword.length > 15) {
      errors.password = 'Password must be between 6 and 15 characters';
    }

    setRegisterErrors(errors);

    if (Object.keys(errors).length === 0 && onRegister) {
      onRegister(registerUsername, registerEmail, registerPassword);
    }
  };

  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.suDiv}>
        {/* Login Form Column */}
        <div className={styles.suDiv2}>
          <div style={{ marginLeft: '25px', marginRight: '25px' }}>
            <h2 className={styles.hd}> Login </h2>
            <p className={styles.pgr}>
              if you already have an account, login with your e-mail address and password
            </p>

            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <p className={styles.pgr2}> EMAIL: </p>
                <input
                  className={styles.pcl2}
                  type="text"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  disabled={isLoading}
                />
                {loginErrors.email && <p className={styles.errorText}>{loginErrors.email}</p>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p className={styles.pgr2}> PASSWORD: </p>
                <div className={styles.passwordInputContainer}>
                  <input
                    className={styles.pcl2}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {loginErrors.password && <p className={styles.errorText}>{loginErrors.password}</p>}
              </div>

              <button type="submit" className={styles.btn} disabled={isLoading}>
                {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>
            
            <button type="button" className={styles.btn2} disabled={isLoading}>
              FORGOT PASSWORD
            </button>
          </div>
        </div>

        {/* Register Form Column */}
        <div className={styles.suDiv3}>
          <div style={{ marginLeft: '25px', marginRight: '25px' }}>
            <h2 className={styles.hd}> Create account </h2>
            <p className={styles.pgr}>
              If this is your first time, enter your details and click on "Register". It
              will help make your shopping experience even better.
            </p>

            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <p className={styles.pgr2}> USERNAME: </p>
                <input
                  className={styles.pcl2}
                  type="text"
                  placeholder="Username (5-10 chars)"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  disabled={isLoading}
                />
                {registerErrors.username && <p className={styles.errorText}>{registerErrors.username}</p>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p className={styles.pgr2}> EMAIL: </p>
                <input
                  className={styles.pcl2}
                  type="text"
                  placeholder="Email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  disabled={isLoading}
                />
                {registerErrors.email && <p className={styles.errorText}>{registerErrors.email}</p>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p className={styles.pgr2}> PASSWORD: </p>
                <div className={styles.passwordInputContainer}>
                  <input
                    className={styles.pcl2}
                    type={showRegisterPassword ? 'text' : 'password'}
                    placeholder="Password (6-15 chars)"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    disabled={isLoading}
                  >
                    {showRegisterPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {registerErrors.password && <p className={styles.errorText}>{registerErrors.password}</p>}
              </div>

              <button type="submit" className={styles.btn} disabled={isLoading}>
                {isLoading ? 'REGISTERING...' : 'REGISTER'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className={styles.line2} />
    </div>
  );
}
