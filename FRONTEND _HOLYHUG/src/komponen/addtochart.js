import React, {Component} from 'react';
import './style.css';
import Footer from './footer';
import Navbar from './nav';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';


const cookies = new Cookies();



class Addtochart extends Component {
    state = {
        kode: '',
        nama: '',
        harga: '',
        kategori: '',
        qty: '',
        prodesc: '',
        foto_produk: '',
    }


    componentWillMount(){
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

componentDidMount(){
    var id_sblm = this.props.location.state.produkID;
    axios.get('http://localhost:8000/getdata/'+id_sblm).then(
        (hasilAmbil) => {
        console.log(hasilAmbil.data);
        this.setState({
            id: hasilAmbil.data[0].id,
            kode: hasilAmbil.data[0].kode,
            foto: hasilAmbil.data[0].foto_produk,
            nama: hasilAmbil.data[0].nama,
            harga: hasilAmbil.data[0].harga,
            kategori: hasilAmbil.data[0].kategori,
            qty: hasilAmbil.data[0].qty,
            prodesc: hasilAmbil.data[0].prodesc,
        });
    }
    );
}

  
  onchange = (e) => {
    switch(e.target.name){
        case 'fotoproduk':
            this.setState({
                foto_produk: e.target.files[0],
            });
            break;
    }
  }



//   notifcart(){
//     axios.post('http://localhost:8000/notifcart', {
//   })
//   }


  
value(){
    var qty = this.refs.qty.value
    var stok = this.state.qty
    // var stok = 10;
    var username= this.refs.username.value
    var pjg = username.length
    var id = this.refs.id.value

    if (qty > stok) {
        alert('Maximum purchase is '+ stok+" pieces")
    } else if (qty < stok) {

    var url1 = 'http://localhost:8000/addtochart';
    var url2 = 'http://localhost:8000/data1';
    axios.post(url1, {
        id: this.refs.id.value,
        kode: this.refs.kode.value,
        nama: this.refs.nama.value,
        harga: this.refs.harga.value,
        kategori: this.refs.kategori.value,
        qty: this.refs.qty.value,
        prodesc: this.refs.prodesc.value,
        username: this.refs.username.value,
        foto: this.refs.foto_produk.value
    }),
    axios.post(url2, {
        qty: this.refs.qty.value,
        id: this.refs.id.value
    }),
    axios.post('http://localhost:8000/notifcart')
    .then(()=>{
        alert("Success add to cart!")
    })
    }
    }

  updateData = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', this.state.foto_produk);
    formData.append('kode', this.state.kode);
    formData.append('nama', this.state.nama);
    formData.append('harga', this.state.harga);
    formData.append('kategori', this.state.kategori);
    formData.append('qty', this.state.qty);
    formData.append('prodesc', this.state.prodesc);

    axios.post('http://localhost:8000/ubahData/', formData);
  }



  render() {
   


    var foto = this.state.foto;
    var gambar = 'http://localhost:8000/tampunganFile/'+ foto;
    var img = <img class="imgcart" id="" src = {gambar} alt=""/>

    return (
        <div>
            <Navbar />
            <br/><br/>
        <div className="container">
        <form className="form-horizontal" onSubmit={this.updateData} encType="multipart/form-data">
                <fieldset id="containercart">
                    <legend>Checking Product</legend>
                        <input ref="username" type="hidden" className="form-control" defaultValue={this.state.username} disabled/>
                        <input type="hidden" className="form-control" ref="id" defaultValue={this.state.id} disabled/>
                     
                    <div className="form-group">
                        <label className="col-lg-2 control-label">Product Code</label>
                        <div className="col-lg-10">
                        <input type="text" className="form-control" ref="kode" defaultValue={this.state.kode} disabled/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Product Name</label>
                        <div className="col-lg-10">
                            <input ref="nama" type="text" className="form-control" defaultValue={this.state.nama}  disabled/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Product Price</label>
                        <div className="col-lg-10">
                            <input ref="harga" type="text" className="form-control"  defaultValue={this.state.harga}  disabled/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Category</label>
                        <div className="col-lg-10">
                            <input ref="kategori" type="text" className="form-control"  defaultValue={this.state.kategori} disabled/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Product Description</label>
                        <div className="col-lg-10">
                            <input ref="prodesc" type="text" className="form-control"  defaultValue={this.state.prodesc} disabled/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label">Stock</label>
                        <div className="col-lg-10">
                        <input type="text" className="form-control" ref="s" defaultValue={this.state.qty} disabled/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label">Product Photo</label>
                        <div className="col-lg-10">
                        <input type="hidden" ref="foto_produk" className="form-control input-sm" defaultValue={foto}/>
                        <div class="thumb-image"> {img} </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label">Quantity</label>
                        <div className="col-lg-10">
                        <input type="number" ref="qty" className="form-control input-sm" min={1} defaultValue={1} placeholder="quantity" />
                        </div>
                    </div>
                    <button type="submit" onClick={() => {this.value(this.refs) }} className="btn btn-success"><i className="fa fa-paper-plane"></i> Add to Cart</button>&nbsp; &nbsp; &nbsp; &nbsp;
                    <a  href="/home" className="btn btn-primary"><i className="fa fa-shopping-basket">&nbsp;</i>Continue Shopping </a>
                </fieldset>
            </form>
        </div>
        <br/> <br/> <br/>  <br/> <br/> <br/> <br/> <br/>  <br/> <br/>
         <Footer />
        </div>
    )
  }
}
export default Addtochart;







