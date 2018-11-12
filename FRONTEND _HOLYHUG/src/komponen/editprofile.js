import React, { Component } from 'react';
import Footer from './footer';
import Navbar from './nav';
import img1 from './img/fleece/ariannacoral.jpg';
import img2 from './img/fleece/plush.jpg';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class EditForm extends Component {
    state = {
        userData: [],
        nama: '',
        username: '',
        email: '',
        number: '',
        address: '',
        password: '',
      }
    

      componentDidMount(){
        var iduser = cookies.get('userID');
        axios.post('http://localhost:8000/profileuser', {
          userid: iduser
        }).then((hasilAmbil) => {
          this.setState({
            id: hasilAmbil.data[0].id,
            nama: hasilAmbil.data[0].nama,
            username: hasilAmbil.data[0].username,
            email: hasilAmbil.data[0].email,
            number: hasilAmbil.data[0].number,
            address: hasilAmbil.data[0].address,
            password: hasilAmbil.data[0].password
          })
        })
        axios.get()
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
        })

        }


        updateData = (e) => {
            e.preventDefault();
            let formData = new FormData();
            formData.append('nama', this.state.nama);
            formData.append('username', this.state.username);
            formData.append('email', this.state.email);
            formData.append('number', this.state.number);
            formData.append('address', this.state.address);
            formData.append('password', this.state.password);
            
            axios.post('http://localhost:8000/editprofile/', formData);
          }
  
  render() {
    return (
      <div>
          <Navbar />
          <div className="content-wrapper">
            <section className="content">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Edit Product Dat</h3>
                            </div>
                            <form role="form" onSubmit={this.updateData} encType="multipart/form-data">
                                <div className="box-body">
                                <div className="form-group">
                                        <label>ID</label>
                                        <input className="form-control" ref="id" defaultValue={this.state.id} placeholder="ID" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input className="form-control" ref="nama" defaultValue={this.state.nama} placeholder="Name" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input className="form-control" ref="username" placeholder="Product Price" type="text" defaultValue={this.state.username}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" ref="email" className="form-control" defaultValue={this.state.email} style={{width: '100%', height: '50px',lineHeight: '18px', border: '1px solid #dddddd',padding: '10px'}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Number</label>
                                        <input type="text" ref="number" className="form-control" defaultValue={this.state.number} style={{width: '100%', height: '50px',lineHeight: '18px', border: '1px solid #dddddd',padding: '10px'}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input type="text" ref="address" className="form-control" defaultValue={this.state.address} style={{width: '100%', height: '50px',lineHeight: '18px', border: '1px solid #dddddd',padding: '10px'}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="text" ref="password" className="form-control" defaultValue={this.state.password} style={{width: '100%', height: '50px',lineHeight: '18px', border: '1px solid #dddddd',padding: '10px'}}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                &nbsp;&nbsp;&nbsp;
                                <button type="submit" onClick={() => this.value(this.refs)} className="btn btn-primary"><i className="fa fa-paper-plane"></i> Submit</button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
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