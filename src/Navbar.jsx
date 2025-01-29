import React, { useState } from 'react';

const Navbar = () => {
  const [loginHover, setLoginHover] = useState(false);
  const [linkHover, setLinkHover] = useState(null); // to track hover state of links

  // Function to handle hover state for login button
  const handleLoginHover = (isHovering) => {
    setLoginHover(isHovering);
  };

  // Function to handle hover state for nav links
  const handleLinkHover = (index, isHovering) => {
    setLinkHover(isHovering ? index : null);
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>PackMate</div>
      <div style={styles.navLinks}>
        {['How it works', 'Features', 'About Us', 'Contact Us'].map((text, index) => (
          <div
            key={index}
            style={linkHover === index ? styles.linkHovered : styles.link}
            onMouseEnter={() => handleLinkHover(index, true)}
            onMouseLeave={() => handleLinkHover(index, false)}
          >
            {text}
          </div>
        ))}
      </div>
      <button
        style={loginHover ? styles.loginButtonHovered : styles.loginButton}
        onMouseEnter={() => handleLoginHover(true)}
        onMouseLeave={() => handleLoginHover(false)}
      >
        Login
      </button>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 20px',
    marginTop: '20px',
    padding: '30px',
    borderRadius: '25px',
    border: '1px solid #ccc',
    backgroundColor: '#f8f8f8',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    marginLeft: '30px',
  },
  link: {
    fontSize: '20px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '5px 10px',
    transition: 'color 0.3s',
  },
  linkHovered: {
    fontSize: '20px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '5px 10px',
    color: 'blue', // Blue text on hover
    transition: 'color 0.3s',
  },
  loginButton: {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '15px 25px',
    cursor: 'pointer',
    borderRadius: '11px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  loginButtonHovered: {
    backgroundColor: 'white',
    color: 'blue',
    border: '1px solid blue',
    padding: '15px 25px',
    cursor: 'pointer',
    borderRadius: '11px',
    transition: 'background-color 0.3s, color 0.3s',
  },
};

export default Navbar;