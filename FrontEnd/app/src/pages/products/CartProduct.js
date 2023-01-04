import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, clearCart, decreaseCart, removeFromCart, getTotals} from "../../redux/cart/cartSlice";

function CartProduct() {
    const cart = useSelector(state => {
        return state.cart.cartItems
    });
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getTotals());
    // }, [cart, dispatch]);
    const handleDecreaseCart = (product) =>{
        dispatch(decreaseCart(product))
    }
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    const handleRemove = (product)=>{
        dispatch(removeFromCart(product))
    }
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    return (
        <div className={'row'}>
            <div className="col-12" style={{textAlign: "center"}}>
                <table className="table table-striped">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">NameProduct</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
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
                                    <td>
                                        <div className='cartItem__incrDec' style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                                            <button onClick={()=>{
                                                handleDecreaseCart(item)
                                            }}>-</button>
                                            <div>{+item.cartQuantity}</div>
                                            <button onClick={() => handleAddToCart(item)}>+</button>
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
                {/*<div className="subtotal">*/}
                {/*    <span>Subtotal</span>*/}
                {/*    <span className="amount">${cart.cartTotalAmount}</span>*/}
                {/*</div>*/}
            </div>
            <button className="clear-btn" onClick={() => handleClearCart()}>
                Clear Cart
            </button>
        </div>
    );
}

export default CartProduct;