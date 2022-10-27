import React from 'react';

export default function Select({ options = [], value, onChange }) {
  return (
    <select className='custom-select' value={value} onChange={onChange}>
      <option value='' disabled>Select Option</option>
      {options?.map((option) => 
        <option value={option.value} key={option.value}>{option.label}</option>
      )}
    </select>
  )
}