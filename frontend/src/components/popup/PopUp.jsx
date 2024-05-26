import React, { useState, useEffect } from 'react';

function AddToCartButton() {
  const [showCartMessage, setShowCartMessage] = useState(false);

  const handleAddToCart = () => {
    setShowCartMessage(true);
    // Simulate some asynchronous operation (like adding to cart)
    setTimeout(() => setShowCartMessage(false), 5000); // Hide after 5 seconds
  };

  useEffect(() => {
    if (showCartMessage) {
      const timer = setTimeout(() => setShowCartMessage(false), 5000);
      return () => clearTimeout(timer); // Cleanup function for effect
    }
  }, [showCartMessage]); // Run effect only when showCartMessage changes

  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {showCartMessage && (
        <div className="cart-message">
          Added to Cart!
        </div>
      )}
    </div>
  );
}

export default AddToCartButton;