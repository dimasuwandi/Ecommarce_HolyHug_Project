import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Header extends Component {

    state = {
        // notifjumlah: '1',
    }

    constructor(){
        super();
        this.state = {
          dataNotif : [],
          notifjumlah : '',
          invoice: '',
          member: ''
        }
      }
      
    
      componentDidMount(){
        axios.post('http://localhost:8000/notifjumlah')
        .then((ambilData) => {
          this.setState({
            dataNotif: ambilData.data
            // notifjumlah: ambilData.data[0].notifjumlah,
          })
        })
      }

      componentWillMount(){
        axios.post('http://localhost:8000/jumlahnotifmember')
        .then((ambilData) => {
          this.setState({
            // dataProduk: ambilData.data
            // notifjumlah: ambilData.data[0].notifjumlah,
            // invoice: ambilData.data[0].invoice,
            member: ambilData.data[0].member,
          })
        })
      }

      UNSAFE_componentWillMount(){
        axios.post('http://localhost:8000/jumlahnotifinvoice')
        .then((ambilData) => {
          this.setState({
            // dataProduk: ambilData.data
            // notifjumlah: ambilData.data[0].notifjumlah,
            invoice: ambilData.data[0].invoice,
            // member: ambilData.data[0].member,
          })
        })
      }

      kurangnotifmember(){
        axios.post('http://localhost:8000/kurangnotifmember', {
      })
      }

      kurangnotifinvoice(){
        axios.post('http://localhost:8000/kurangnotifinvoice', {
      })
      }






  render() {


    const hasil = this.state.dataNotif
          .map((isi, urutan) => 
          {
              var notifcart = isi.notifjumlah;
                if(notifcart == 0){
                    var notif = null
                }else{
                    var notif = notifcart
                }
      
                           return <span className="label label-warning">{notif}</span>
                              }
                          );


                          
    return (
        <div>
            <header className="main-header">
                <a href="index.html" className="logo">
                    <span className="logo-mini">
                        <b>HolyHug</b>
                    </span>
                    <span className="logo-lg">
                        <b id="brand">HolyHug</b>
                    </span>
                </a>
                <nav className="navbar navbar-static-top" id="navBar">
                    <a className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </a>
                    <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className="dropdown notifications-menu">
                            <a className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-bell-o" />
                                {/* <span className="label label-warning">{this.state.notifjumlah}</span> */}
                                {hasil}
                            </a>
                            <ul className="dropdown-menu">
                                <li className="header">You have {this.state.notifjumlah} notifications</li>
                                    <li>
                                    <ul className="menu">
                                        <li>
                                            <a href="/listmember" onClick={() => this.kurangnotifmember()}>
                                                <i className="fa fa-users text-aqua" /> {this.state.member} new members joined
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/dashboard" onClick={() => this.kurangnotifinvoice()}>
                                                <i className="fa fa-shopping-cart text-green" /> {this.state.invoice} new invoice
                                            </a>
                                        </li>
                                    </ul>
                                </li> 
                            </ul>
                        </li>
                        <li className="dropdown user user-menu">
                            <a className="dropdown-toggle" data-toggle="dropdown">
                                <img src="dist/img/dimas.jpg" className="user-image" alt="User Image" />
                                <span className="hidden-xs">Muhammad Dimas</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="user-header">
                                    <img src="dist/img/dimas.jpg" className="img-circle" alt="User Image" />
                                    <p>
                                        Muhammad Dimas
                                        {/* <small>Member since Nov. 2012</small> */}
                                    </p>
                                </li>
                                <li className="user-footer">
                                    <div className="text-center">
                                        <a href="profile.html" className="btn btn-primary btn-flat" style={{marginTop: 10}}>
                                        <i className="fa fa-black-tie" /> Profile</a>&nbsp;
                                        <Link to="/" className="btn btn-danger btn-flat" style={{marginTop: 10}}>
                                        <i className="fa fa-sign-out" /> Sign out</Link>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    </div>
                </nav>
            </header>
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="dist/img/dimas.jpg" className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Muhammad Dimas</p>
                            <a>
                            <i className="fa fa-circle text-success" /> Online</a>
                        </div>
                    </div>
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                            <input name="q" className="form-control" placeholder="Search..." type="text" />
                            <span className="input-group-btn">
                            <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                                <i className="fa fa-search" />
                            </button>
                            </span>
                        </div>
                    </form>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>
                        <li>
                            <Link to="/dashboard">
                                <i className="fa fa-dashboard" />
                                <span>Order List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/listmember">
                                <i className="fa fa-users" />
                                <span>Member List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/addproduct">
                                <i className="fa fa-cubes" />
                                <span>Add Product</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/categorylist">
                                <i className="fa fa-tags" />
                                <span>Category List</span>
                            </Link>
                        </li>
                    </ul>
                </section>
            </aside>
        </div>
    )
  }
}
export default Header;
