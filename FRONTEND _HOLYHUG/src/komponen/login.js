import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
  state = {
    statusRedirect: false,
  }


ambil = (e) => {
    var url1 = 'http://localhost:8000/verifuser';
    axios.get(url1).then((x)=>{
      // var dt = x.data[1].password
      var pjg = x.data

      var username = this.refs.username.value
      var password =  this.refs.password.value
      
        var i;
      for(i = 0; i<pjg.length; i++){
          if (username === pjg[i].username && password === pjg[i].password){
            axios.post('http://localhost:8000/loginuser', {
              username: e.username.value,
              password: e.password.value
            }).then((Response) => {
              var userId = Response.data;
              cookies.set('userID', userId, {path: '/userprofile'});
              cookies.set('userID', userId, {path: '/productDetail'});
              cookies.set('userID', userId, {path: '/fleece/productDetail/addtocart'});
              cookies.set('userID', userId, {path: '/catton/productDetail/addtocart'});
              cookies.set('userID', userId, {path: '/wool/productDetail/addtocart'});
              cookies.set('userID', userId, {path: '/feather/productDetail/addtocart'});
              cookies.set('userID', userId, {path: '/flanel/productDetail/addtocart'});
              cookies.set('userID', userId, {path: '/home/productDetail/addtocart'});
              cookies.set('userID', userId, {path: '/synthetic'});
              cookies.set('userID', userId, {path: '/checkout'});
              cookies.set('userID', userId, {path: 'cart/deletecart'});
              cookies.set('userID', userId, {path: '/deletecart'});
              cookies.set('userID', userId, {path: '/wool'});
              cookies.set('userID', userId, {path: '/fleece'});
              cookies.set('userID', userId, {path: '/catton'});
              cookies.set('userID', userId, {path: '/feather'});
              cookies.set('userID', userId, {path: '/cart'});
              cookies.set('userID', userId, {path: '/flanel'});
              cookies.set('userID', userId, {path: '/home'});
              this.setState({
                statusRedirect: true
              })
              alert('success login')
            })
              break;
          }else if (i === pjg.length - 1){
              alert ("Username or Password Incorrect")
          }
      }
      })
    }

  render() {
    if(this.state.statusRedirect === true){
      return <Redirect to="/home" />
    }

    return (
      <div class="login-page">
      <center><h1 id="head">HolyHug</h1></center>
  <div class="form">
    <form class="login-form">
      <input ref="username" type="text" placeholder="username"/>
      <input ref="password" type="password" placeholder="password"/>
      <button type="button" onClick={() => this.ambil(this.refs)}><span>login</span></button>
      <a href="/register"><h5 id="regis">not yet registered ?</h5></a> 
    </form>
  </div>
</div>
    )
  }
}
export default Login;






