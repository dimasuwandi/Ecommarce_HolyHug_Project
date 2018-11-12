import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    statusRedirect: false,
  }

ambil(){
    var url1 = 'http://localhost:8000/verif';
    axios.get(url1).then((x)=>{
      // var dt = x.data[1].password
      var pjg = x.data

      var username = this.refs.username.value
      var password =  this.refs.password.value
      
        var i;
      for(i = 0; i<pjg.length; i++){
          if (username === pjg[i].username && password === pjg[i].password){
              alert("Login Success!");
              this.setState({
                statusRedirect: true
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
      return <Redirect to="/dashboard" />
    }

    return (
      <div class="login-page">
      <center><h1 id="head">Login Admin</h1></center>
  <div class="form">
    <form class="login-form">
      <input ref="username" type="text" placeholder="username"/>
      <input ref="password" type="password" placeholder="password"/>
      <button type="button" onClick={() => this.ambil()}><span>login</span></button>
      <a href="/register"><h5 id="regis">not yet registered ?</h5></a> 
    </form>
  </div>
</div>
    )
  }
}
export default Login;