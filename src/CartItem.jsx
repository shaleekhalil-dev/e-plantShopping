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

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div className="cart-container" style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <h2 style={{textAlign: 'center', color: '#333'}}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name} style={{display: 'flex', borderBottom: '1px solid #eee', padding: '15px 0', alignItems: 'center'}}>
            <img src={item.image} alt={item.name} style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px'}} />
            <div style={{flex: 1, marginLeft: '20px'}}>
              <div style={{fontSize: '18px', fontWeight: 'bold'}}>{item.name}</div>
              <div style={{color: '#4CAF50'}}>{item.cost}</div>
              <div style={{margin: '10px 0'}}>
                <button onClick={() => handleDecrement(item)} style={{padding: '5px 10px'}}>-</button>
                <span style={{margin: '0 15px'}}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} style={{padding: '5px 10px'}}>+</button>
              </div>
              <div style={{fontWeight: 'bold'}}>Total: ${parseCost(item.cost) * item.quantity}</div>
              <button onClick={() => dispatch(removeItem(item.name))} style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer', marginTop: '10px'}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center'}}>
        <button onClick={onContinueShopping} style={{padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px'}}>Continue Shopping</button>
        <button onClick={() => alert('Checkout Coming Soon')} style={{padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px'}}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;