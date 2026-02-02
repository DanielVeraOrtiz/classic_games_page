import './spinner.css';
import React from 'react';

function Spinner({ size }) {
  return (
    <div
      className="spinner-container"
      style={{ width: size, height: size }}
      aria-hidden="true"
      focusable="false"
    ></div>
  );
}

export default React.memo(Spinner);
