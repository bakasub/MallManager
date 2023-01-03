import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteProducts, getProducts} from "../../services/productService";
import Navbar from "../../components/Navbar";

function CartProduct() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => {
        return state.product.products;
    })
    console.log(products,'ab')
    const id = useParams();
    // console.log('id', id.product_id);
    useEffect(() => {
        dispatch(getProducts());
    }, [])
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
                        <th scope="col">Action</th>

                    </tr>

                    {products.map((item, index) => {
                        if (item.product_id == +id.product_id)
                            return (
                                <tr>
                                    <th scope="row">{index}</th>
                                    <td>{item.name_product}</td>
                                    <td><img src={item.url} style={{width: 50, height: 50, objectFit: "cover"}}></img>
                                    </td>
                                    <td>{item.price}</td>
                                    <td><input type={"number"}></input></td>
                                    <button onClick={() => {
                                        navigate(`/edit/${item.product_id}`)
                                    }}>Edit
                                    </button>
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

export default CartProduct;