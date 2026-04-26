import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const [notification, setNotification] = useState('');
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
        setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
        setNotification(`✨ Beautiful choice! "${plant.name}" added to your garden.`);
        setTimeout(() => setNotification(''), 3000);
    };

    return (
        <div>
            {notification && (
                <div className="toast-notification glass-panel">
                    {notification}
                </div>
            )}

            <nav className="navbar glass-panel">
                <h1 className="nav-title">Paradise Nursery</h1>
                <div className="nav-links">
                    <a className="nav-link" onClick={() => setShowCart(false)}>Garden</a>
                    <a className="nav-link" onClick={() => setShowCart(true)} style={{ position: 'relative' }}>
                        Cart
                        {totalItems > 0 && (
                            <span style={{ position: 'absolute', top: '-10px', right: '-20px', background: '#ff4757', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem' }}>
                                {totalItems}
                            </span>
                        )}
                    </a>
                </div>
            </nav>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 className="category-title">{category.category}</h2>
                            <div className="cards-container">
                                {category.plants.map((plant, pIndex) => (
                                    <div key={pIndex} className="plant-card glass-panel">
                                        <img src={plant.image} alt={plant.name} />
                                        <h3 className="plant-title">{plant.name}</h3>
                                        <p className="plant-desc">{plant.description}</p>
                                        <p className="plant-price">{plant.cost}</p>
                                        <button 
                                            className="add-btn"
                                            disabled={addedToCart[plant.name]} 
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {addedToCart[plant.name] ? "In Garden" : "Add to Cart"}
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