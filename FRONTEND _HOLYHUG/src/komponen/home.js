import React, { Component } from 'react';
import Footer from './footer';
import Navbar from './nav';
import img1 from './img/fleece/ariannacoral.jpg';
import img2 from './img/fleece/plush.jpg';
import Best from './bestseller.js'
import axios from 'axios';
import {Link} from 'react-router-dom';

class Home extends Component {

  constructor(){
    super();
    this.state = {
      dataProduk : [],

    }
  }

  componentWillMount(){
    axios.get('http://localhost:8000/New')
    .then((ambilData) => {
      this.setState({
        dataProduk: ambilData.data
      })
    })
  }

    render() {

        const newp = this.state.dataProduk
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
                var produkDesc =  isi.prodesc;

                return <Link to={
                    {
                      pathname: '/productDetail/', 
                      state: {produkID}
                    }
                 } id="kat" href="/ariannacoral"><div id="kiri1" class="col-xs-12 col-sm-6 col-md-4 col-lg-2 kotak1">{img}<span id="newprod">{namaProduk}</span></div> </Link>           
            }
        );
    
        return ( 
            <div id="home">
                <Navbar/>
                <br/>
                <br/>
                    <h3>Category</h3>
                    <hr id="hr"/>
                    <center>
                        <div class="container">
                        <div class="row">
                            <a  href="/fleece"><div id="kanan1" class="col-xs-12 col-sm-6 col-md-4 col-lg-2 kotak"><br/>Fleece<br/><br/><span class="glyphicon glyphicon-tags"></span></div></a>
                            <a  href="/catton"><div id="kiri1" class="col-xs-12 col-sm-6 col-md-4 col-lg-2 kotak"><br/>Catton<br/><br/><span class="glyphicon glyphicon-tags"></span></div></a>
                            <a  href="/wool"><div id="kanan1" class="col-xs-12 col-sm-6 col-md-4 col-lg-2 kotak"><br/>Wool<br/><br/><span class="glyphicon glyphicon-tags"></span></div></a>
                            <a  href="/feather"><div id="kiri1" class="col-xs-12 col-sm-6 col-md-4 col-lg-2 kotak"><br/>Feather<br/><br/><span class="glyphicon glyphicon-tags"></span></div></a>
                            <a  href="/synthetic"><div id="kanan1" class="col-xs-12 col-sm-6 col-md-4 col-lg-2 kotak"><br/>Synthetic<br/><br/><span class="glyphicon glyphicon-tags"></span></div></a>
                            <a  href="/flanel"><div id="kiri1" class="col-xs-12 col-sm-6 col-md-4 col-lg-2 kotak"><br/>Flanel<br/><br/><span class="glyphicon glyphicon-tags"></span></div></a>
                        </div>
                    </div>
                    </center>

                    <br/>
                    <br/>
                    <h3>New Products</h3>
                    <hr id="hr"/>
                    <center>
                        <div class="container">
                        <div class="row">
                            {newp}
                        </div>
                    </div>
                    </center>


                     <br/>
                    <br/>
                    <h3>Best Seller</h3>
                    <hr id="hr"/>
                    <center>
                        <div class="container">
                        <div class="row">
                            {/* {best} */}
                            <Best />
                        </div>
                    </div>
                    </center>
                    <br/>
                <Footer/>
            </div>
        )
    }
}
export default Home;













