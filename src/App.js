import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Signin from './components/signin';
import Signup from './components/signup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from './services/userService';
import Logout from './components/logout';
import CreateCard from './components/createCard';
import ProtectedRoute from './components/common/protectedRoute';
import MyCards from './components/myCard';
import Members from './components/getUsers';
import updateCard from './components/updateCard';
import CardPage from './components/cardPage';
import MyCatCards from './components/myCardsCat';
import CreateBlog from './components/createBlog';
import UpdateBlog from './components/updateBlog';
import BlogPage from './components/blogPage';
import EditProfile from './components/editProfile';
import CreateProduct from './components/createProduct';
import ProductPage from './components/productPage';
import UpdateProduct from './components/updateProduct';



function App() {
  const [user, setUser] = useState()
  

  const setTheUser = () => {
    const user = userService.getCurrentUser();
    
    setUser(user)
  }

  useEffect(() => {
    setTheUser()
  }, [])



  

    return (
      <React.Fragment>
        <div id='id_container' dir='rtl'>
          <ToastContainer />
          <header>
            <Navbar className='direction-rtl' user={user} />
          </header>
          <div className='d-flex'>
          <aside style={{width: '12.5%'}} className='float-right bg-success'></aside>
          <main id='id_main' style={{ minHeight: 500, padding: 0}} className="m-0 p-0 col-12 col-lg-9" >
            <Switch className="col-12">
              <Route path="/logout" component={Logout} />
              <Route exact path="/" component={Home} user={user} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path='/blog-page/:id' component={BlogPage} />
              <Route path="/my-cards/category/:id" component={MyCatCards} />
              <Route path="/my-cards/card-page/:id" component={CardPage}  />
              <Route path="/product-page/:id" component={ProductPage}  />
              <ProtectedRoute path="/edit-profile/:id" component={EditProfile} user={true}/>
              <ProtectedRoute path='/my-cards/update/:id' component={updateCard} admin={true} />
              <ProtectedRoute path='/update-blog/:id' component={UpdateBlog} user={true} />
              <ProtectedRoute path="/create-card" component={CreateCard} admin={true} />
              <ProtectedRoute path="/update-product/:id" component={UpdateProduct} admin={true} />
              <ProtectedRoute path="/create-product" component={CreateProduct} admin={true} />
              <ProtectedRoute path="/create-blog" component={CreateBlog} user={user} />
              <ProtectedRoute path="/get-users" component={Members} admin={true} />

            </Switch>
          </main>
          <aside style={{width: '12.5%'}} className='float-left bg-success'></aside>
          </div>
        </div>
      </React.Fragment>
    );
    }
export default App;
