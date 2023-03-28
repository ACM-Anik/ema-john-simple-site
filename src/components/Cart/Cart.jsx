import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {
    // const cart = props.cart; //option1
    // const {cart} = props; //option2
    console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
    for(const product of cart){
        totalPrice = totalPrice + product.price;
        totalShipping = product.shipping;
    }
    const tax = totalPrice * 7 / 100;

    const grandTotal = totalPrice + totalShipping + tax;


    return (
        <div>
            <h4>Order Summery</h4>
            <h5>Selected Items: {cart.length}</h5>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping: ${totalShipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <p>Grand Price: {grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;