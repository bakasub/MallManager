import React from 'react';
import {Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import {login} from "../../services/userService";

function Test() {
    const handleLogin = async (values) => {
        // let result = await dispatch(login(values))
        // let message = result.payload.message
        // if (message =="success") {
        //     navigate("/Home")
        // } else {
        //     alert(message)
        // }
    }
    return (
        <>
            <Formik initialValues={{username: '', password: ''}} onSubmit={values => {
                handleLogin(values)
            }}>
                <Form id="form-login">
                    <h1 className="form-heading">Form đăng nhập</h1>
                    <div className="form-group">
                        <i className="far fa-user"></i>
                        <Field type="text" className="form-input" placeholder="Tên đăng nhập"></Field>
                    </div>
                    <div className="form-group">
                        <i className="fas fa-key"></i>
                        <Field type="password" className="form-input" placeholder="Mật khẩu"></Field>
                        <div id="eye">
                            <i className="far fa-eye"></i>
                        </div>
                    </div>
                    <Field type="submit" value="Đăng nhập" className="form-submit"></Field>
                </Form>
            </Formik>


        </>
    );
}

export default Test;