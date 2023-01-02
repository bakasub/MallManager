import React, {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../services/userService";
import {Field, Form, Formik} from "formik";

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => {
        // console.log(state.user.currentUser,'abcccc')
        return state.user.currentUser
    })
    const handleLogin = async (values) => {
        let result = await dispatch(login(values))
        let message = result.payload.message
        if (user.userName == "admin") {
            navigate("/admin")
        } else if (message == "success" && user.userName != "admin") {
            navigate("/Home")
        } else {
            alert(message)
        }
    }
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundImage: 'url(https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'

        }}>
            <Formik initialValues={{username: '', password: ''}} onSubmit={(values) => {
                handleLogin(values)
            }}>
                <Form id="form-login">
                    <h1 className="form-heading">Login</h1>
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
                    <button type="submit">Submit</button>
                    <button type="button" className="ml-3">
                        <Link to={'register'}>Register</Link>
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default LoginPage;
