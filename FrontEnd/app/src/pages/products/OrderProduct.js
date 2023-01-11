import React from 'react';
import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar";

function OrderProduct() {
    return (
            <div className={'row'}>
                <Navbar></Navbar>
                <table className="table table-striped">
                    <tr>
                        <th style={{fontSize:30}} scope="col">STT</th>
                        <th style={{fontSize:30}} scope="col">OrderId</th>
                        <th style={{fontSize:30}} scope="col">User_id</th>
                        <th style={{fontSize:30}} scope="col">UserName</th>
                        <th style={{fontSize:30}} scope="col">Status</th>
                        {/*<th style={{fontSize:30}} scope="col">Price</th>*/}
                        <th style={{fontSize:30}} scope="col">Action</th>

                    </tr>

                    {/*{products.map((item, index) => {*/}
                    {/*    return (*/}
                            <tr>
                                {/*<th style={{fontSize:30}} scope="row">{index + 1}</th>*/}
                                <td style={{fontSize:25}}>1</td>
                                <td style={{fontSize:25}}>1</td>
                                <td style={{fontSize:25}}>1</td>
                                <td style={{fontSize:25}}>Vuluu</td>
                                <td style={{fontSize:25}}>
                                <select defaultValue={1}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select></td>
                                {/*<td style={{fontSize:25}}>$1000</td>*/}
                                <td style={{fontSize:25}}>
                                <button>Accept</button>
                                <button>Cancel</button>
                                </td>
                    {/*            <button className="btn btn-outline-dark" onClick={()=>{*/}
                    {/*                navigate(`/edit/${item.product_id}`)*/}
                    {/*            }}>Edit</button>*/}
                    {/*            <button className="m-3 btn btn-outline-dark" onClick={() => {*/}
                    {/*                dispatch(handleDeleteProduct(item.product_id))*/}
                    {/*            }}>Delete*/}
                    {/*            </button>*/}
                            </tr>
                    {/*    )*/}
                    {/*})*/}
                    {/*}*/}
                </table>
            </div>
    );
}

export default OrderProduct;