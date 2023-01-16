import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTotals} from "../../redux/cart/cartSlice";
import {getCart, decreaseCart, increaseCart,removeFromCart,clearCart} from "../../services/cartService";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {Field} from "formik";

function CartProduct() {
    const cart = useSelector(state => {
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
        setSubmitting(true)
    }
    const [submitting, setSubmitting] = useState(true)
    const handleClearCart = (product)=> {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(clearCart({...product, user_id: user.user_id}))
            }
        })
    }
    const {cartTotalAmount} = useSelector( state =>{
        return state.cart
    });
    const handleRemove = (product)=> {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(removeFromCart({...product, user_id: user.user_id}))
            }
        })
    }
    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty</p>
                    <div className="start-shopping">
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
                                            <h5>{cartItem.name_product}</h5>
                                            <button onClick={() => handleRemove(cartItem)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <h5 className="cart-product-price">${cartItem.price}</h5>
                                    <h5 className="cart-product-quantity">
                                        <button onClick={() => handleDecreaseCart(cartItem)}>
                                            -
                                        </button>
                                        <div className="count">{cartItem.cartQuantity}</div>
                                        <button onClick={() =>{
                                            console.log(localStorage.quantity,'dacacacac')
                                            if (cartItem.cartQuantity == localStorage.quantity)
                                                setSubmitting(false)
                                            handleIncreaseCart(cartItem)
                                        }
                                        }>+</button>
                                    </h5>
                                    <h5 className="cart-product-total-price">
                                        ${cartItem.price * cartItem.cartQuantity}
                                    </h5>
                                </div>
                            ))}
                    </div>
                    <div className="cart-summary">
                        <button className="clear-btn" onClick={() => handleClearCart()}>
                            Clear Cart
                        </button>
                        <h5 className="cart-checkout">
                            <h3 className="subtotal">
                                <span>Subtotal</span>
                                <span className="amount">${cartTotalAmount}</span>
                            </h3>
                            <h5>Taxes and shipping calculated at checkout</h5>

                            <Link to={'/home/checkout'}><button>Check out</button></Link>
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
                        </h5>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartProduct;