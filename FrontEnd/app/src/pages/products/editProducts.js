import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {storage} from "../../fireBase";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import {addProducts, getProducts, updateProducts} from "../../services/productService";


function EditProduct() {
    const dispatch = useDispatch();
    const {product_id} = useParams();
    const navigate = useNavigate();
    const product = useSelector(state => {
        return state.product.products;
    })
    const [submitting, setSubmitting] = useState(false)
    const handleEdit = async (values) => {
        let data = {
            ...values,
            product_id,
            url: img
        }
        await dispatch(updateProducts(data))
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
    const item = product.filter(item => item.product_id == product_id)[0]
    return (
        <div>
            <h1 style={{textAlign: "center", backgroundColor: "white"}}>Add Products</h1>
            <Formik initialValues={{
                name_product: item.name_product,
                price: item.price,
                quantity: item.quantity,
                description: item.description,
                category_id: item.category_id,
                url: imageUrls
            }} onSubmit={(values) => {
                handleEdit(values);
            }}>

                <Form>
                    <div className="group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <Field type={'text'} name={'name_product'} className={'form-control'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Price</label>
                        <Field type={'number'} name={'price'} className={'form-control'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Quantity</label>
                        <Field type={'number'} name={'quantity'} className={'form-control'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <Field type={'text'} name={'description'} className={'form-control'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Category</label>
                        <Field type={'number'} name={'category_id'} className={'form-control'}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Image</label>
                        <input
                            type="file" onChange={(event) => {
                            setSubmitting(true)
                            uploadFile(event.target.files[0])
                        }}/>
                    </div>
                    <button type="submit" disabled={submitting}>Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default EditProduct;