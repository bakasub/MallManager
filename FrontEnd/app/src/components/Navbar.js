import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findProducts} from "../services/productService";
import {AmazonOutlined} from '@ant-design/icons/lib/icons'


function Navbar() {
    const dispatch = useDispatch();
    const userName = useSelector(state => {
        return state.user.currentUser;
    })
    const [find,setFind] = useState()
    if (userName.userName ==='admin'){
        return (
            <div className="row">
                <div className='col-12'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div>
                        <Link className="navbar-brand" to={'/admin'}><AmazonOutlined /></Link>
                        <p>âsdd</p>
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to={'/add-product'}>Add new product <span
                                        className="sr-only">(current)</span></Link>
                                </li>

                            </ul>
                            <input className=" mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search"
                                   onChange={(e)=>{
                                       setFind(e.target.value)
                                   }}
                            />
                            <button onClick={ (value)=>{
                                value= {name_product: find}
                                dispatch(findProducts(value))
                            }
                            } className=" my-2 my-sm-0" type="submit">Search
                            </button>
                            <div>
                                <div className="nav-item dropdown  mr-5">
                                    <a className="nav-link dropdown-toggle userColor" href="#" role="button" data-toggle="dropdown"
                                       aria-expanded="false">
                                        {userName.userName}
                                    </a>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to={'/admin'}>Admin</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link onClick={() => {
                                            localStorage.clear()
                                        }} className="dropdown-item" to={'/'}></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
    else {
        return (
            // <div className="row">
            //     <div className='col-12'>
            //         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            //             <Link className="navbar-brand" to={'/home'}>Logo</Link>
            //             <button className="navbar-toggler" type="button" data-toggle="collapse"
            //                     data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            //                     aria-expanded="false"
            //                     aria-label="Toggle navigation">
            //                 <span className="navbar-toggler-icon"></span>
            //             </button>
            //
            //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
            //                 <ul className="navbar-nav mr-auto">
            //                 </ul>
            //                 <input className=" mr-sm-2" type="search" placeholder="Search"
            //                        aria-label="Search"
            //                        onChange={(e)=>{
            //                            setFind(e.target.value)
            //                        }}
            //                 />
            //                 <button onClick={ (value)=>{
            //                     value= {name_product: find}
            //                     dispatch(findProducts(value))
            //                 }
            //                 } id="abc" className="btn btn-outline-success my-2 my-sm-0"  type="submit" style={{width:100, height:30}}>
            //                 </button>
            //                 <div>
            //                     <div className="nav-item dropdown  mr-5">
            //                         <a className="nav-link dropdown-toggle userColor" href="#" role="button" data-toggle="dropdown"
            //                            aria-expanded="false">
            //                             {userName.userName}
            //                         </a>
            //                         <div className="dropdown-menu">
            //                             <Link className="dropdown-item" to={'/Home/cart'}> Cart</Link>
            //                             <div className="dropdown-divider"></div>
            //                             <Link onClick={() => {
            //                                 localStorage.clear()
            //                             }} className="dropdown-item" to={'/'}>Logout</Link>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //         </nav>
            //     </div>
            // </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm ">
                <div className="container">
                    <Link className="navbar-brand" to={'/admin'}><AmazonOutlined />Shopool</Link>
                    {/*<a className="navbar-brand fw-bold fs4" href="#">SHOP</a>*/}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Addroduct</a>
                            </li>

                        </ul>

                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-dark" type="submit">Search</button>
                        </form>
                        <div className="buttons">
                            <button href="" type="submit" className="ml-3 btn btn-outline-dark">
                                <i class="fa fa-sign-out me-1">Logout</i>
                            </button>
                            <button href="" type="submit" className="ml-3 btn btn-outline-dark">
                                <i class="fa fa-shopping-cart" aria-hidden="true">Cart(0)</i>
                            </button>


                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Navbar;


