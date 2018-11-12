import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import {Link} from 'react-router-dom';


class EditForm extends Component {
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
    var id_sblm = this.props.location.state.produkID;
    axios.get('http://localhost:8000/getdata/'+id_sblm).then(
        (hasilAmbil) => {
        console.log(hasilAmbil.data);
        this.setState({
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
      case 'foto_produk':
          this.setState({
              foto_produk: e.target.files[0],
          });
          break;
  }
}


value(){
    var url1 = 'http://localhost:8000/data';
    axios.get(url1).then((x)=>{
      var pjg = x.data

      var kode = this.refs.kode.value;
      var kode1;
      
        var i;
        if (kode !== this.refs.kode.value){
              for(i=0; i<pjg.length; i++){
                if (kode === pjg[i].kode){
                    alert("Please Input Product Code Corectly");
                }
                break;
              }
          }else {
            var kode = this.refs.kode.value;
            var nama = this.refs.nama.value;
            var harga= this.refs.harga.value;
            var kategori= this.refs.kategori.value;
            var prodesc= this.refs.prodesc.value;
        
            var url2 = 'http://localhost:8000/ubahData';
        
            var kode1 = kode.length;
            var nama1 = nama.length;
            var harga1 = harga.length;
            var kategori;
            var prodesc1 = prodesc.length
            if (kode1 != 7 || nama1 < 1 || harga1 == 0 || kategori == "Choose..." || prodesc1 < 4 ){
                alert("FAILED To Post, Please Fill The Form Correctly")
            }else{
            axios.post(url2, {
              id: this.refs.id.value,
              kode: this.refs.kode.value,
              nama: this.refs.nama.value,
              harga: this.refs.harga.value,
              kategori: this.refs.kategori.value,
              qty: this.refs.qty.value,
              prodesc: this.refs.prodesc.value
            }).then(()=>{
              alert("Succesfully Edit Data")
            })

            }
          }
      })
      }




  delete(){
      var id_sblm = this.props.location.state.produkID;
      var url1 = 'http://localhost:8000/delete/'+id_sblm;
      axios.delete(url1).then(()=>{
          alert("data sukses di DELETE")
        })
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
    var id_sblm = this.props.location.state.produkID;
    return (
      <div>
          <Header />
          <div className="content-wrapper">
            <section className="content">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Edit Product Data</h3>
                            </div>
                            <form role="form" onSubmit={this.updateData} encType="multipart/form-data">
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input id="disabledInput" className="form-control" ref="id" placeholder="" type="number" defaultValue={id_sblm} disabled/>
                                    </div> 
                                    <div className="form-group">
                                        <label>Product Code</label>
                                        <input id="disabledInput" className="form-control" ref="kode" placeholder="Product Code" type="text" defaultValue={this.state.kode} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input className="form-control" ref="nama" defaultValue={this.state.nama} placeholder="Product Name" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <label>Product Price</label>
                                        <input className="form-control" ref="harga" placeholder="Product Price" type="text" defaultValue={this.state.harga}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                            <select ref="kategori" class="form-control form-control-lg" defaultValue={this.state.kategori}>
                                                <option selected>Choose...</option>
                                                <option>Fleece</option>
                                                <option>Catton</option>
                                                <option>Wool</option>
                                                <option>Feather</option>
                                                <option>Synthetic</option>
                                                <option>Flanel</option>
                                                <option>New Product (Fleece)</option>
                                                <option>New Product (Catton)</option>
                                                <option>New Product (Wool)</option>
                                                <option>New Product (Feather)</option>
                                                <option>New Product (Synthetic)</option>
                                                <option>New Product (Flanel)</option>
                                                <option>Best Seller (Fleece)</option>
                                                <option>Best Seller (Catton)</option>
                                                <option>Best Seller (Wool)</option>
                                                <option>Best Seller (Feather)</option>
                                                <option>Best Seller (Synthetic)</option>
                                                <option>Best Seller (Flanel)</option>
                                            </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Product Quantity</label>
                                        <input className="form-control" ref="qty" placeholder="Product Quantity" type="number" defaultValue={this.state.qty}/>
                                    </div> 
                                    <div className="form-group">
                                        <label>Product Description</label>
                                        <input type="text" ref="prodesc" className="form-control" defaultValue={this.state.prodesc} style={{width: '100%', height: '50px',lineHeight: '18px', border: '1px solid #dddddd',padding: '10px'}}/>
                                    </div>
                                    <div className="form-group">
                                    <label>Foto Produk</label>
                                        <input ref="foto_produk" name="foto_produk" onChange={this.onchange}  type="file" className="form-control"  />
                                    </div>
                                </div>
                                <div className="form-group">
                                &nbsp;&nbsp;&nbsp;
                                <button type="submit" onClick={() => this.value(this.refs)} className="btn btn-primary"><i className="fa fa-paper-plane"></i> Submit</button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <Link to={
                                                {
                                                    pathname: '/addproduct/' 
                                                }
                                            } 
                                            className="btn btn-success"><i className="fa fa-remove">&nbsp;</i>Cancel</Link>&nbsp;
                                        <button type="reset" className="btn btn-warning"><i className="fa fa-repeat">&nbsp;</i>Reset</button>&nbsp;
                                        <Link to={
                                                {
                                                    pathname: '/categorylist/' 
                                                }
                                            } 
                                            className="btn btn-danger" onClick={() => this.delete()}><i className="fa fa-pencil"></i> Delete</Link>&nbsp; &nbsp;
                                           
                                
                                </div>
                                <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                            </form>
                            </div>
                    </div>
                </div>
            </section>
          </div>
      </div>
    )
  }
}
export default EditForm;

























