import React from 'react';

const Button = ({ children, onClick, type = 'button', disabled = false, variant = 'primary' }) => {
  const getButtonStyle = () => {
    const baseStyle = {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      opacity: disabled ? 0.6 : 1,
      pointerEvents: disabled ? 'none' : 'auto'
    };

    const variants = {
      primary: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      },
      secondary: {
        background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
        color: 'white'
      },
      outline: {
        background: 'transparent',
        color: '#667eea',
        border: '2px solid #667eea'
      }
    };

    return { ...baseStyle, ...variants[variant] };
  };

  return (
    <button
      type={type}
      style={getButtonStyle()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;