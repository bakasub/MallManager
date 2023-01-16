import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteProducts, getProducts} from "../../services/productService";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";
import {clearCart} from "../../services/cartService";

function AdminPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => {
        return state.product.products;
    })
    const handleDeleteProduct = (productsId)=> {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteProducts(productsId))
            }
        })
    }
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
                        <th style={{fontSize:30}} scope="col">STT</th>
                        <th style={{fontSize:30}} scope="col">NameProduct</th>
                        <th style={{fontSize:30}} scope="col">Image</th>
                        <th style={{fontSize:30}} scope="col">Price</th>
                        <th style={{fontSize:30}} scope="col">Quantity</th>
                        <th style={{fontSize:30}} scope="col">Description</th>
                        <th style={{fontSize:30}} scope="col">Action</th>

                    </tr>

                    {products.map((item, index) => {
                            return (
                                <tr>
                                    <th style={{fontSize:30}} scope="row">{index + 1}</th>
                                    <td style={{fontSize:25}}>{item.name_product}</td>
                                    <td><img src={item.url} style={{width: 50, height: 50, objectFit: "cover"}}></img></td>
                                    <td style={{fontSize:25}}>$ {item.price}</td>
                                    <td style={{fontSize:25}}>{item.quantity}</td>
                                    <td style={{fontSize:25}}>{item.description}</td>
                                    <button className="btn btn-outline-dark" onClick={()=>{
                                        navigate(`/edit/${item.product_id}`)
                                    }}>Edit</button>
                                    <button className="m-3 btn btn-outline-dark" onClick={() => {
                                        dispatch(handleDeleteProduct(item.product_id))
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