import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {getProducts} from "../../services/productService";

function ListProduct() {
    const dispatch = useDispatch();
    const products = useSelector(state => {
        console.log(state, 'productlist')
        return state.product.products;
    })
    console.log(products, 'productssssss')
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

                    <div className="carousel-caption">
                        {/*<h1 className="display-2">Example</h1>*/}
                        {/*<h3>Autolayout with Boostrap</h3>*/}
                        {/*<button type="button" className="btn btn-outline-light btn-lg">*/}
                        {/*    VIEW TUTORIALS*/}
                        {/*</button>*/}
                        {/*<button type="button" className="btn btn-primary btn-lg">Get Started</button>*/}
                    </div>
                </div>
            </div>
            <br/>
            <div className="container-fluid padding">
                <div className="row text-center padding">
                    {products.map((item, index) => {
                        console.log(item, 'itemBBBBB')
                        return (
                            <div className="col-xs-12 col-sm-6 col-md-4 imgCover mb-3">
                                <img src={item.url} style={{width: 300, height: 300, objectFit: "cover"}}></img>
                                <Link to={`detail/${item.product_id}`}><h3> {item.name_product}</h3></Link>
                                <p>Price: {item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Description: {item.description}</p>
                                <p>Category: {item.category_name}</p>

                            </div>

                        )
                    })
                    }
                </div>
            </div>
        </>
    );
}

export default ListProduct;
