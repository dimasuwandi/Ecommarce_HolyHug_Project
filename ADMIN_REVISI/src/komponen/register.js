import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';

class Register extends Component {
    state = {
        statusRedirect: false,
      }
    constructor(){
        super();
        this.state = {
          daftarOrang : [],
        }
      }
ambil(){
    var url1 = 'http://localhost:8000/data';
    axios.get(url1).then((x)=>{
    console.log(x.data);
    this.setState({daftarOrang: x.data})
    })
 }

kirim(){
    var username = this.refs.username.value
    var password = this.refs.password.value
    var url1 = 'http://localhost:8000/register';
    var validasi = username.length
    var validasi1 = password.length
    if (validasi < 4 || validasi1 < 4 ){
        alert("minimim character 4 words for username and password")
    }else{
    axios.post(url1, {
      username: this.refs.username.value,
      password: this.refs.password.value,
    }).then(()=>{
      console.log(validasi)
      console.log(password)
      alert("Registered, Please Login");
      this.setState({
        statusRedirect: true
      })
        
    })
    }}
  render() {
    if(this.state.statusRedirect === true){
        return <Redirect to="/" />
      }
    return (
      <div className="container">
        <form className="form-horizontal">
                <fieldset>
                    <legend>Register Now</legend>
                    <div className="form-group">
                        <label className="col-lg-2 control-label">Username</label>
                        <div className="col-lg-10">
                            <input ref="username" type="text" className="form-control" placeholder="Masukan username anda ..." required/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Password</label>
                        <div className="col-lg-10">
                            <input ref="password" type="password" className="form-control"   placeholder="Isi dengan password anda ..." required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-10 col-lg-offset-2">
                            <a type="button" onClick={() => this.kirim()} className="btn btn-primary"><i className="fa fa-paper-plane"></i>&nbsp;Register</a>
                        </div>
                    </div>

                </fieldset>
            </form>
      </div>
    )
  }
}
export default Register;
