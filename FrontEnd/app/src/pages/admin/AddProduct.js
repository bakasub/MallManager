import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {storage} from "../../fireBase";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import {addProducts} from "../../services/productService";

function AddProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => {
        return state.user.currentUser;
    })
    const [submitting, setSubmitting] = useState(false)
    const handleAdd = async (values) => {
        let data = {
            ...values,
            user_id: users.user_id,
            url: img
        }
        await dispatch(addProducts(data))
        await navigate('/admin')
    }
    const [imageUrls, setImageUrls] = useState([]);
    const [img, setImg] = useState("");
    const imagesListRef = ref(storage, "images/");
    const uploadFile = (imageUpload) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImg(url)
                setSubmitting(false)
            });
        })
    };
    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);
    return (
        <div>
            <h1 style={{textAlign: "center",backgroundColor:"white"}}>Add Products</h1>
            <Formik initialValues={{
                name_product: '',
                price: '',
                quantity: '',
                description: '',
                category_id: '',
                url: imageUrls,
            }} onSubmit={(values) => {
                handleAdd(values);
            }}>
                <Form>

                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="exampleInputEmail1">Email address</label>*/}
                        {/*    <input type="email" className="form-control" id="exampleInputEmail1"*/}
                        {/*           aria-describedby="emailHelp" placeholder="Enter email"/>*/}
                        {/*       */}
                        {/*</div>*/}
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="exampleInputPassword1">Password</label>*/}
                        {/*    <input type="password" className="form-control" id="exampleInputPassword1"*/}
                        {/*           placeholder="Password"/>*/}
                        {/*</div>*/}
                        {/*<div className="form-check">*/}
                        {/*    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>*/}
                        {/*        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
                        {/*</div>*/}
                    <h5>Name</h5>


                    <div className="group">
                        <label htmlFor="exampleInputEmail1"></label>
                        <Field type={'text'} name={'name_product'} className={'form-control'}/>
                    </div>
                    <h5>Price</h5>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1"></label><br/>
                        <Field type={'number'} name={'price'} className={'form-control'}/>
                    </div>
                    <h5>Quantity</h5>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1"></label>
                        <Field type={'number'} name={'quantity'} className={'form-control'}/>
                    </div>
                    <h5>Description</h5>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1"></label>
                        <Field type={'text'} name={'description'} className={'form-control'}/>
                    </div>
                    <br/>


                    <div  >
                        <Field as="select" name="category_id" style={{fontsize:50}}>
                            <option style={{fontSize:25}} disabled value="">Pick a winner</option>
                            <option  style={{fontSize:25}} value='1'>Iphone</option>
                            <option style={{fontSize:25}} value='2'>SamSung</option>
                            <option style={{fontSize:25}} value='3'>Nokia</option>
                        </Field>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label style={{fontSize:25}} htmlFor="exampleInputPassword1">Image</label>
                        <input style={{fontSize:25}}
                            type="file" onChange={(event) => {
                            setSubmitting(true)
                            uploadFile(event.target.files[0])
                        }}/>
                    </div>
                    <button className="btn btn-outline-dark" type={onclick} disabled={submitting}>Submit</button>
                    <button className="m-3 btn btn-outline-dark" type={onclick} style={{color:"red"}}>
                        <Link to={'/admin'}>Back</Link>
                    </button>
                </Form>
            </Formik>
        </div>
    );
}
export default AddProduct;