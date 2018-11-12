import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import './style.css';
import {Link} from 'react-router-dom';


class Confirm extends Component {
    state = {
        id: '',
        username: '',
        noinvoice: '',
        bukti: '',
        status: '',
        total: '',

        dataProduk: [],
        infodelivery: [],
        dataProduk1: []
       
    }

  componentDidMount(){
    var id_sblm = this.props.location.state.id;
    axios.post('http://localhost:8000/invoiceadmin1',{
    id: id_sblm
    }).then(
        (hasilAmbil) => {
        console.log(hasilAmbil.data);
        this.setState({
            id: hasilAmbil.data[0].id,
            username: hasilAmbil.data[0].username,
            noinvoice: hasilAmbil.data[0].noinvoice,
            bukti: hasilAmbil.data[0].bukti,
            status: hasilAmbil.data[0].status,

            dataProduk : hasilAmbil.data
        });
        
    }
    );
}



componentWillUpdate(){

    var invc = this.props.location.state.noinvoice;
    axios.post('http://localhost:8000/invc/'+ invc)
    .then((ambilData) => {
    this.setState({
        dataProduk1: ambilData.data
    })
    })
}



componentWillMount(){
    var invc = this.props.location.state.noinvoice;
    axios.post('http://localhost:8000/amount', {
        invc:invc
    })
    .then((ambilData) => {
    this.setState({
        // amount: ambilData.data,
        total:ambilData.data[0].total,
    })
    })
}


UNSAFE_componentWillMount(){

    var invc = this.props.location.state.noinvoice;
    axios.post('http://localhost:8000/info/'+ invc)
    .then((ambilData) => {
    this.setState({
        infodelivery: ambilData.data
    })
    })
}



value(){
            var url1 = 'http://localhost:8000/invoiceadmin2';
            axios.post(url1, {
              noinvoice: this.refs.noinvoice.value,
              username: this.refs.username.value+"invoice",
              status: this.refs.status.value,
              bukti: this.refs.status.value,

           
            }).then(()=>{
              alert("Succesfully Confirmation Data")
            })
        }

        value1(){
                    var url1 = 'http://localhost:8000/invoiceadmin3';
                    axios.post(url1, {
                      noinvoice: this.refs.noinvoice.value,
                      status: this.refs.status.value
        
                   
                    }).then(()=>{
                    
              
                    })
                }

  
  render() {
    var gambar = this.state.bukti
    var gambar = 'http://localhost:8000/tampunganFile/'+ gambar;

    var invcid = this.props.location.state.itemsid;
    var username = this.props.location.state.username;
    var invoice = this.props.location.state.noinvoice;


    var delivery = 5.00;
    var total = this.state.total + delivery

    const info = this.state.infodelivery


    .map((isi, urutan) => 
        {
            var invc = this.props.location.state.noinvoice;
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

   
    const hasil = this.state.dataProduk1
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



    var a = new Date()
    var tahun = a.getFullYear()
    var bulan = a.getMonth() + 1
    var tgl = a.getDate()
    var hari = a.getDay()
    var jam = a.getHours()
    var menit = a.getMinutes()
    var detik = a.getSeconds()
    var milidt = a.getMilliseconds()

    var tanggal = tgl + "/" + bulan + "/" + tahun

    return (
      <div>
          <Header />
          <div className="content-wrapper">
            <section className="content">
                <div className="row">
                    <div  className="col-md-10 col-md-offset-1">
                        <div className="box box-primary">
                             <div className="tab-pane" id="settings"></div>
                             <h1 style={{marginLeft:"21px"}}>Confirmation</h1>
                                <div className="box-body">
                                <h4 style={{marginLeft:"1.5%"}}>Delivery Info</h4>
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

                                    &nbsp; <h4 style={{marginLeft:"1.5%"}}>Items to be Purchased</h4>
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
                                
                                <div style={{marginLeft:"3%", width:"30%"}}>
                                <a class="continue">Price Calculation</a>
                                  <div style={{marginLeft:""}} class="price-details">
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
                                    <br/>
                                    <br/>
                                    <div class="clearfix"> </div>
                                </div>
                                </div>

                                    <input type="hidden" className="form-control" ref="id" defaultValue={this.state.id} disabled/>
                                    <input type="hidden" className="form-control" ref="noinvoice" defaultValue={this.state.noinvoice} disabled/>
                                    <input type="hidden" className="form-control" ref="username" defaultValue={this.state.username} disabled/>
                     
            
                                <img style={{marginLeft:"1.5%"}} id ="img2" src = {gambar} alt="proof of payment"/>
                                <br/>
                                <br/>
                                    <br/>
            
                                <div className="form-group">
                                    <label className="col-lg-5 control-label">Status</label>
                                    <div className="col-lg-10">
                                        <select ref="status" class="form-control form-control-lg" defaultValue={this.state.bukti}>
                                                <option selected>Status....</option>
                                                <option>Delivered ({tanggal}) </option>
                                                <option>Please Upload a Clear Photo ({tanggal})</option>
                                                <option>Wrong Transfer ({tanggal})</option>
                                            </select>
                                    </div>
                                </div> 
                                <br/>
                                <br/>
                                <br/>
                                <div style={{marginLeft:"1.5%"}}>
                                <Link to={
                                                {
                                                    // pathname: '/dashboard/', 
                                                    state: {invcid}
                                                }
                                            } 
                                            className="btn btn-success" onClick={(event) => {this.value(); this.value1();}}><i className="fa fa-check-circle">&nbsp;</i>Submit</Link>&nbsp;
                                <a  href="/dashboard" className="btn btn-primary"><i className="fa fa-window-close">&nbsp;</i>Back To Dashboard </a>
                                </div>
                                <br/>
                                <br/>
                             </div>
                    </div>
                </div>
            </section>
          </div>
      </div>
    )
  }
}
export default Confirm;







































