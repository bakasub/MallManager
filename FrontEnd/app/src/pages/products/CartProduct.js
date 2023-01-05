import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTotals} from "../../redux/cart/cartSlice";
import {getCart, decreaseCart, increaseCart,removeFromCart,clearCart} from "../../services/cartService";
import {Link} from "react-router-dom";

function CartProduct() {
    const cart = useSelector(state => {
        console.log(state.cart.cartItems)
        return state.cart.cartItems
    });
    const user = useSelector(state => {
        return state.user.currentUser
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);
    useEffect(()=>{
        dispatch(getCart(user.user_id))
    },[]);
    const handleDecreaseCart = (product) =>{
        dispatch(decreaseCart({...product, user_id: user.user_id}))
    }
    const handleIncreaseCart = (product) =>{
        dispatch(increaseCart({...product, user_id: user.user_id}))
    }
    const handleRemove = (product)=>{
        dispatch(removeFromCart({...product, user_id: user.user_id}))
    }
    const handleClearCart = (product) => {
        dispatch(clearCart({...product, user_id: user.user_id}));
    };
    const {cartTotalAmount} = useSelector( state =>{
        return state.cart
    })
    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty</p>
                    <div className="start-shopping">
                        <Link to="/">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-arrow-left"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                />
                            </svg>
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="titles">
                        <h3 className="product-title">Product</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="quantity">Quantity</h3>
                        <h3 className="total">Total</h3>
                    </div>
                    <div className="cart-items">
                        {cart &&
                            cart.map((cartItem) => (
                                <div className="cart-item" key={cartItem.id}>
                                    <div className="cart-product">
                                        <img src={cartItem.url} alt={cartItem.name_product} />
                                        <div>
                                            <h3>{cartItem.name_product}</h3>
                                            <p>{cartItem.description}</p>
                                            <button onClick={() => handleRemove(cartItem)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-product-price">${cartItem.price}</div>
                                    <div className="cart-product-quantity">
                                        <button onClick={() => handleDecreaseCart(cartItem)}>
                                            -
                                        </button>
                                        <div className="count">{cartItem.cartQuantity}</div>
                                        <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                                    </div>
                                    <div className="cart-product-total-price">
                                        ${cartItem.price * cartItem.cartQuantity}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="cart-summary">
                        <button className="clear-btn" onClick={() => handleClearCart()}>
                            Clear Cart
                        </button>
                        <div className="cart-checkout">
                            <div className="subtotal">
                                <span>Subtotal</span>
                                <span className="amount">${cartTotalAmount}</span>
                            </div>
                            <p>Taxes and shipping calculated at checkout</p>
                            <Link to={'/home'}><button>Check out</button></Link>
                            <div className="continue-shopping">
                                <Link to="/home">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="bi bi-arrow-left"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                        />
                                    </svg>
                                    <span>Continue Shopping</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartProduct;