import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import {deleteProducts, getProducts} from "../../services/productService";
import {addProductToCart, getCart} from "../../services/cartService";
import {getTotals} from "../../redux/cart/cartSlice";


function DetailProduct() {
    const dispatch = useDispatch();
    const products = useSelector(state => {
        console.log(state)
        return state.product.products;
    })
    const user = useSelector(state => {
        return state.user.currentUser
    })
    const handleAddToCart =async (product) => {

        await dispatch(addProductToCart({...product, user_id: user.user_id}));
      await  dispatch(getCart(user.user_id))
        await dispatch(getTotals());
    }
    const {product_id} = useParams();
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
                            <>
                                <div className="col-md-6">
                                    <img src={itemB.url} style={{width: 400, height: 500, objectFit: "cover"}}/>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="text-uppercase text-black-50">
                                        {itemB.category_name}
                                    </h5>
                                    <h1 className="display-5">{itemB.name_product}</h1>
                                    <h3 className="display-6 fw-bold my-4">
                                        ${itemB.price}
                                    </h3>
                                    <p className="lead">{itemB.description}</p>
                                    <Link to={`/home`}>
                                        <button onClick={() => handleAddToCart(itemB)}  className="btn btn-outline-dark">Buy now</button>
                                    </Link>
                                </div></>
                            // <div className="col-xs-12 col-sm-6 col-md-4 imgCover mb-3">
                            //     <img src={itemB.url} style={{width: 300, height: 300, objectFit: "cover"}}></img>
                            //     <h3>{itemB.product_name}</h3>
                            //     <p>Price: {itemB.price}</p>
                            //     <p>Quantity: {itemB.quantity}</p>
                            //     <Link to={`/home`}>
                            //         <button onClick={() => handleAddToCart(itemB)} className="btn btn-outline-dark">Buy Now</button>
                            //     </Link>
                            // </div>
                        )
                        else if (itemB.product_id == product_id)
                            return (
                                <>
                                    <div className="col-md-6">
                                        <img src={itemB.url} style={{width: 400, height: 500, objectFit: "cover"}}/>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="text-uppercase text-black-50">
                                            {itemB.category_name}
                                        </h5>
                                        <h1 className="display-5">{itemB.name_product}</h1>
                                        <h3 className="display-6 fw-bold my-4">
                                            ${itemB.price}
                                        </h3>
                                        <p className="lead">{itemB.description}</p>
                                        <Link to={`/`}>
                                            <button onClick={() => handleAddToCart(itemB)}  className="btn btn-outline-dark">Buy now</button>
                                        </Link>
                                    </div></>
                            )
                    })}
                </div>
            </div>
        </>
    );
}

export default DetailProduct;