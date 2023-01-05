import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTotals} from "../../redux/cart/cartSlice";
import {getCart, decreaseCart, increaseCart,removeFromCart,clearCart} from "../../services/cartService";

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
        <div className={'row'}>
            <div className="col-12" style={{textAlign: "center"}}>
                <table className="table table-striped">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">NameProduct</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">ProductId</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>

                    </tr>

                    {cart?.map((item, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index +1}</th>
                                    <td>{item.name_product}</td>
                                    <td><img src={item.url} style={{width: 50, height: 50, objectFit: "cover"}}></img>
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.product_id}</td>
                                    <td>
                                        <div className='cartItem__incrDec' style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                                            <button onClick={()=>{
                                                handleDecreaseCart(item)
                                            }}>-</button>
                                            <div>{+item.cartQuantity}</div>
                                            <button onClick={() => handleIncreaseCart(item)}>+</button>
                                        </div>
                                    </td>
                                    <td><div className="cart-product-total-price">
                                        ${item.price * item.cartQuantity}
                                    </div></td>
                                    <td><button className='cartItem__removeButton' onClick={()=>{
                                        handleRemove(item)
                                    }}>Remove</button></td>
                                </tr>

                            )
                    })
                    }</table>
                <h5 style={{marginLeft:"1100px"}}>
                    <span>Subtotal:</span>
                    <span className="amount">${cartTotalAmount}</span>
                </h5>
            </div>
            <button className="clear-btn" onClick={() => handleClearCart()}>
                Clear Cart
            </button>
        </div>
    );
}

export default CartProduct;