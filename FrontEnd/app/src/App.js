import './App.css';
import RegisterPage from "./pages/RegisterPage";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage";
import ListProduct from "./pages/products/ListProduct";
import AddProduct from "./pages/admin/AddProduct";
import DetailProduct from "./pages/admin/DetailProduct";
import CartProduct from "./pages/products/CartProduct";
import EditProduct from "./pages/admin/editProducts";
import {useSelector} from "react-redux";
import AdminPage from "./pages/admin/adminPage";
import Checkout from "./pages/products/Checkout";
import OrderProduct from "./pages/products/OrderProduct";
import ListOrder from "./pages/products/ListOrder";
import OrderDetail from "./pages/products/OrderDetail";


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
                            <Route path={'order-product'} element={<OrderProduct/>}></Route>
                        </>
                        :
                        <Route path="*" element={<ListProduct/>}/>
                    }
                    <Route path={'home'} element={<Home/>}>
                        <Route path={''} element={<ListProduct/>}></Route>
                        <Route path={'checkout'} element={<Checkout/>}></Route>
                        <Route path={'list-order'} element={<ListOrder/>}></Route>
                        <Route path={'orderDetail/:order_id'} element={<OrderDetail/>}></Route>
                        <Route path='detail/:product_id' element={<DetailProduct></DetailProduct>}></Route>
                        { (user.userName != null) ?
                            <>
                            <Route path={'cart/:user_id'} element={<CartProduct/>}></Route>
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
