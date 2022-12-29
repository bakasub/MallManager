import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {register} from "../services/userService";

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = async (values) =>{
        // console.log(values,'valuessss')
        if (values.password === values.re_password){
            await dispatch(register(values));
            await navigate('/')
        }
        // else if (values.phone === '' || values.username === ''||values.email==='' ||values.password ===''||values.re_password===''||values.address===''){
        //     alert('nhập hết các trường dữ liệu')
        // }
        else {
            alert('Password and rePassword wrong')
        }
    }
    return (
        <div className={'row'}>
            <div className="offset-3 col-6">
                <h1 style={{textAlign: "center"}}>Page Register</h1>
                <Formik initialValues={{username: '',password:'',re_password:'',email:'',phone:'',address:''}} onSubmit={(values)=>{
                    handleRegister(values)
                }}>
                    <Form>
                        <div className="group">
                            <label htmlFor="exampleInputEmail1"> Username</label>
                            <Field type={'text'} name={'username'} className={'form-control'}/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <Field type={'password'} name={'password'} className={'form-control'}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Re_Password</label>
                            <Field type={'password'} name={'re_password'} className={'form-control'}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Email</label>
                            <Field type={'text'} name={'email'} className={'form-control'}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Phone</label>
                            <Field type={'text'} name={'phone'} className={'form-control'}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Address</label>
                            <Field type={'text'} name={'address'} className={'form-control'}/>
                        </div>
                        <button type="submit" className="">Submit</button>
                        <button type="submit" className="ml-3">
                            <Link to={'/'}>Login</Link>
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default RegisterPage;

