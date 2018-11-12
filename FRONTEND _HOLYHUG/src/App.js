import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import Register from './komponen/register.js';
import Login from './komponen/login.js';
import Home1 from './komponen/home1';
import Home from './komponen/home';
import Userprofile from './komponen/userprofile.js';
import Fleece from './komponen/fleece';
import Catton from './komponen/catton';
import Wool from './komponen/wool';
import Feather from './komponen/feather';
import Synthetic from './komponen/synthetic';
import Flanel from './komponen/flanel';
import Checkout from './komponen/checkout.js';
import ProductDetail from './komponen/productDetail'
import ProductDetail1 from './komponen/productDetail1'
import ProductDetail2 from './komponen/productDetail2'
import Best from './komponen/bestseller.js'
import Adc from './komponen/addtochart.js'
import Cart from './komponen/cart.js'
import Delcart from './komponen/deletecart.js'
import Newprod from './komponen/newprod.js'
import Detailinv from './komponen/detailinv.js'
import Uploadbukti from './komponen/uploadbukti.js'
import Allproduct from './komponen/allproduct.js'




import Coba from './komponen/coba.js'


class App extends Component {
  render() {
    return (
      <div>
        <div>
          <center>
           <br/>
           <br/>
           <div>
           <Route path='/home' component={Home}></Route>
           <Route path='/h' component={Home1}></Route>
           <Route path='/register' component={Register}></Route>
           <Route path='/login' component={Login}></Route>
           <Route path='/best' component={Best}></Route>
           <Route path='/new' component={Newprod}></Route>
           <Route path='/productDetail' component={ProductDetail}></Route>
           <Route path='/productDetail1' component={ProductDetail1}></Route>
           <Route path='/productDetail2' component={ProductDetail2}></Route>
           <Route path='/addtocart' component={Adc}></Route>
           <Route path='/deletecart' component={Delcart}></Route>
           <Route path='/userprofile' component={Userprofile}></Route>
           <Route path='/fleece' component={Fleece}></Route>
           <Route path='/catton' component={Catton}></Route>
           <Route path='/wool' component={Wool}></Route>
           <Route path='/feather' component={Feather}></Route>
           <Route path='/synthetic' component={Synthetic}></Route>
           <Route path='/flanel' component={Flanel}></Route>
           <Route path='/checkout' component={Checkout}></Route>
           <Route path='/cart' component={Cart}></Route>
           <Route path='/detailinv' component={Detailinv}></Route>
           <Route path='/proofofpayment' component={Uploadbukti}></Route>
           <Route path='/allproduct' component={Allproduct}></Route>


           <Route path='/coba' component={Coba}></Route>
           </div>
           </center>
        </div>
      </div>
    );
  }
}

export default App;
