import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakeDB';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);


    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])


    useEffect(()=>{
        const storedCart = getShoppingCart();
        console.log(storedCart);
    }, [])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <dir className="cart-info">
                    <Cart cart={cart}></Cart>
                </dir>
            </div>
        </div>
    );
};

export default Shop;