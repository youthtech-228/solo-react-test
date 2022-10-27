import React from 'react';

export default function Input({ type = 'text', name, value, placeholder, isDisabled = false, onChange }) {
  return (
    <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} disabled={isDisabled} className='custom-input' />
  )
}