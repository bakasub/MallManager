import './App.css';
import RegisterPage from "./pages/RegisterPage";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage";
import ListProduct from "./pages/products/ListProduct";
import AddProduct from "./pages/products/AddProduct";
import DetailProduct from "./pages/products/DetailProduct";
import CartProduct from "./pages/products/CartProduct";
import EditProduct from "./pages/products/editProducts";
import {useSelector} from "react-redux";
import AdminPage from "./pages/admin/adminPage";

function App() {
    const user = useSelector(state => {
      return state.user.currentUser;
    })
    return (
        <>
            <div className="container-fluid">
                <Routes>
                    <Route path={''} element={<LoginPage></LoginPage>}></Route>
                    <Route path={'register'} element={<RegisterPage></RegisterPage>}/>
                    {(user.userName == 'admin') ?
                        <>
                            <Route path={'admin'} element={<AdminPage/>}></Route>
                            <Route path={'edit/:product_id'} element={<EditProduct/>}></Route>
                            <Route path={'add-product'} element={<AddProduct/>}></Route>
                        </>
                        :
                        <Route path="*" element={<ListProduct/>}/>
                    }
                    <Route path={'home'} element={<Home/>}>
                        <Route path={''} element={<ListProduct/>}></Route>
                        <Route path='detail/:product_id' element={<DetailProduct></DetailProduct>}></Route>
                        { (user.userName != null) ?
                            <>
                            <Route path={'cart'} element={<CartProduct/>}></Route>
                             </>
                            :
                            <Route path="*" element={<LoginPage/>}/>
                        }

                    </Route>

                </Routes>
            </div>
        </>
    );
}

export default App;
