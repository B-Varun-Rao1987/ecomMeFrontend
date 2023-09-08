import './App.css';
import { useState,useEffect, Fragment } from "react";
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import { BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from "./components/Home/Home";
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/layout/Contact/Contact";
import About from "./components/layout/About/About";
import NotFound from "./components/layout/Not Found/NotFound";
const BaseUrl="http://localhost:4000";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");



  async function getStripeApiKey() {
    const { data } = await axios.get(`${BaseUrl}/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route index exact path="/" element={<Home />} />
        {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Route
                    element={<ProtectedRoute isAdmin={false} element={Payment} />}
                  />
                </Elements>
              }
            />
          )}
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/about" element={<About />} />
        <Route path="/account" element={<ProtectedRoute element={Profile} />} />
        <Route path="/me/update" element={<ProtectedRoute element={UpdateProfile} />} />
        <Route path="/password/update" element={<ProtectedRoute element={UpdatePassword} />} />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />

        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route path="/shipping" element={<ProtectedRoute element={Shipping} />} />
        <Route path="/success" element={<ProtectedRoute element={OrderSuccess} />} />
        <Route path="/orders" element={<ProtectedRoute element={MyOrders} />} />
        <Route path="/order/confirm" element={<ProtectedRoute element={ConfirmOrder} />} />

        <Route path="/order/:id" element={<ProtectedRoute element={OrderDetails} />} />

        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} element={Dashboard} />} />

        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} element={ProductList} />} />
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true} element={NewProduct} />} />
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} element={UpdateProduct} />} />
        <Route path="admin/orders" element={<ProtectedRoute isAdmin={true} element={OrderList} />} />
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} element={ProcessOrder} />} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} element={UsersList} />} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true} element={UpdateUser} />} />
        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true} element={ProductReviews} />} />
        <Route
         element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;



