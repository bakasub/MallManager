import React, {useEffect} from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../services/userService";
import {Field, Form, Formik} from "formik";
import "./loginPage.css"


function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => {
        console.log(state.user.currentUser, 'abcccc')
        return state.user.currentUser
    })
    // const check = user.message;
    const handleLogin = async (values) => {
        await dispatch(login(values))
        if (values.username === user.userName) {
            navigate('/Home')
        }
            // if (user.token !== undefined){
            //     navigate('/Home')
        // }
        else {
            await alert(user.message)
        }
    }
    return (
        <div className="loginBox">
            <div className="row text-center padding">
                <div className="offset-3 col-6">
                    <h1 style={{textAlign: "center"}}>Page Login</h1>
                    <Formik initialValues={{username: '', password: ''}} onSubmit={(values) => {
                        handleLogin(values)
                    }}>
                        <Form>
                            <div className="group">
                                <label htmlFor="exampleInputEmail1">Username</label>
                                <Field type={'text'} name={'username'} className={'form-control'}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <Field type={'password'} name={'password'} className={'form-control'}/>
                            </div>
                            <div>
                                <button type="button" class="btn btn-primary btn-lg" type="submit">Submit
                                </button>
                                <button type="button" class="btn btn-primary btn-lg" type="submit">
                                    <Link to={'register'}>Register</Link>
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;