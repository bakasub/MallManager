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
        let users = result.payload
        if (users.message === "success" && users.userName === "admin") {
            navigate("admin")
        } else if (users.userName !== "admin") {
            navigate("home")
        } else {
            alert(users.message)
        }
    }
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundImage: 'url(https://bcp.cdnchinhphu.vn/Uploaded/phungthithuhuyen/2020_03_13/onlineshopping.jpg    )',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin :0


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
                    <button type="submit" className="btn btn-light">Light</button>
                    <button type="submit" className="ml-3 btn btn-light">
                        <Link to={'register'}>Register</Link>
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default LoginPage;
