import React, {Component} from 'react';
import './style.css';
import Footer from './footer';
import Navbar from './nav';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Cart extends Component {

  constructor(){
    super();
    this.state = {
      dataProduk : [],
      total :[]

    }
  }

  state = {
    kode: '',
    nama: '',
    harga: '',
    kategori: '',
    qty: '',
    prodesc: '',
    foto_produk: '',
    total: ''
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

  kurangnotifcart(){
    axios.post('http://localhost:8000/kurangnotifcart', {
  })
  }

  
cart(){
    var url1 = 'http://localhost:8000/carts';
    axios.post(url1, {
        username: this.refs.username.value
    }).then((x)=>{
      console.log(x.data);
      this.setState({dataProduk: x.data})
      })
    }



    sum(){
        var url1 = 'http://localhost:8000/sum';
        axios.post(url1, {
            username: this.refs.username.value
        }).then((x)=>{
          console.log(x.data);
          this.setState({
            total:x.data[0].total,
          }) 
          })
        }
    

    delete(){
      var url1 = 'http://localhost:8000/deletecart/';
      axios.delete(url1).then(()=>{
        console.log("data sukses di delete")
      })
      }


  render() {
      var delivery = 5.00;
      var total = this.state.total + delivery



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
                var id_tbldaftarproduk =  isi.id_tbldaftarproduk;
             
                
                return  <tr style={{textAlign: 'center'}}>
                            <td>{kodeProduk}</td> 
                            <td>{namaProduk}</td> 
                            <td>{hargaProduk}</td>
                            <td>{kategoriProduk}</td> 
                            <td>{qty}</td>
                            <td>{produkDesc}</td> 
                            <td id="img">{img}</td> 
                            <td>
                                <Link to={
                                        {
                                            pathname: '/deletecart/', 
                                            state: {produkID, id_tbldaftarproduk, qty}
                                        }
                                    } 
                                    className="btn btn-danger"> Delete</Link>&nbsp; &nbsp;
                            </td>
                        </tr>
                        
            }
        );
    
    return (
        <div>
            <Navbar />
            <br/><br/><br/>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Shopping Cart</h1><br/>
                </section>
                &nbsp; &nbsp;<button onClick={(event) => { this.cart(); this.sum();}}  className="btn btn-primary"><i className="fa fa-eye"></i> Show Cart</button>
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-primary">
                            <div className="box-header">
                            </div>
                            <div className="box-body">
        <br/><br/>
        
        <table className="table table-striped table-hover table-bordered " style={{width: "55%", marginLeft:"1.5%"}}>
         <thead>
         <tr style={{backgroundColor: 'lightBlue'}}>
          <td style={{textAlign: 'center'}}>Product Code</td>
          <td style={{textAlign: 'center'}}>Product Name</td>
          <td style={{textAlign: 'center'}}>Product Price ($)</td>
          <td style={{textAlign: 'center'}}>Category</td>
          <td style={{textAlign: 'center'}}>Product Quantity</td>
          <td style={{textAlign: 'center'}}>Product Description</td>
          <td style={{textAlign: 'center'}}>Photo</td>
          <td style={{textAlign: 'center'}}>Delete</td>
          
     </tr>            
         </thead>
        <tbody>
          <input ref="username" type="hidden" className="form-control input-md" defaultValue={this.state.username} placeholder="full name" />
          {hasil}
        </tbody></table>
        <div style={{width: "55%", marginLeft:"1.5%"}}>
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
                            <br/>
                            <br/>
                            <div class="clearfix"> </div>
                        </div>
                    </div>
                        &nbsp; &nbsp;<a href="/checkout"  className="btn btn-warning"><i className="fa fa-check"></i> Checkout</a>
          
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <Footer/>
    </div>
    )
  }
}
export default Cart;