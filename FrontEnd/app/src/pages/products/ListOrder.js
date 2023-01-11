import React, {useEffect, useState} from 'react';
import {cancelOrder, getOrder} from "../../services/orderService";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";

function ListOrder() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrder())
    }, [])
    const order = useSelector(state => {
        console.log(state.orders.order)
        return state.orders.order
    })
    const username = localStorage.getItem("userName");
    const handleCancelOrder = (order_id) => {
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
                await dispatch(cancelOrder(order_id))
                await dispatch(getOrder())
            }
        })
    }
    return (
        <div>
            <div className={'row'}>
                <table className="table table-striped">
                    <tr>
                        <th style={{fontSize: 30}} scope="col">STT</th>
                        <th style={{fontSize: 30}} scope="col">OrderId</th>
                        <th style={{fontSize: 30}} scope="col">User_id</th>
                        <th style={{fontSize: 30}} scope="col">Status</th>
                        <th style={{fontSize: 30}} scope="col">Action</th>

                    </tr>
                    {order.map((item, index) => {
                        return (
                            <tr>
                                <td style={{fontSize: 25}}>{index + 1}</td>
                                <td style={{fontSize: 25}}>{item.order_id}</td>
                                <td style={{fontSize: 25}}>{item.user_id}</td>
                                <td style={{fontSize: 25}}>
                                    {item.status == 1 ? 'Pending' : ''}
                                    {item.status == 2 ? 'Accept' : ''}
                                    {item.status == 3 ? 'Cancel' : ''}
                                </td>
                                <td style={{fontSize: 25}}>
                                    <button>Detail</button>
                                    <button disabled={item.status !== 1 ? true: false} onClick={() => {
                                        dispatch(handleCancelOrder(item.order_id))
                                    }}>Cancel
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </table>
            </div>
        </div>
    );
}

export default ListOrder;