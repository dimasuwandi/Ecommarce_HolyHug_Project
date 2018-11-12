import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './style.css';
import Footer from './footer';
import Navbar from './nav';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class DeleteInv extends Component {


state = {
    kode: '',
    nama: '',
    harga: '',
    kategori: '',
    qty: '',
    prodesc: '',
    foto_produk: '',
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
        axios.post(url1, {
            id: this.refs.id.value,
            username: this.refs.username.value,
        }).then((err, result)=>{
            alert("item deleted successfully")
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



  render() {

    var foto = this.state.foto;
    var gambar = 'http://localhost:8000/tampunganFile/'+ foto;
    var img = <img class="imgcart" id="" src = {gambar} alt=""/>
    var id_sblm = this.props.location.state.produkID;

    return (
        <div>
        <Navbar/>
        <br/>    <br/>    <br/>
        <div className="container">
        <form className="form-horizontal" onSubmit={this.updateData} encType="multipart/form-data">
                <fieldset id="containercart">
                    <legend>are you sure you want to delete this item ?</legend>
                    <a href="/cart" type="submit" onClick={() => this.delete()} className="btn btn-success">Yes</a>&nbsp; &nbsp; &nbsp; &nbsp;
                    <a  href="/cart" className="btn btn-primary">No</a>
                            <input ref="username" type="text" type="hidden"  className="form-control" defaultValue={this.state.username}   disabled/>
                            <input type="text" className="form-control" ref="id" defaultValue={id_sblm}/>
                </fieldset>
            </form>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <Footer />
        </div>
    )
  }
}
export default DeleteInv;

