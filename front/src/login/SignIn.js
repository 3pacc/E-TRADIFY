import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { fab } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
library.add(fab);
library.add(fas);

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('/api/auth/signin', formData);
        console.log(response.data);
        setIsLoggedIn(true);
        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        console.error('Error:', error);
        // Handle error, e.g., display an error message to the user
      }
    }
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
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
