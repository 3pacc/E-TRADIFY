import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
library.add(fas);

function SignUpForm() {

    const initialState = {
        name: "",
        email: "",
        password: ""
      };
    const [state, setState] = React.useState(initialState);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    if (!validateForm()) return;

    const { name, email, password } = state;
    alert(`You are signed up with name: ${name}, email: ${email}.`);

    // Reset state to initial after form submission
    setState(initialState);
  };
  const validateForm = () => {
    if (!state.email.includes('@')) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (state.password.length < 6) {
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
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
