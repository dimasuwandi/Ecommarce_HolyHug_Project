
import React, {Component} from 'react';
import './style.css';
import cart from './img/cart-1.png';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {
    state = {
    
        statusRedirect: false,
      }

      constructor(){
        super();
        this.state = {
          notifcart:'',
          dataNotif:[]
        }
      }

      
    search(){
            // var search= this.refs.search.value;

            this.setState({
                statusRedirect: true
              })

            // <Link to={
            //     {
            //       pathname: "/"+search+"/", 
            //     //   state: {produkID}
            //     }
            //  }> </Link>  
       
        }


        componentWillMount(){
            axios.post('http://localhost:8000/jumlahnotifcart')
            .then((ambilData) => {
              this.setState({
                dataNotif: ambilData.data
                // notifjumlah: ambilData.data[0].notifjumlah,
                // invoice: ambilData.data[0].invoice,
                // notifcart: ambilData.data[0].notifcart,
              })
            })
          }

    render(){
        // var search = "catton"
        if(this.state.statusRedirect === true){
            var search = this.refs.search.value;
            return <Redirect to={search}/>
          }




          const hasil = this.state.dataNotif
          .map((isi, urutan) => 
          {
              var notifcart = isi.notifcart;
                if(notifcart == 0){
                    var notif = null
                }else{
                    var notif = notifcart
                }
      
                           return <li className="label label-warning" style={{marginLeft:"-12%", marginTop:"4%"}} >{notif}</li>
                              }
                          );



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
        <input type="text" ref="search"  class="form-control" placeholder="Search"  name="search"/>
        <div class="input-group-btn">
          <button class="btn btn-default" type="submit" onClick={() => this.search()}>
            <i class="glyphicon glyphicon-search"></i>
          </button>
        </div>
      </div>
    </form>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-left">
        <div style={{marginTop:10}}>
        </div>
      </ul>

      <ul class="nav navbar-nav navbar-right" >
        <li><a href="/userprofile"> User Profil</a></li>


                                {/* <i className="fa fa-bell-o" /> */}
            <li><a href="/cart"  style={{marginLeft:"-60%"}}><img src={cart}></img></a></li>
            {/* <li className="label label-warning" style={{marginLeft:"-12%", marginTop:"4%"}} >{this.state.notifcart}</li> &nbsp; */}
            {hasil} &nbsp;
        
        {/* <li><a href="/cart"><img src={cart}></img> Cart</a></li> */}




        <a href="/h" type="button" class="btn btn-danger" style={{width:80, color:"white", height:35, marginTop:10, marginRight:10}}>Logout</a>
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
                                    <input type="text" class="form-control" id="pName" name="pName" placeholder="username/email" require/>
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
                                <div>
                                    <h4>Join with :&nbsp; &nbsp;
                                        <a id="fb" href="#" class="fa fa-facebook-official"></a> &nbsp;
                                        <a id="go" href="#" class="fa fa-google"></a>&nbsp;
                                        <a id="twit" href="#" class="fa fa-twitter"></a>&nbsp;
                                    </h4>
                                    <br/>
                                </div>
                            </div>
                            <div class="form-group">
                                <h4>Create Account : </h4><br/>
                                <div>
                                    <input type="email" class="form-control" id="email" name="pName" placeholder="email" require/>
                                </div>
                                <br/>
                                <div>
                                    <input type="number" class="form-control" id="number" name="pName" placeholder="phone number" require/>
                                </div>
                                <br/>

                                <div>
                                    <input type="password" class="form-control" id="password" name="subject" placeholder="password" require/>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary" id="btnSaveIt">Create</button>
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