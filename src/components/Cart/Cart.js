import React from 'react';


const Cart = (props) => {
    const cart = props.cart
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0)
    let total = 0;
    cart.forEach(pd => {
        total = total + pd.price * pd.quantity;
    });
    let shipping = 0;
    if (total > 50) {
        shipping = 0
    }
    else if (total > 30) {
        shipping = 5
    }
    else if (total > 0) {
        shipping = 12
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    const formatNumber = num => {
        const precession = num.toFixed(2);
        return Number(precession)
    }
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Item order: {cart.length}</p>
            <p>Product total:{formatNumber(total)} </p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + vat = {tax}</small></p>
            <p>Total Price = {grandTotal} $</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;