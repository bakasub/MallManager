import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findProducts, searchProducts} from "../services/productService";
import {AmazonOutlined} from '@ant-design/icons/lib/icons'
import {getCart} from "../services/cartService";


function Navbar() {
    const dispatch = useDispatch();
    const userName = useSelector(state => {
        return state.user.currentUser;
    });
    const cartTotalQuantity = useSelector( state =>{
        console.log(state,"stateee")
        return state.cart
    });
    const handleGetCart = () => {
        dispatch(getCart(userName.user_id));
    }
    const [find,setFind] = useState()
    if (userName.userName ==='admin'){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm ">
                <div className="container-fluid">
                    <h2>Hello Boss</h2>
                    <div className="container-fluid">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-4">
                            <h3 className="navbar-brand fw-bold fs4" href="#">  {<Link className="navbar-brand" to={'/admin'}><AmazonOutlined />AMAZING SHOP</Link>}</h3>
                        </ul>
                        <input style={{width:500}} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                               onChange={(e)=>{
                                   setFind(e.target.value)
                               }}
                        />
                        <button onClick={ (value)=>{
                            value= {name_product: find}
                            dispatch(findProducts(value))
                        }
                        } className="btn btn-outline-dark" type="submit"><i className="fa fa-search"
                                                                            aria-hidden="true">Search</i>
                        </button>
                        <Link className="m-4 navbar-brand fw-bold fs4 " to={"/admin"}>{userName.userName}</Link>
                        <button href="" type="submit" className="ml-3 btn btn-outline-dark">
                            <Link className="dropdown-item" to={'/add-product'} onClick={()=>{
                                handleGetCart()
                            }}> <i  class="fa fa-plus" aria-hidden="true">Add Product</i></Link>
                        </button>
                        <div className="buttons">
                            <button href="" type="submit" className="ml-3 btn btn-outline-dark">
                                <Link onClick={() => {localStorage.clear()
                                }} className="dropdown-item" to={'/'}><i className="fa fa-sign-out me-1">Logout</i></Link>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
    else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm ">
                <div className="container-fluid">
                    <h1>Hello Friend</h1>

                    <div className="container-fluid">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-4">
                            <h3 className="navbar-brand fw-bold fs4" href="#">  {<Link className="navbar-brand" to={'/home'}><AmazonOutlined />AMAZING SHOP</Link>}</h3>

                        </ul>

                        <input style={{width:500}} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                               onChange={(e)=>{
                                                       setFind(e.target.value)
                                                   }}
                                            />
                                            <button onClick={ (value)=>{
                                                value= {name_product: find}
                                                dispatch(findProducts(value))
                                            }
                                            } className="btn btn-outline-dark" type="submit"><i className="fa fa-search"
                                                                                                aria-hidden="true">Search</i>
                                            </button>

                        <Link className="m-4 navbar-brand fw-bold fs4 " to={"/home"}>{userName.userName}</Link>
                        <div className="buttons">
                            <button href="" type="submit" className="ml-3 btn btn-outline-dark">
                                <Link onClick={() => {localStorage.clear()
                                }} className="dropdown-item" to={'/'}><i className="fa fa-sign-out me-1">Logout</i></Link>

                            </button>
                            <button href="" type="submit" className="ml-3 btn btn-outline-dark">
                                <Link className="dropdown-item" to={`/home/cart/${userName.user_id}`} onClick={()=>{
                                    handleGetCart()
                                }}> <i className="fa fa-shopping-cart" aria-hidden="true">Cart
                                    ({cartTotalQuantity.cartTotalQuantity})</i></Link>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

        );
    }
}
export default Navbar;
