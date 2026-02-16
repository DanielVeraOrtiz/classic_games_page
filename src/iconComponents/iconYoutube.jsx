import React from 'react';

function IconYoutube() {
  console.log('The application logo is rendered again.');
  return <img className="logo-page" />;
}

// Curiosamente si se re renderiza aunque Navbar ocupe el render anterior, entonces navbar no renderiza lo que lleva
// pero si re renderiza a su hijos.
export default React.memo(IconYoutube);
