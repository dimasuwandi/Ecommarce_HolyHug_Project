import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './style.css';
import Footer from './footer';
import Navbar from './nav';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
const cookies = new Cookies();


class DeleteCart extends Component {

state = {
    kode: '',
    nama: '',
    harga: '',
    kategori: '',
    qty: '',
    prodesc: '',
    foto_produk: '',
    statusRedirect: false,
}


componentDidMount(){
    var iduser = cookies.get('userID');
    axios.post('http://localhost:8000/profileuser', {
      userid: iduser
    }).then((ambilData) => {
      this.setState({
        username:ambilData.data[0].username,
      })
    })
    axios.get()
  }
  
        delete(){
        var username = this.refs.username
        var id = this.refs.id.value
        var url1 = 'http://localhost:8000/deletecart/'+id;
        var url2 = 'http://localhost:8000/data2';
        axios.post(url1, {
            id: this.refs.id.value,
            username: this.refs.username.value,
        }),
        axios.post(url2, {
            qty: this.refs.qty.value,
            id_tbldaftarproduk: this.refs.id_tbldaftarproduk.value
        })
        .then((err, result)=>{
            alert("item deleted successfully")
            this.setState({
              statusRedirect: true
            })
          })
        }


  updateData = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', this.state.foto_produk);
    formData.append('id', this.state.id);
    formData.append('nama', this.state.nama);
    formData.append('harga', this.state.harga);
    formData.append('berat', this.state.berat);
    formData.append('stok', this.state.stok);

    axios.post('http://localhost:8000/ubahData/', formData);
  }


  kurangnotifcart(){
    axios.post('http://localhost:8000/kurangnotifdideletecartjs', {
  })
  }



  render() {
    var foto = this.state.foto;
    var gambar = 'http://localhost:8000/tampunganFile/'+ foto;
    var img = <img class="imgcart" id="" src = {gambar} alt=""/>
    var id_sblm = this.props.location.state.produkID;
    var id_tbldaftarproduk = this.props.location.state.id_tbldaftarproduk;
    var qty = this.props.location.state.qty;


    if(this.state.statusRedirect === true){
      return <Redirect to="/cart" />
    }

    return (
        <div>
        <Navbar/>
        <br/>    <br/>    <br/>
        <div className="container">
        <form className="form-horizontal" onSubmit={this.updateData} encType="multipart/form-data">
                <fieldset id="containercart">
                    <legend>are you sure you want to delete this item ?</legend>
                    <a  type="submit" onClick={(event) => {this.delete(); this.kurangnotifcart();}} className="btn btn-success">Yes</a>&nbsp; &nbsp; &nbsp; &nbsp;
                    <a  href="/cart" className="btn btn-primary">No</a>
                            <input ref="username" type="text" type="hidden"  className="form-control" defaultValue={this.state.username}   disabled/>
                            <input type="hidden" className="form-control" ref="id" defaultValue={id_sblm}/>
                            <input type="hidden" className="form-control" ref="id_tbldaftarproduk" defaultValue={id_tbldaftarproduk}/>
                            <input type="hidden" className="form-control" ref="qty" defaultValue={qty}/>
                </fieldset>
            </form>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <Footer />
        </div>
    )
  }
}
export default DeleteCart;

