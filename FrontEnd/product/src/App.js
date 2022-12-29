
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
function App() {
  // const user = useSelector(state => {
  //   return state.user.currentUser;
  // })
  return (
      <>
        <div className="container-fluid">
          <Routes>
            <Route path={''} element={<LoginPage></LoginPage>}></Route>
            <Route path={'register'} element={<RegisterPage></RegisterPage>}/>
            <Route path={'test'} element={<Test></Test>}/>

                  <Route path={'home'} element={<Home/>}>
                    <Route path={''} element={<ListProduct/>}></Route>
                    <Route path={'add-product'} element={<AddProduct/>}></Route>
                    <Route path={'cart'} element={<CartProduct/>}></Route>
                    <Route path='detail/:product_id' element={<DetailProduct></DetailProduct>}></Route>
                  </Route>


          </Routes>
        </div>
      </>
  );
}

export default App;
