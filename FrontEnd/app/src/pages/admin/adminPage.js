import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteProducts, getProducts} from "../../services/productService";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../../components/Navbar";

function AdminPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => {
        return state.product.products;
    })
    console.log(products, 'productssssss')
    useEffect(() => {
        dispatch(getProducts());
    }, [])
    return (
        <div className={'row'}>
            <div className="col-12" style={{textAlign: "center"}}>
                    <Navbar></Navbar>
                <table className="table table-striped">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">NameProduct</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>

                    </tr>

                    {products.map((item, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name_product}</td>
                                    <td><img src={item.url} style={{width: 50, height: 50, objectFit: "cover"}}></img></td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.description}</td>
                                    <button onClick={()=>{
                                        navigate(`/edit/${item.product_id}`)
                                    }}>Edit</button>
                                    <button onClick={() => {
                                        dispatch(deleteProducts(item.product_id))
                                    }}>Delete
                                    </button>
                                </tr>
                            )
                    })
                    }</table>
            </div>
        </div>
    );
}

export default AdminPage;