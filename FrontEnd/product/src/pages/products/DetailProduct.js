import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import {deleteProducts, getProducts} from "../../services/productService";


function DetailProduct() {
    const dispatch = useDispatch();
    const products = useSelector(state => {
        console.log(state)
        return state.product.products;
    })
    const user = useSelector(state => {
        return state.user.currentUser
    })
    console.log(user.userName,'avvcacacac')
    const naviGate = useNavigate();
    const {product_id} = useParams();
    useEffect(() => {
        dispatch(getProducts());
    }, [])
    return (
        <>
            <div id="slides" className="carousel slide" data-ride="carousel">
                <ul className="carousel-indicators ">
                    <li data-target="#slides" data-slide-to="0" className="active"></li>
                    <li data-target="#slides" data-slide-to="1"></li>
                    <li data-target="#slides" data-slide-to="2"></li>
                </ul>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="">
                            <img style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                 src="https://images.fpt.shop/unsafe/fit-in/1190x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/12/26/638076908079823468_H6%20-%201190x300.png"></img>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://images.fpt.shop/unsafe/fit-in/1190x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/12/14/638066393334352162_F-H6_1190x300.png"></img>
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://images.fpt.shop/unsafe/fit-in/1190x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/12/14/638066534298706298_F-H6_1190x300.png"></img>
                    </div>
                </div>
            </div>
            <br/>
            <div className="container-fluid padding">
                <div className="row text-center padding">
                    {products.map((itemB, index) => {
                        if (user.userName !== undefined && itemB.product_id == product_id) return (
                            <div className="col-xs-12 col-sm-6 col-md-4 imgCover mb-3">
                                <img src={itemB.url} style={{width: 300, height: 300, objectFit: "cover"}}></img>
                                <h3>{itemB.product_name}</h3>
                                <p>Price: {itemB.price}</p>
                                <p>Quantity: {itemB.quantity}</p>
                                <Link to={'/home/cart'}>
                                    <button>Mua Hàng</button>
                                </Link>
                            </div>
                        )
                        else if (itemB.product_id == product_id)
                            return (
                                <div className="col-xs-12 col-sm-6 col-md-4 imgCover mb-3">
                                    <img src={itemB.url} style={{width: 300, height: 300, objectFit: "cover"}}></img>
                                    <h3>{itemB.product_name}</h3>
                                    <p>Price: {itemB.price}</p>
                                    <p>Quantity: {itemB.quantity}</p>
                                    <Link to={'/'}>
                                        <button>Mua Hàng</button>
                                    </Link>
                                </div>
                            )
                    })}
                </div>
            </div>
        </>
    );
}
export default DetailProduct;