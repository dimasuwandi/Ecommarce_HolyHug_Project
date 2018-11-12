import React, {Component} from 'react';
import './style.css';
import img1 from './img/fleece/ariannacoral.jpg';
import img2 from './img/fleece/plush.jpg'
import cart from './img/cart-1.png'
import Footer from './footer';
import Navbar from './nav';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Synthetic extends Component {
    constructor(){
        super();
        this.state = {
          dataProduk : [],
    
        }
      }
    
      componentWillMount(){
        axios.get('http://localhost:8000/new')
        .then((ambilData) => {
          this.setState({
            dataProduk: ambilData.data
          })
        })
      }
  render(){

    const hasil = this.state.dataProduk
    .map((isi, urutan) => 
        {
            var foto_produk = isi.foto_produk;
            var gambar = 'http://localhost:8000/tampunganFile/'+ foto_produk;
            var img = <img class="btm" id="" src = {gambar} alt=""/>
            var urut = urutan + 1;
            var produkID = isi.id;
            var kodeProduk = isi.kode;
            var namaProduk = isi.nama;
            var hargaProduk = isi.harga;
            var kategoriProduk = isi.kategori;
            var produkDesc =  isi.prodesc;
         
        return <div class="col-md-4 bottom-cd">
                    <div class="product-at">
                        <Link to={
                            {   
                                pathname: '/productDetail1/', 
                                state: {produkID}
                            }
                            } id="kat" id="kiri1">{img}</Link>&nbsp; &nbsp;
                    </div><br/>
                        <p  class="tun "><span id="kiri1">{namaProduk}</span><br/><span id="kanan1">{kategoriProduk}</span></p>
                    <div class="ca-rt " id="kiri1">
                        <a href="# " class="item_add ">
                        <p class="number item_price "><i> </i>$ {hargaProduk}</p>
                        </a>
                    </div>
                    <br/> <br/> <br/>
                </div>
    
        }
    );
    return(
        <div>
                <div class="bottom-product">
                <div class="row">
                    <br/><br/><br/>
                    {hasil}
                    <br/>
                    </div>
                </div>
            </div>

         

    )
  }
}
export default Synthetic;