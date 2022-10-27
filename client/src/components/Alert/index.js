import React from 'react';

export default function AlertBox({ status, value, onClose }) {
  return (
    <div className="alert alert-success alert-white rounded">
      <button type="button" className="close" data-dismiss="alert" aria-hidden="true" onClick={onClose}>×</button>
      <strong>{status}!</strong> {value}!
    </div>
  )
}