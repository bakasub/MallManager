import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../services/userService";

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const handleRegister = async (values) => {
        if (values.username === '') {
            alert('chưa nhập username')
            navigate('')
        } else if (values.password === '') {
            alert('chưa nhập password')
            navigate('')
        } else if (values.re_password === '') {
            alert('chưa nhập re_password')
            navigate('')
        } else if (values.email === '') {
            alert('chưa nhập email')
            navigate('')
        } else if (values.phone === '') {
            alert('chưa nhập phone')
            navigate('')
        } else if (values.address === '') {
            alert('chưa nhập address')
            navigate('')
        } else if ((values.password !== values.re_password) && values.password.length !== 0) {
            alert('Password and rePassword wrong')
        } else {
            let result = await dispatch(register(values));
            if (result.payload.data.message === "Tài khoản đã tồn tại!!! ") {
                setMessage(result.payload.data.message)
            } else {
                navigate('/')
            }
        }
    }
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundImage: 'url(https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'

        }}>
            <Formik initialValues={{username: '', password: '', re_password: '', email: '', phone: '', address: ''}}
                    onSubmit={(values) => {
                        handleRegister(values)
                    }}>
                <Form id="form-register">
                    <h1 className="form-heading">Register</h1>
                    <div className="form-group">
                        <i className="far fa-user"></i>
                        <Field type="text" className="form-input" name={"username"} placeholder="Username"></Field>
                    </div>
                    <div className="form-group">
                        <i className="fas fa-key"></i>
                        <Field type="password" className="form-input" name={"password"} placeholder="Password"></Field>
                        <div id="eye">
                            <i className="far fa-eye"></i>
                        </div>
                    </div>
                    <div className="form-group">
                        <i className="fas fa-key"></i>
                        <Field type="password" className="form-input" name={"re_password"}
                               placeholder="Re_Password"></Field>
                        <div id="eye">
                            <i className="far fa-eye"></i>
                        </div>
                    </div>
                    <div className="form-group">
                        <i className="fas fa-key"></i>
                        <Field type="email" className="form-input" name={"email"} placeholder="Email"></Field>
                    </div>
                    <div className="form-group">
                        <i className="fas fa-key"></i>
                        <Field type="number" className="form-input" name={"phone"} placeholder="Phone"></Field>
                    </div>
                    <div className="form-group">
                        <i className="fas fa-key"></i>
                        <Field type="text" className="form-input" name={"address"} placeholder="Address"></Field>
                    </div>
                    <div>
                        {message}
                    </div>
                    <button type="submit" className="btn btn-light">Light</button>
                    <button type="submit" className="m-3 btn btn-light">
                        <Link to={'/'}>Login</Link>
                    </button>
                </Form>
            </Formik>
        </div>
    );
}
export default RegisterPage;

