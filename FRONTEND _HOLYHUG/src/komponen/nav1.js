
import React, {Component} from 'react';
import './style.css';
import axios from 'axios';

class Navbar extends Component {

    state = {
        statusRedirect: false,
      }
    constructor(){
        super();
        this.state = {
          daftarOrang : [],
        }
      }
    kirim(){
    var nama = this.refs.nama.value
    var username = this.refs.username.value
    var email = this.refs.email.value
    var number = this.refs.number.value
    var address = this.refs.address.value
    var password = this.refs.password.value
    var url1 = 'http://localhost:8000/register1';
    var validasi = username.length
    var validasi1 = password.length
    if (validasi < 4 || validasi1 < 4 ){
        alert("minimim character 4 words for username and password")
    }else{
    axios.post(url1, {
    nama: this.refs.nama.value,
    username: this.refs.username.value,
    email: this.refs.email.value,
    number: this.refs.number.value,
    address: this.refs.address.value,
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
    render(){
        return(
<div>
<nav id="nav" class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="/home">HolyHug</a>
      <form class="navbar-form navbar-left" action="/action_page.php">
      <div id="search"  class="input-group">
        <input type="text" ref="search" class="form-control" placeholder="Search" name="search"/>
        <div class="input-group-btn">
          <button class="btn btn-default" type="submit">
            <i class="glyphicon glyphicon-search"></i>
          </button>
        </div>
      </div>
    </form>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-left">
        <div style={{marginTop:10}}>
                    <a href="/login" id="login" type="button" class="btn btn-success my-2 ml-auto"  style={{marginRight:10}}>Login</a>
                    <a href="/register" type="button" class="btn btn-primary my-2mx-1" >Join Free</a>
        </div>
      </ul>
      <ul class="nav navbar-nav navbar-right">
      </ul>
    </div>
    
    
  </div>
</nav>

<div class="modal fade" id="addMyModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">

                        <h4 class="modal-title">Login</h4>

                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form role="form" id="newModalForm">
                            <div class="form-group">
                                <div>
                                    <input type="text" class="form-control" id="" name="" placeholder="username/email" require/>
                                </div>
                                <br/>

                                <div>
                                    <input type="password" class="form-control" id="subject" name="subject" placeholder="password" require/>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success" id="btnSaveIt">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="addMyModal1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Join Free</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form role="form" id="newModalForm">
                            <div class="form-group">
                                <h4>Create Account : </h4><br/>
                                <div>
                                    <input ref="fullname" type="text" class="form-control" id="fullname" name="" placeholder="full name" require/>
                                </div>
                                <br/>
                                <div>
                                    <input ref="username" type="text" class="form-control" id="username" name="" placeholder="username" require/>
                                </div>
                                <br/>
                                <div>
                                    <input ref="email" type="email" class="form-control" id="email" name="" placeholder="email" require/>
                                </div>
                                <br/>
                                <div>
                                    <input ref="number" type="number" class="form-control" id="number" name="" placeholder="phone number" require/>
                                </div>
                                <br/>
                                <div>
                                    <input ref="address" type="text" class="form-control" id="address" name="" placeholder="address" require/>
                                </div>
                                <br/>
                                <div>
                                    <input ref="password" type="password" class="form-control" id="password" name="" placeholder="password" require/>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={() => this.kirim()} type="submit" class="btn btn-primary">Creat</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</div>    
        )
    }
}
export default Navbar;