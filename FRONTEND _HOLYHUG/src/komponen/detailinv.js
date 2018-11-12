import React, { Component } from 'react';
import Footer from './footer';
import Navbar from './nav';
import img1 from './img/fleece/ariannacoral.jpg';
import img2 from './img/fleece/plush.jpg';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';

const cookies = new Cookies();

class DetailInv extends Component {
    state = {
        userData: [],
        nama: '',
        username: '',
        email: '',
        number: '',
        address: '',
        password: '',
        total: '',

        dataProduk: [],
        infodelivery: [],
      }
    

            componentDidMount(){

            var invc = this.props.location.state.invoice;
            axios.post('http://localhost:8000/invc/'+ invc)
            .then((ambilData) => {
            this.setState({
                dataProduk: ambilData.data
            })
            })
        }


        UNSAFE_componentWillMount(){

            var invc = this.props.location.state.invoice;
            axios.post('http://localhost:8000/amount', {
                invc:invc
            })
            .then((ambilData) => {
            this.setState({
                total:ambilData.data[0].total,
            })
            })
        }


        componentWillMount(){

            var invc = this.props.location.state.invoice;
            axios.post('http://localhost:8000/info/'+ invc)
            .then((ambilData) => {
            this.setState({
                infodelivery: ambilData.data
            })
            })
        }

        delete(){
            var invc = this.refs.invcid.value;
            var username = this.refs.username.value+"invoice";
            var url1 = 'http://localhost:8000/deleteinvdetail/';
            var url2 = 'http://localhost:8000/deleteinv/';

            axios.post(url1, {
                id: this.refs.invcid.value,
                username: this.refs.username.value+"invoice"
            })
            axios.post(url2, {
                invc: this.refs.invoice.value,
                id: this.refs.invcid.value,
                username: this.refs.username.value+"invoice"
            })
                alert("invoice deleted successfully")
            }


  render() {
    var delivery = 5.00;
    var total = this.state.total + delivery

    const info = this.state.infodelivery
    .map((isi, urutan) => 
        {
            var invc = this.props.location.state.invoice;
            var fullname = isi.fullname
            var email = isi.email
            var phone = isi.phone
            var address = isi.address
            var bank = isi.bank
            
            return <tr style={{textAlign: 'center'}}>
            <td>{invc}</td> 
            <td>{fullname}</td>
            <td>{email}</td> 
            <td>{phone}</td>
            <td>{address}</td> 
            <td>{bank}</td> 
        </tr>
                    
        }
    );

    var invcid = this.props.location.state.itemsid;
    var username = this.props.location.state.username;
    var invoice = this.props.location.state.invoice;
   
    const hasil = this.state.dataProduk
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
            var fullname = isi.bank
            

            return <tr key={urut} style={{textAlign: 'center'}}>
            <td>{urut}</td> 
            <td>{namaProduk}</td> 
            <td>{hargaProduk}</td>
            <td>{kategoriProduk}</td> 
            <td>{qty}</td>
            <td>{produkDesc}</td> 
            <td id="img">{img}</td> 
        </tr>
                    
        }
    );


   



    return (
      <div>
          <Navbar />
          <br/>
          <div className="content-wrapper">
          <input type="hidden" ref="invcid" className="form-control" defaultValue={invcid}   />
          <input type="hidden" ref="username" className="form-control" defaultValue={username}   />
          <input type="hidden" ref="invoice" className="form-control" defaultValue={invoice}   />
            <section className="content">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                            </div>
                            <form role="form" onSubmit={this.updateData} encType="multipart/form-data">
                                <div className="box-body">
                                    <h4>Delivery Info</h4>
                                <table className="table table-striped table-hover table-bordered" style={{width: "90%", marginLeft:"1.5%"}}>
                                    <thead>
                                    <tr style={{backgroundColor: '#CD5C5C'}}>
                                    <td style={{textAlign: 'center'}}>No Invoice</td>
                                    <td style={{textAlign: 'center'}}>Full Name</td>
                                    <td style={{textAlign: 'center'}}>Email</td>
                                    <td style={{textAlign: 'center'}}>Phone Number</td>
                                    <td style={{textAlign: 'center'}}>Address</td>
                                    <td style={{textAlign: 'center'}}>Bank Transfer</td>
                                    </tr>            
                                    </thead>
                                    <tbody>
                                    {info}
                                    </tbody></table>

                                    <h4>Items to be Purchased</h4>
                                <table className="table table-striped table-hover table-bordered" style={{width: "70%", marginLeft:"1.5%"}}>
                                    <thead>
                                    <tr style={{backgroundColor: 'lightBlue'}}>
                                    <td style={{textAlign: 'center'}}>No</td>
                                    <td style={{textAlign: 'center'}}>Product Name</td>
                                    <td style={{textAlign: 'center'}}>Product Price ($)</td>
                                    <td style={{textAlign: 'center'}}>Category</td>
                                    <td style={{textAlign: 'center'}}>Quantity</td>
                                    <td style={{textAlign: 'center'}}>Product Description</td>
                                    <td style={{textAlign: 'center'}}>Photo</td>
                                </tr>            
                                    </thead>
                                    <tbody>
                                    {hasil}
                                    </tbody></table>
                                </div>
                                <div style={{width:"50%"}}>
                                <a class="continue">Price Calculation</a>
                                  <div class="price-details">
                                    <span style={{fontSize:"15px", float:'left'}}>Amount</span>
                                    <span style={{fontSize:"15px", float:'left'}} class="total1">$ {this.state.total}.00</span><br/>
                                    <span style={{fontSize:"15px", float:'left'}}>Discount</span>
                                    <span style={{fontSize:"15px", float:'left'}}>---</span><br/>
                                    <span style={{fontSize:"15px"}}>Delivery Charges</span>
                                    <h3>$ {delivery}.00</h3>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="total_price">
                                    <div class="last_price">
                                        <h4>TOTAL</h4>
                                    </div>
                                    <div><span id="totalharga">$ {total}.00</span></div>
                                    <br/>
                                </div>

                                <div>
                                    <p1 style={{fontSize:"20px"}}>please transfer your payment to :</p1><br/>
                                    <p1>BCA: 0938892321 An: PT HolyHug Nusantara</p1><br/>
                                    <p1>BNI: 0243892321 An: PT HolyHug Nusantara</p1><br/>
                                    <p1>OCBC: 01121892321 An: PT HolyHug Nusantara</p1><br/>
                                    <p1>Maybank: 0732892321 An: PT HolyHug Nusantara</p1><br/>
                                    <p1>Mandiri: 0131892321 An: PT HolyHug Nusantara</p1>
                                </div>
                                <br/>
                                <br/>
                                </div>
                                <a href="/userprofile" type="submit" className="btn btn-success"><i className="fa fa-remove"></i> Cancel</a><br/><br/>
                                <br/> <br/>
                                
                            </form>
                            </div>
                    </div>
                </div>
            </section>
          </div>
          <Footer />
      </div>
    )
  }
}
export default DetailInv;