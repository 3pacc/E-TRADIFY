import React, { useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

library.add(fab);
library.add(fas);

function SignUpForm({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    token:""  
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
        const response = await axios.post('/api/auth/signup', formData);
        console.log(response.data);
        alert("Registration successful! Please sign in.");
      } catch (error) {
        console.error('Error:', error);
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

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;