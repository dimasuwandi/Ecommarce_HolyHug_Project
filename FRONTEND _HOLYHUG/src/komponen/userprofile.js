import React, { Component } from 'react';
import Footer from './footer';
import Navbar from './nav';
import img1 from './img/fleece/ariannacoral.jpg';
import img2 from './img/fleece/plush.jpg';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';

const cookies = new Cookies();


class UserProfile extends Component {



    // state = {
    //     userData: [],
    //     nama: '',
    //     username: '',
    //     email: '',
    //     number: '',
    //     address: '',
    //     password: '',
    //     photo_profile:'',


    //     invoice: []
    //   }

      constructor(){
        super();
        this.state = {
          invoice : [],
          currentPage:1,
          invoicePerPage: 1,

          userData: [],
          nama: '',
          username: '',
          email: '',
          number: '',
          address: '',
          password: '',
          photo_profile:'',
    
        }
        this.handleClick = this.handleClick.bind(this);
      }
    
      

      componentWillMount(){
        var iduser = cookies.get('userID');
        axios.post('http://localhost:8000/profileuser', {
          userid: iduser
        }).then((ambilData) => {
          this.setState({
            userData: ambilData.data,
            nama: ambilData.data[0].nama,
            username: ambilData.data[0].username,
            email: ambilData.data[0].email,
            number: ambilData.data[0].number,
            address: ambilData.data[0].address,
            password: ambilData.data[0].password
          })
        })
        axios.get()
      }


      onchange = (e) => {
        switch(e.target.name){
            case 'photo_profile':
                this.setState({
                    photo_profile: e.target.files[0],
                });
                break;
        }
      }

      
      showinvoice(){
            var url1 = 'http://localhost:8000/datainvoice';
            axios.post('http://localhost:8000/datainvoice', {
                username1 : this.refs.username.value+"invoice",
            }).then((x)=>{
                console.log(x.data);
                this.setState({invoice: x.data})
                })
            }


        value(){
                    var url2 = 'http://localhost:8000/editprofile';
                    axios.post(url2, {
                      id: this.refs.id.value,
                      nama: this.refs.nama.value,
                      username: this.refs.username.value,
                      email: this.refs.email.value,
                      number: this.refs.number.value,
                      address: this.refs.address.value,
                      password: this.refs.password.value
                    }).then(()=>{
                      alert("Succesfully Edit Profile")
                      window.location.reload();
                    })
        
                    }



    updateData = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', this.state.photo_profile);
        formData.append('nama', this.state.nama);
        formData.append('username', this.state.username);
        formData.append('email', this.state.email);
        formData.append('number', this.state.number);
        formData.append('address', this.state.address);
        formData.append('password', this.state.password);
        
      
        axios.post('http://localhost:8000/editprofile/', formData);
      }


      handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        // currentPage: this.refs.number.value
        });
      }
    
      showentries() {
        this.setState({
            invoicePerPage: this.refs.showentries.value
            // invoicePerPage: 1
        });
      }
      
  render() {
    const { invoice, currentPage, invoicePerPage } = this.state;

    // Logic for displaying current invoice
    const indexOfLastTodo = currentPage * invoicePerPage;
    const indexOfFirstTodo = indexOfLastTodo - invoicePerPage;
    const currentinvoice = invoice.slice(indexOfFirstTodo, indexOfLastTodo);

    const hasil = this.state.userData.map((isi, index) => {
        var photo_profile = isi.photo_profile;
        var gambar = 'http://localhost:8000/tampunganFile/'+ photo_profile;
        var img = <img id="img" src = {gambar} alt="" style={{width:200, height:200}}/>
        var nama = isi.nama;
        var username = isi.username;
        var email = isi.email;
        var number = isi.number;
        var address = isi.address;
        var password = isi.password;


        return <div className="box-body">
                    <p>{img}</p>
                    <strong><i className="fa fa-user-o margin-r-5" /> Username</strong>
                    <h3 className="profile-username text-muted text-center" style={{marginTop:15}}>{username}</h3>
                    <hr />
                    <strong><i className="fa fa-envelope-o margin-r-5" /> Email</strong>
                        <p className="text-muted">
                        {email}
                        </p><hr />
                    <strong><i className="fa fa-phone margin-r-5" /> Phone</strong>
                        <p className="text-muted">{number}</p><hr />
                    <strong><i className="fa fa-map-marker margin-r-5" /> Address</strong>
                        <p className="text-muted">{address}</p><hr />
                </div>
    });

    const edit = this.state.userData.map((isi, index) => {
        var id = isi.id;
        var nama = isi.nama;
        var username = isi.username;
        var email = isi.email;
        var number = isi.number;
        var address = isi.address;
        var password = isi.password;


        return  <form className="form-horizontal" role="form" onSubmit={this.updateData} encType="multipart/form-data">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">ID</label>
                        <div className="col-sm-10">
                            <input type="text" ref="id" className="form-control" id="inputName" value={id} disabled />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Full Name</label>
                        <div className="col-sm-10">
                            <input type="text" ref="nama" className="form-control" defaultValue={this.state.nama} placeholder="full name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Username</label>
                        <div className="col-sm-10">
                            <input type="text" ref="username" defaultValue={this.state.username}className="form-control" id="inputName" placeholder="username" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" ref="email" defaultValue={this.state.email} className="form-control" placeholder="email" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Phone Number</label>
                        <div className="col-sm-10">
                            <input type="number" ref="number" className="form-control" id="inputName" defaultValue={this.state.number} placeholder="Phone Number" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" ref="password" defaultValue={this.state.password} className="form-control" placeholder="password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Address</label>
                        <div className="col-sm-10">
                            <input type="text" ref="address"  defaultValue={this.state.address} className="form-control" placeholder="address" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Upload Photo</label>
                        <div className="col-sm-10">
                        <input ref="photo_profile" name="photo_profile" onChange={this.onchange}  type="file" className="form-control"  />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" onClick={() => this.value(this.refs)} className="btn btn-primary"><i className="fa fa-save"></i> Save</button>
                        </div>
                    </div>
                </form>
    });



    const un = this.state.invoice
    .map((isi, urutan) => 
        {
            var foto_produk = isi.foto_produk;
            var gambar = 'http://localhost:8000/tampunganFile/'+ foto_produk;
            var img = <img id="img" src = {gambar} alt=""/>
            var urut = urutan + 1;
            var produkID = isi.id;
            var kodeProduk = isi.kode;
            var namaProduk = isi.nama;
            var hargaProduk = isi.harga;
            var kategoriProduk = isi.kategori;
            var qty = isi.qty;
            var produkDesc =  isi.prodesc;
         
            
            return  <tr key={urut} style={{textAlign: 'center'}}>
                        <td>{urut}</td>
                        <td>{produkID}</td>
                        <td>{kodeProduk}</td> 
                        <td>{namaProduk}</td> 
                        <td>{hargaProduk}</td>
                        <td>{kategoriProduk}</td> 
                        <td>{qty}</td>
                        <td>{produkDesc}</td> 
                        <td id="img">{img}</td> 
                    </tr>
                    
        }
    );


    const purchase = currentinvoice.map((isi, index) => {
        var username = this.state.username;
        var invoice = isi.invoice;
        var itemsid = isi.id;
        var status = isi.statusinvoice
        var date = isi.Date;

        if (status == null){
            status = "unpaid"
        }else {
            status = status
        }



        return      <tr key={index} style={{textAlign: 'center'}}>
                    <td>{index+1}</td>
                        <td>{invoice}</td>
                        <td>{status}</td>
                        <td>{date}</td>
                        <td>
                            <Link to={
                                    {
                                        pathname: '/detailinv/', 
                                        state: {invoice, itemsid, username},
                                        
                                    }
                                } 
                                className="btn btn-info"><i className="fa fa-info"></i> Detail</Link>&nbsp; &nbsp;
                        </td>
                        <td>
                            <Link to={
                                    {
                                        pathname: '/proofofpayment/', 
                                        state: {invoice, itemsid, username},   
                                    }
                                } 
                                className="btn btn-success"><i className="fa fa-upload"></i> Upload</Link>&nbsp; &nbsp;
                        </td>
                    </tr>
    });


            // Logic for displaying page numbers
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(invoice.length / invoicePerPage); i++) {
            pageNumbers.push(i);
            }
    
            const renderPageNumbers = pageNumbers.map(number => {
               return (
                   <ul class="pagination">
                   <li
                   // key={number}
                   // id={number}
                   // onClick={this.handleClick}
                   >
                   <a href="#" id={number} onClick={this.handleClick}>{number}</a> &nbsp;
                   </li>
                   </ul>
               );
               });

    return (
      <div>
        <Navbar/>
        <br/>
        <br/>
        <input type="hidden" ref="username" defaultValue={this.state.username}className="form-control" id="inputName" placeholder="username" />
        <div className="content-wrapper">
            <div className="container">
                <section className="content" style={{minHeight: '700px'}}>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="box box-primary">
                            {hasil}
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="nav-tabs-custom">
                            <ul className="nav nav-tabs">
                            <li className="active"><a href="#settings" data-toggle="tab">Edit Profile</a></li>
                            <li onClick={() => this.showinvoice()}><a href="#activity" data-toggle="tab">Invoice History</a></li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane" id="activity">
                                    <div className="table-responsive">
                                    <br/><br/>
                                        <table className="table table-striped table-hover table-bordered" style={{width: "70%", marginLeft:"1.5%"}}>
                                    <thead>
                                    <tr style={{backgroundColor: 'lightBlue'}}>
                                    <td style={{textAlign: 'center'}}>No. </td>
                                    <td style={{textAlign: 'center'}}>No Invoice</td>
                                    <td style={{textAlign: 'center'}}>Status / Last Confirmation Date</td>
                                    <td style={{textAlign: 'center'}}>Invoice date</td>
                                    <td style={{textAlign: 'center'}}>Detail Invoice</td>
                                    <td style={{textAlign: 'center'}}>Upload Proof of Payment</td>
                                </tr>            
                                    </thead>
                                    <tbody>
                                    {purchase}
                                    </tbody></table>
                                    <ul id="page-numbers">
                                        {renderPageNumbers}
                                    </ul>
                                        </div>
                                </div>
                                <div className="active tab-pane" id="settings">
                                <br/><br/>
                                        {edit}
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default UserProfile;

