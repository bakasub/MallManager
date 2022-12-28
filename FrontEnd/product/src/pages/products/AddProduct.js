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
    const handleAdd = (values) => {
        let data = {
            ...values,
            user_id: users.user_id,
            url: img
        }
        dispatch(addProducts(data))
        navigate('/home')
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
            <h1 style={{textAlign: "center"}}>Add Products</h1>
            <Formik initialValues={{
                name_product: '',
                price: '',
                quantity: '',
                description: '',
                url: imageUrls
            }} onSubmit={(values) => {
                handleAdd(values);
            }}>
                <Form>
                    <div className="group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <Field type={'text'} name={'name_product'} className={'form-control'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Price</label>
                        <Field type={'text'} name={'price'} className={'form-control'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Quantity</label>
                        <Field type={'text'} name={'quantity'} className={'form-control'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <Field type={'text'} name={'description'} className={'form-control'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Image</label>
                        <input
                            type="file" onChange={(event) => {
                            setSubmitting(true)
                            uploadFile(event.target.files[0])
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Status</label>
                        <div>
                            <Field as="select" name="status">
                                <option disabled value="">Pick a winner</option>
                                <option value='1'>Public</option>
                                <option value='2'>Private</option>
                            </Field>
                        </div>
                    </div>
                    <button type="submit" disabled={submitting}>Submit</button>
                </Form>
            </Formik>
        </div>
    );
}
export default AddProduct;