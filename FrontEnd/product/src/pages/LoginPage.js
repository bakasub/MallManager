import React, {useEffect} from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../services/userService";
import {Field, Form, Formik} from "formik";

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => {
        console.log(state.user.currentUser,'abcccc')
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
            // console.log(user,'userrrr')
            alert(user.message)
        }
    }
    return (
        <div className={'row'}>
            <div className="offset-3 col-6">
                <h1 style={{textAlign: "center"}}>Page Login</h1>
                <Formik initialValues={{username: '', password: ''}} onSubmit={(values) => {
                    handleLogin(values)
                }}>
                    <Form>
                        <div className="group">
                            <label htmlFor="exampleInputEmail1">Email address/ Username</label>
                            <Field type={'text'} name={'username'} className={'form-control'}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <Field type={'password'} name={'password'} className={'form-control'}/>
                        </div>
                        <button type="submit">Submit</button>
                        <button type="submit" className="ml-3">
                            <Link to={'register'}>Register</Link>
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default LoginPage;
// import React from 'react';
//
// function LoginPage() {
//     return (
//         <div>
//             <h1>Đây là login</h1>
//         </div>
//     );
// }
//
// export default LoginPage;