import React, { useState, useEffect } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

library.add(fab);
library.add(fas);

function SignInForm({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('/api/auth/signin', formData);
        console.log(response.data);
        setIsLoggedIn(true);
        setFormData({
          email: '',
          password: '',
        });
        localStorage.setItem('isLoggedIn', true);
        const token = response.data.token;
        localStorage.setItem('token', token);
        alert("Authentification successful!.");
        return token;
      } catch (error) {
        console.error('Error:', error);
        window.Error(error);
      }
    }
  };

  const validateForm = () => {
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 6) {
      alert('Password should be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const checkAuthentication = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token'); // Remove the token from localStorage or sessionStorage
    setIsLoggedIn(false);
  };
  
  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={['fab', 'google-plus-g']} />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;