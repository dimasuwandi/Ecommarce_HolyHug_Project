import React, { Component } from 'react';
import Footer from './footer';
import Navbar from './nav1';
import img1 from './img/fleece/ariannacoral.jpg';
import img2 from './img/fleece/plush.jpg';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Best extends Component {
    state = {
        kode: '',
        nama: '',
        harga: '',
        kategori: '',
        prodesc: '',
        foto_produk: '',
    }


  constructor(){
    super();
    this.state = {
      dataProduk : [],

    }
  }

  componentWillMount(){
    axios.get('http://localhost:8000/Best')
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
            <div>
                {newp}
            </div>
        )
    }
}
export default Best;













