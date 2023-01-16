import React, {useEffect, useState} from 'react';
import {cancelOrder, confirmOrder, getOrder, getOrderDetail} from "../../services/orderService";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";

function OrderDetail() {
    const dispatch = useDispatch();
    const {order_id} = useParams()
    const orderDetail = useSelector(state => {
        return state.orders.orders
    })
    useEffect(() => {
        dispatch(getOrderDetail(order_id))
    }, [])
    const username = localStorage.getItem("userName");
    const handleConfirmOrder = async () =>{
        await dispatch(confirmOrder(order_id))
        await dispatch(getOrderDetail(order_id))
    }
    if (username == 'admin'){
        return (
            <div>
                <div className={'row'}>
                    <table className="table table-striped">
                        <tr>
                            <th style={{fontSize: 30}} scope="col">STT</th>
                            <th style={{fontSize: 30}} scope="col">Name Product</th>
                            <th style={{fontSize: 30}} scope="col">OrderId</th>
                            <th style={{fontSize: 30}} scope="col">Status</th>
                            <th style={{fontSize: 30}} scope="col">Quantity</th>
                            <th style={{fontSize: 30}} scope="col">ProductQuantity</th>

                        </tr>
                        {orderDetail.map((item, index) => {
                            return (
                                <tr>
                                    <td style={{fontSize: 25}}>{index + 1}</td>
                                    <td style={{fontSize: 25}}>{item.name_product}</td>
                                    <td style={{fontSize: 25}}>{item.order_id}</td>
                                    <td style={{fontSize: 25}}>{item.status}</td>
                                    <td style={{fontSize: 25}}>{item.quantity}</td>
                                    <td style={{fontSize: 25}}>{item.productQuantity}</td>
                                </tr>
                            )
                        })
                        }
                        <>
                            <button disabled={orderDetail[0].status !== 1 ? true : false}  onClick={() => {
                                handleConfirmOrder(order_id)
                            }}>Accept
                            </button>
                        </>
                    </table>

                </div>
            </div>
        );
    } else if (username != undefined) {
        return (
            <div>
                <div className={'row'}>
                    <table className="table table-striped">
                        <tr>
                            <th style={{fontSize: 30}} scope="col">STT</th>
                            <th style={{fontSize: 30}} scope="col">Name Product</th>
                            <th style={{fontSize: 30}} scope="col">OrderId</th>
                            <th style={{fontSize: 30}} scope="col">Status</th>
                            <th style={{fontSize: 30}} scope="col">Quantity</th>
                            <th style={{fontSize: 30}} scope="col">ProductQuantity</th>

                        </tr>
                        {orderDetail.map((item, index) => {
                            return (
                                <tr>
                                    <td style={{fontSize: 25}}>{index + 1}</td>
                                    <td style={{fontSize: 25}}>{item.name_product}</td>
                                    <td style={{fontSize: 25}}>{item.order_id}</td>
                                    <td style={{fontSize: 25}}>{item.status}</td>
                                    <td style={{fontSize: 25}}>{item.quantity}</td>
                                    <td style={{fontSize: 25}}>{item.productQuantity}</td>
                                </tr>
                            )
                        })
                        }
                    </table>

                </div>
            </div>
        );
    }


}

export default OrderDetail;