import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {findProducts, getProducts, searchProducts} from "../../services/productService";
import {Field} from "formik";


function ListProduct() {
    const dispatch = useDispatch();
    const products = useSelector(state => {
        return state.product.products;
    })
    useEffect(() => {
        dispatch(getProducts());
    }, []);
    const [category_id, setCategory_id] = useState(0);
    return (
        <>
            <div>
                <div className="container my-1 py-1">
                    <div className="row">
                        <div className="col-12">
                            <hr/>
                            <h4 className="display-7 fw-bolder text-center">All Product</h4>
                            <hr/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className=" buttons d-flex justify-content-center mb-1 p-1">
                            <button className="m-3 btn btn-outline-dark me-2" onClick={() => {
                                setCategory_id(0)
                            }}>All
                            </button>
                            <button className="m-3 btn btn-outline-dark me-2" onClick={() => {
                                setCategory_id(1)
                            }}>IPhone
                            </button>
                            <button className="m-3 btn btn-outline-dark me-2" onClick={() => {
                                setCategory_id(2)
                            }}>SamSung
                            </button>
                            <button className="m-3 btn btn-outline-dark me-2"
                                    onClick={() => {
                                        setCategory_id(3)
                                    }}>Nokia
                            </button>
                        </div>
                    </div>
                    <h6 style={{textAlign:"center"}}> Lọc theo giá tiền:
                        <select name="price" onChange={(event) => {
                            let value= {price: +event.target.value}
                            dispatch(searchProducts(value))
                        }}>

                            <option value='0' name="price">Tất cả</option>
                            <option value='1' name="price">Dưới 10 triệu</option>
                            <option value='2' name="price">Từ 10 triệu đến 20 triệu</option>
                            <option value='3' name="price">Trên 20 triệu</option>
                        </select>
                    </h6>
                </div>
            </div>
            <hr/>
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
                    </div>
                </div>
            </div>
            <br/>
            <div className="container-fluid padding">
                <div className="row text-center padding">
                    {products.map((item, index) => {
                        if (item.category_id == category_id  || category_id == 0)
                            return (
                                <div className="col-xs-12 col-sm-6 col-md-2 imgCover mb-4"  style={{
                                        boxSizing: "border-box",
                                        borderRadius: "5px",
                                        paddingTop: "10px",
                                      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px (0,0,0,0.22)",
                                       background: "#f2f2f2"}}>
                                    <div className="card h-100 text-center p-4 "  >
                                        <img src={item.url} className="card-img-top" alt="ahahahaha" height="250px" width="10px"/>
                                        <Link to={`detail/${item.product_id}`}><h3> {item.name_product}</h3></Link>
                                        <div className="card-body">
                                            {/*<h5 className="card-title mb-0 fw-bold">{item.description}</h5>*/}
                                        </div>
                                        <p className="card-text">${item.price}</p>

                                    </div>
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
