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
            <h1 style={{textAlign: "center", backgroundColor: "white"}}>Edit Products</h1>
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
                        <div className="col-md-6">
                            <img src={item.url} style={{width: 400, height: 500, objectFit: "cover"}}/>
                        </div>
                    </div>
                    <button className="btn btn-outline-dark" type="submit" disabled={submitting}>Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default EditProduct;