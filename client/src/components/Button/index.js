import React from 'react';

export default function Button({ type, onClick, children, className }) {
  return (
    <button type={type} className={`custom-button ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}