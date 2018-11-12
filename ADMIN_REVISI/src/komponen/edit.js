import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class FormEdit extends Component {
  state = {
      id: '',
      nama: '',
      harga: '',
      berat: '',
      stok: '',
      foto_produk: '',
  }

  componentDidMount(){
      var id_sblm = this.props.location.state.produkID;
      axios.get('http://localhost:8000/getdata/'+id_sblm).then(
          (hasilAmbil) => {
          console.log(hasilAmbil.data);
          this.setState({
              id: hasilAmbil.data[0].id,
              foto_produk: hasilAmbil.data[0].foto_produk,
              nama: hasilAmbil.data[0].nama,
              harga: hasilAmbil.data[0].harga,
              berat: hasilAmbil.data[0].berat,
              stok: hasilAmbil.data[0].stok
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

value(){
    var url1 = 'http://localhost:8000/ubahdata';
    axios.post(url1, {
      id: this.refs.id.value,
      nama: this.refs.nama.value,
      harga: this.refs.harga.value,
      berat: this.refs.berat.value,
      stok: this.refs.stok.value
    }).then(()=>{
        alert("data sukses di SUBMIT")
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
    formData.append('id', this.state.id);
    formData.append('nama', this.state.nama);
    formData.append('harga', this.state.harga);
    formData.append('berat', this.state.berat);
    formData.append('stok', this.state.stok);

    axios.post('http://localhost:8000/ubahData/', formData);
  }



  render() {
    return (
        <div className="container">
            <form className="form-horizontal" onSubmit={this.updateData} encType="multipart/form-data">
                <fieldset>
                    <legend>Edit Data</legend>
                    <input type="hidden" className="form-control" ref="id" defaultValue={this.state.id}/>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Nama Produk</label>
                        <div className="col-lg-10">
                            <input ref="nama" type="text" className="form-control" defaultValue={this.state.nama} placeholder="Nama produk ..." />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Harga</label>
                        <div className="col-lg-10">
                            <input ref="harga" type="text" className="form-control"  defaultValue={this.state.harga} placeholder="Harga produk ..." />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Berat</label>
                        <div className="col-lg-10">
                            <input ref="berat" type="text" className="form-control"  defaultValue={this.state.berat} placeholder="Harga produk ..." />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Stok</label>
                        <div className="col-lg-10">
                            <input ref="stok" type="text" className="form-control"  defaultValue={this.state.stok} placeholder="Harga produk ..." />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-2 control-label">Foto Produk</label>
                        <div className="col-lg-10">
                            <input name="fotoproduk" onChange={this.onchange} defaultValue={this.state.foto_produk} type="file" className="form-control"  />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-lg-10 col-lg-offset-2">
                        <Link to={
                                    {
                                        pathname: '/list/' 
                                    }
                                } 
                                className="btn btn-success"><i className="fa fa-remove">&nbsp;</i>Cancel</Link>&nbsp;
                            <button type="reset" className="btn btn-warning"><i className="fa fa-repeat">&nbsp;</i>Reset</button>&nbsp;
                            <button type="submit" onClick={() => this.value(this.refs)} className="btn btn-primary"><i className="fa fa-paper-plane"></i> Submit</button>&nbsp;
                            <Link to={
                                    {
                                        pathname: '/list/' 
                                    }
                                } 
                                className="btn btn-danger" onClick={() => this.delete()}><i className="fa fa-pencil"></i> Delete</Link>&nbsp; &nbsp;
                        </div>
                    </div>

                </fieldset>
            </form>
        </div>
    )
  }
}
export default FormEdit;

