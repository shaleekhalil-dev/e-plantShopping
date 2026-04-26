import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="content-wrapper">
          <div className="hero-content glass-panel">
            <h1 className="hero-title">Paradise Nursery</h1>
            <div style={{ height: '3px', background: 'white', width: '60%', margin: '0 auto 20px', borderRadius: '5px' }}></div>
            <p className="hero-subtitle">Breathe Life Into Your Space. Discover our exotic collection of nature's finest.</p>
            <button className="glow-button" onClick={() => setShowProductList(true)}>
              Enter The Garden
            </button>
          </div>
          <AboutUs />
        </div>
      </div>
      
      {showProductList && (
        <div className="product-list-container">
          <ProductList />
        </div>
      )}
    </div>
  );
}

export default App;