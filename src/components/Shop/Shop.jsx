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


    useEffect(() => {
        const storedCart = getShoppingCart();
        // console.log(storedCart);
        // console.log(products);
        const savedCart = [];

        // Step 1: Get the ID of the added product--
        for (const id in storedCart) {
            // Step 2: Get the products state by using ID--
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                // Step3: Get quantity of the product to add--
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // Step 4: Add the added product to saved Cart--
                savedCart.push(addedProduct);
            }
            // console.log("addedProduct", addedProduct);
        }
        // Step-5: Set the cart--
        setCart(savedCart);
    }, [products])

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