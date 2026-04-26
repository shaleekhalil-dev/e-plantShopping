import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Aromatic Plants",
            plants: [
                { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/07/24/19/57/lavender-2535997_1280.jpg", description: "Calming scent, used in aromatherapy.", cost: "$15" },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=2070&auto=format&fit=crop", description: "Sweet fragrance, flourishes in sunlight.", cost: "$18" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating aroma, used in cooking.", cost: "$12" }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283030_1280.jpg", description: "Soothing gel, great for skin.", cost: "$10" },
                { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg", description: "Boosts immune system health.", cost: "$20" },
                { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", description: "Relieves digestive issues.", cost: "$8" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
    };

    return (
        <div>
            <nav className="navbar" style={{backgroundColor: '#4CAF50', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div className="nav-logo"><h1>Paradise Nursery</h1></div>
                <div className="nav-links">
                    <a href="#" onClick={(e) => {e.preventDefault(); setShowCart(false)}} style={{color: 'white', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold'}}>Plants</a>
                    <a href="#" onClick={(e) => {e.preventDefault(); setShowCart(true)}} style={{color: 'white', textDecoration: 'none', position: 'relative'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="35" width="35" fill="white"><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.1A8,8,0,0,0,24.8,32H8" fill="none" stroke="white" stroke-width="15"></path></svg>
                        <span style={{position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'red', borderRadius: '50%', padding: '2px 6px', fontSize: '12px'}}>{totalItems}</span>
                    </a>
                </div>
            </nav>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 style={{textAlign: 'center', margin: '30px 0'}}>{category.category}</h2>
                            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px'}}>
                                {category.plants.map((plant, pIndex) => (
                                    <div key={pIndex} className="plant-card" style={{border: '1px solid #ddd', padding: '15px', borderRadius: '10px', width: '280px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>
                                        <img src={plant.image} alt={plant.name} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px'}} />
                                        <h3 style={{margin: '10px 0'}}>{plant.name}</h3>
                                        <p style={{fontSize: '14px', color: '#666', height: '40px'}}>{plant.description}</p>
                                        <p style={{fontSize: '18px', fontWeight: 'bold'}}>{plant.cost}</p>
                                        <button 
                                            disabled={addedToCart[plant.name]} 
                                            onClick={() => handleAddToCart(plant)}
                                            style={{backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%'}}
                                        >
                                            {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;