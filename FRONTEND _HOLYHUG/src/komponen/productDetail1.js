import React, {Component} from 'react';
import './style.css';
import img1 from './img/fleece/ariannacoral.jpg';
import img2 from './img/fleece/plush.jpg'
import cart from './img/cart-1.png'
import Footer from './footer';
import Navbar from './nav';
import axios from 'axios';
import New from './newprod.js'
import {Link} from 'react-router-dom';

class ProductDetail extends Component {
    state = {
        kode: '',
        nama: '',
        harga: '',
        kategori: '',
        prodesc: '',
        foto_produk: '',
        qty: ''
    }


    constructor(){
        super();
        this.state = {
          dataProduk : [],
    
        }
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
            prodesc: hasilAmbil.data[0].prodesc,
            qty: hasilAmbil.data[0].qty,
        });
        
    }
    );
}

componentWillMount(){
    var id_sblm = this.props.location.state.produkID;
    axios.get('http://localhost:8000/getdata/'+id_sblm)
    .then((ambilData) => {
      this.setState({
        dataProduk: ambilData.data
      })
    })
  }


  render(){

    var foto = this.state.foto;
    var gambar = 'http://localhost:8000/tampunganFile/'+ foto;
    var img = <img class="imgdetail" id="" src = {gambar} alt=""/>

    const hasil = this.state.dataProduk
    .map((isi, urutan) => 
    {
        var produkID = isi.id;

                     return <div class="container">
                     <div id="imgposisi" class="col-md-7">
                            <div class="thumb-image" style={{marginLeft:"-2%"}}> {img} </div>
                         </div>
                         <div class="col-md-5" style={{textAlign:"left"}}>
                         {hasil}
                             <div>
                                 <h1>{this.state.nama}</h1>
                                 <hr id="hr1"/>
                                 <h4>{this.state.kategori}</h4>
                                 <h5>$ {this.state.harga}</h5>
                                 <p>{this.state.prodesc}</p>
                                 <p1>Stok : <input id="disabledInput" type="text" className="form-control" defaultValue={this.state.qty} style={{width:"100px"}} disabled/></p1>
                                 <br/>
                                 <br/>
                                 <td>
                                <Link to={
                                        {
                                            pathname: '/addtocart/', 
                                            state: {produkID}
                                        }
                                    } 
                                    className="btn btn-info"><img src={cart}/> ADD TO CART</Link>&nbsp; &nbsp;
                            </td>
                             </div>
                         </div>
                         </div>
                        }
                    );


    return(
        <div>
          <Navbar/>
          <br/><br/>
    {/* -------------------------------------------------------------------------------------------- */}
          <div class="product">
                {hasil}
          </div>

        {/* ------------------------------------------------------------- */}

         <br/>
        <br/>
        <div class=" bottom-product" >
            <New />
                </div>
                <Footer/>
            </div>

         

    )
  }
}
export default ProductDetail;