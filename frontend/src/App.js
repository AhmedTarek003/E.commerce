import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import ProductItem from "./pages/ProductItem/ProductItem";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { ToastContainer } from "react-toastify";
import Admin from "./pages/admin/Admin";
import Users from "./pages/Users/Users";
import EditProduct from "./pages/Edit-Product/EditProduct";
import AddProduct from "./pages/AddProduct/AddProduct";
import Category from "./pages/CategoryPage/Category";
import { useSelector } from "react-redux";
import NotFound from "./pages/Not Found/NotFound";
import ForgetPass from "./pages/Forget Password/ForgetPass";
import ResetPass from "./pages/Forget Password/ResetPssword";
import SuccessPage from "./pages/Success/Success";

function App() {
  const clickedHandler = (e) => {
    if (document.querySelector(".header")) {
      if (e.target.id === "searchHere") {
        document.querySelector(".search-form").classList.add("clicked");
      } else {
        document.querySelector(".search-form").classList.remove("clicked");
      }
    }
  };
  const { user } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);
  return (
    <div className="App" onClick={clickedHandler}>
      <BrowserRouter>
        <ToastContainer
          theme="colored"
          position="top-center"
          autoClose={1200}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/productsList"
            element={
              <>
                <Header />
                <Products />
                <Footer />
              </>
            }
          />
          <Route
            path="/productItem/:id"
            element={
              <>
                <Header />
                <ProductItem />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              !user ? (
                <Navigate to={"/login"} />
              ) : (
                <>
                  <Header />
                  <Cart />
                  <Footer />
                </>
              )
            }
          />
          <Route
            path="/category/:category"
            element={
              <>
                <Header />
                <Category />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to={"/"} /> : <Register />}
          />
          <Route
            path="/admin-dashboard"
            element={
              !user?.isAdmin ? (
                <NotFound />
              ) : (
                <>
                  <Header />
                  <Admin />
                </>
              )
            }
          />
          <Route
            path="/admin-users"
            element={
              !user?.isAdmin ? (
                <NotFound />
              ) : (
                <>
                  <Header />
                  <Users />
                </>
              )
            }
          />
          <Route
            path="/productItem-edit/:id"
            element={
              !user?.isAdmin ? (
                <NotFound />
              ) : (
                <>
                  <Header />
                  <EditProduct />
                </>
              )
            }
          />
          <Route
            path="/admin-addProducts"
            element={
              !user?.isAdmin ? (
                <NotFound />
              ) : (
                <>
                  <Header />
                  <AddProduct />
                </>
              )
            }
          />
          <Route path="/forget-password" element={<ForgetPass />} />
          <Route
            path="/reset-password/:userId/:tokenId"
            element={<ResetPass />}
          />
          <Route
            path="/success"
            element={order ? <SuccessPage /> : <Navigate to={"/"} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
