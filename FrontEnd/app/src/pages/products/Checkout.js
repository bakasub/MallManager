import React, {useEffect} from 'react';
import {Field, Form, Formik} from "formik";
import {addProductToCart, getCart} from "../../services/cartService";
import {getTotals} from "../../redux/cart/cartSlice";
import {addCartToOrder, getOrder} from "../../services/orderService";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Checkout() {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user.currentUser
    });
    const cart = useSelector(state => {
        return state.cart.cartItems
    })
    const order = useSelector(state => {
        console.log(state.orders)
        return state.order
    })
    useEffect(()=>{
        dispatch(getCart(user.user_id))
    },[]);
    useEffect(()=>{
        dispatch(getOrder())
    },[]);
    const handleAddOrder =async (order) => {
        await dispatch(addCartToOrder({...order, user_id: user.user_id}));
    }
    const {cartTotalAmount} = useSelector( state =>{
        return state.cart
    });
    return (
       <>
           <div className="container-fluid pt-5">
               <div className="row px-xl-5">
                   <div className="col-lg-8">
                       <div className="mb-4">
                           <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
                           <div className="row">
                               <div className="col-md-6 form-group">
                                   <label>First Name</label>
                                   <input className="form-control" type="text" placeholder=""/>
                               </div>
                               <div className="col-md-6 form-group">
                                   <label>Last Name</label>
                                   <input className="form-control" type="text" placeholder=""/>
                               </div>
                               <div className="col-md-6 form-group">
                                   <label>E-mail</label>
                                   <input className="form-control" type="text" placeholder=""/>
                               </div>
                               <div className="col-md-6 form-group">
                                   <label>Mobile No</label>
                                   <input className="form-control" type="text" placeholder=""/>
                               </div>
                               <div className="col-md-6 form-group">
                                   <label>Address Line 1</label>
                                   <input className="form-control" type="text" placeholder=""/>
                               </div>
                               <div className="col-md-6 form-group">
                                   <label>Address Line 2</label>
                                   <input className="form-control" type="text" placeholder=""/>
                               </div>
                               <div className="col-md-6 form-group">
                                   <label>City</label>
                                   <input className="form-control" type="text" placeholder=""/>
                               </div>
                               <div className="col-md-6 form-group">
                                   <label>State</label>
                                   <input className="form-control" type="text" placeholder=""/>
                               </div>
                               <div className="col-md-12 form-group">
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="col-lg-4">
                       <div className="card border-secondary mb-5">
                           <div className="card-header bg-secondary border-0">
                               <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                           </div>
                           <div className="card-body">
                               <h5 className="font-weight-medium mb-3">Products</h5>
                               {cart.map((item)=>(
                                   <>
                                       <div className="d-flex justify-content-between">
                                           <p>Colorful Stylish Shirt 1</p>
                                           <p>${item.price * item.cartQuantity}</p>
                                       </div>
                                   </>
                               ))}
                               <div className="d-flex justify-content-between mb-3 pt-1">
                                   <h6 className="font-weight-medium">Subtotal</h6>
                                   <h6 className="font-weight-medium">${cartTotalAmount}</h6>
                               </div>
                           </div>
                       </div>
                       <div className="card border-secondary mb-5">
                           <div className="card-header bg-secondary border-0">
                               <h4 className="font-weight-semi-bold m-0">Payment</h4>
                           </div>
                           <div className="card-body">
                               <div className="form-group">
                                   <div className="custom-control custom-radio">
                                       <input type="radio" className="custom-control-input" name="payment" id="paypal"/>
                                           <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                                   </div>
                               </div>
                               <div className="form-group">
                                   <div className="custom-control custom-radio">
                                       <input type="radio" className="custom-control-input" name="payment"
                                              id="directcheck"/>
                                           <label className="custom-control-label" htmlFor="directcheck">Direct
                                               Check</label>
                                   </div>
                               </div>
                               <div className="">
                                   <div className="custom-control custom-radio">
                                       <input type="radio" className="custom-control-input" name="payment"
                                              id="banktransfer"/>
                                           <label className="custom-control-label" htmlFor="banktransfer">Bank
                                               Transfer</label>
                                   </div>
                               </div>
                           </div>
                           <div className="card-footer border-secondary bg-transparent">
                               <Link to={'/home/list-order'}><button onClick={() => handleAddOrder()} className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">Place
                                   Order
                               </button></Link>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </>
    );
}

export default Checkout;