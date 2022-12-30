import './App.css';
import RegisterPage from "./pages/RegisterPage";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage";
import ListProduct from "./pages/products/ListProduct";
import AddProduct from "./pages/products/AddProduct";
import DetailProduct from "./pages/products/DetailProduct";
import CartProduct from "./pages/products/CartProduct";
import Test from "./pages/products/test";
import EditProduct from "./pages/products/editProducts";
import {useSelector} from "react-redux";
import AdminPage from "./pages/admin/adminPage";

function App() {
    const user = useSelector(state => {
      return state.user.currentUser;
    })
    console.log(user ,'uuuuuuuuu')
    return (
        <>
            <div className="container-fluid">
                <Routes>
                    <Route path={''} element={<LoginPage></LoginPage>}></Route>
                    <Route path={'register'} element={<RegisterPage></RegisterPage>}/>
                    <Route path={'test'} element={<Test></Test>}/>
                    <Route path={'home'} element={<Home/>}>
                        <Route path={''} element={<ListProduct/>}></Route>
                        <Route path={'admin'} element={<AdminPage/>}></Route>
                        { (user.userName != null) ?
                            <>
                            <Route path={'add-product'} element={<AddProduct/>}></Route>
                            <Route path={'cart'} element={<CartProduct/>}></Route>
                            <Route path='detail/:product_id' element={<DetailProduct></DetailProduct>}></Route>
                            <Route path={'edit/:product_id'} element={<EditProduct/>}></Route> </>
                            :
                            <Route path="*" element={<ListProduct/>}/>
                        }

                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
