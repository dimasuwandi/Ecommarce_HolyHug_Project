import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Footer from './footer';
import Navbar from './nav';


class Upload extends Component {
    state = {
        foto_produk: '',
        id: '',
        username: '',
        isi: '',

        invoice: '',
        statusinvoice: ''
    }

  componentDidMount(){
    var id_sblm = this.props.location.state.itemsid;
    var username = this.props.location.state.username;
    var invoice = this.props.location.state.invoice;
    axios.post('http://localhost:8000/bukti/'+id_sblm,{
        username: username+"invoice"
    }).then(
        (hasilAmbil) => {
        console.log(hasilAmbil.data);
        this.setState({
            statusinvoice: hasilAmbil.data[0].statusinvoice,

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
    var username = this.props.location.state.username;
    var id_sblm = this.props.location.state.itemsid;
    var username = this.props.location.state.username;
    var invoice = this.props.location.state.invoice;
    var url1 = 'http://localhost:8000/data3/'+id_sblm
    var url2 = 'http://localhost:8000/buktiuntukadmin/'
    axios.post(url1, {
        id: this.refs.id.value,
        username: username+"invoice"
    }),
    axios.post(url2, {
        id: this.refs.id.value,
        invoice: this.refs.invoice.value,
        username: username
    })
        alert("Succesfully Uploaded")
}

updateData = (e) => {
  e.preventDefault();
  let formData = new FormData();

  formData.append('file', this.state.foto_produk);
  formData.append('id', this.props.location.state.itemsid);
  formData.append('username',  this.props.location.state.username+"invoice");
  formData.append('invoice', this.props.location.state.invoice);

  axios.post('http://localhost:8000/data3/', formData);
  axios.post('http://localhost:8000/buktiuntukadmin/', formData);
  
}
  
  render() {
    var id_sblm = this.props.location.state.itemsid;
    var username = this.props.location.state.username;
    var invoice = this.props.location.state.invoice;
    var gambar = this.state.statusinvoice
    var gambar = 'http://localhost:8000/tampunganFile/'+ gambar;
    return (
      <div>
          <Navbar />
          <br/><br/>
        <form role="form" onSubmit={this.updateData} encType="multipart/form-data">
        <input  className="form-control" ref="id" placeholder="" type="hidden" defaultValue={id_sblm} />
        <input className="form-control" ref="username" placeholder="" type="hidden" defaultValue={username} />
        <input  className="form-control" ref="invoice" placeholder="" type="text" defaultValue={invoice} />

        <img id ="img1" src = {gambar} alt="proof of payment"/>
        <br/><br/>
        <div className="form-group">
            <input style={{width:"50%"}} ref="foto_produk" name="foto_produk" onChange={this.onchange}  type="file" className="form-control"  />
        </div>
        
        <button type="submit" onClick={() => this.value(this.refs)} className="btn btn-primary"><i className="fa fa-upload"></i> Upload</button>
</form> 
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <Footer />             
      </div>
    )
  }
}
export default Upload;










