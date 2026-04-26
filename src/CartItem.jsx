import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (cost) => parseFloat(cost.replace('$', ''));

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (parseCost(item.cost) * item.quantity), 0);
  };

  return (
    <div className="cart-wrapper glass-panel">
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--theme-dark)' }}>Your Garden Cart</h2>
      <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Total: ${calculateTotalAmount()}</h3>
      
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-img" src={item.image} alt={item.name} />
            <div className="cart-details">
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>{item.name}</h3>
              <p style={{ margin: '0 0 15px 0', color: '#555', fontWeight: 'bold' }}>Price: {item.cost}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button className="qty-btn" onClick={() => {
                  if(item.quantity > 1) dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
                  else dispatch(removeItem(item.name))
                }}>-</button>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.quantity}</span>
                <button className="qty-btn" onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
              </div>
              
              <p style={{ marginTop: '15px', fontWeight: 'bold' }}>Subtotal: ${parseCost(item.cost) * item.quantity}</p>
              <button className="del-btn" onClick={() => dispatch(removeItem(item.name))}>Remove Plant</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button className="glow-button" onClick={onContinueShopping} style={{ padding: '12px 30px', fontSize: '1rem' }}>
          Back to Garden
        </button>
        <button className="glow-button" onClick={() => alert('Checkout functionality is blooming soon!')} style={{ padding: '12px 30px', fontSize: '1rem', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;