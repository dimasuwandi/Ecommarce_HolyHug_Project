import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Register extends Component {

  state = {
    redirect: false,
    typePass: 'password',
    statusPass: '',
    statusUsername: '',
    mycookie: cookies.get('userID')
  }


notifmember(){
  axios.post('http://localhost:8000/notifmember', {
})
}



  daftarUser = (e) => {
    axios.post('http://localhost:8000/createaccount', {
            nama  : e.nama.value,
            username : e.username.value,
            email : e.email.value,
            number : e.number.value,
            address : e.address.value,
            password : e.password.value,
    }),
    axios.post('http://localhost:8000/cart', {
            username : e.username.value,
    }).then(() => {
        alert("Succesfully Enterd Data")
        this.setState({
            redirect: true
          })
    })
  }

  showPass = () => {
    if(document.getElementById("showpass").checked === true){
      this.setState({
        typePass: 'text'
      })
    } else if(document.getElementById("showpass").checked === false){
      this.setState({
        typePass: 'password'
      })
    }

  }

  checkPass = (e) => {
    var inputPass = document.getElementById("password").value;
    var confirmPassword = e.target.value;

    if(confirmPassword === inputPass){
      this.setState({
        statusPass: 'Password Match'
      })
    } else{
      this.setState({
        statusPass: 'Password Not Match'
      })
    }
  }

  render() {

    if(this.state.redirect) return <Redirect to="/login" />

    return (
      <div className="container" style={{ marginLeft:"60px", marginTop: "140px", marginBottom: "80"}}>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div style={{backgroundColor:"#FAEBD7"}} className="panel panel-default">
              <div style={{backgroundColor:"#286090"}}  className="panel-heading">
                <h3 style={{color:"white"}} className="panel-title text-center">Join Free</h3>
              </div>
              <div className="panel-body">
                <form>
                <fieldset>
                <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <input ref="nama" type="text" className="form-control input-md" placeholder="full name" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-md-6">
                        <div className="form-group">
                          <input ref="username" type="text" className="form-control input-md" placeholder="username" autoFocus />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-6">
                        <div className="form-group">
                          <input ref="email" type="email" className="form-control input-md" placeholder="email" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input ref="number" className="form-control" placeholder="phone number" type="number" />
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-md-6">
                        <div className="form-group">
                          <input id="password" ref="password" type={this.state.typePass} className="form-control input-md" placeholder="Password" />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-6">
                        <div className="form-group" style={{marginTop: 10}}>
                          <label>
                            <input id="showpass" type="checkbox" onChange={this.showPass} /> Show Password
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input onChange={this.checkPass} className="form-control" placeholder="Confirm Password" type="password" />
                      <label>{this.state.statusPass}</label>
                    </div>
                    <div className="form-group">
                      <input ref="address" className="form-control" placeholder="address" type="text" />
                    </div>
                    {/* <button className="btn btn-lg btn-success btn-block" type="button" onClick={() => this.daftarUser(this.refs)}>Register</button> */}
                    {/* <button className="btn btn-lg btn-success btn-block" type="button" onClick={() => this.notifmember()}>Register</button> */}
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={(event) => {this.daftarUser(this.refs), this.notifmember()}}>Register</button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;















