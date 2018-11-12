import React, {Component} from 'react';
import './style.css';
import img1 from './img/fleece/ariannacoral.jpg';
import img2 from './img/fleece/plush.jpg'
import cart from './img/cart-1.png'
import Footer from './footer';
import Navbar from './nav';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Catton extends Component {
  constructor(){
    super();
    this.state = {
      dataProduk : [],
      currentPage:1,
      dataProdukPerPage: 6
    }
    this.handleClick = this.handleClick.bind(this);
  }
    
      componentWillMount(){
        axios.get('http://localhost:8000/catton')
        .then((ambilData) => {
          this.setState({
            dataProduk: ambilData.data
          })
        })
      }

      newest(){
        axios.get('http://localhost:8000/catton')
        .then((ambilData) => {
          this.setState({
            dataProduk: ambilData.data
          })
        })
      }
      oldest(){
        axios.get('http://localhost:8000/cattonNewest')
        .then((ambilData) => {
          this.setState({
            dataProduk: ambilData.data
          })
        })
      }
      cheap(){
        axios.get('http://localhost:8000/cattonCheap')
        .then((ambilData) => {
          this.setState({
            dataProduk: ambilData.data
          })
        })
      }
      expensive(){
        axios.get('http://localhost:8000/cattonExpensive')
        .then((ambilData) => {
          this.setState({
            dataProduk: ambilData.data
          })
        })
      }

      handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        // currentPage: this.refs.number.value
        });
      }


  render(){
    const { dataProduk, currentPage, dataProdukPerPage } = this.state;

    // Logic for displaying current dataProduk
    const indexOfLastTodo = currentPage * dataProdukPerPage;
    const indexOfFirstTodo = indexOfLastTodo - dataProdukPerPage;
    const currentdataProduk = dataProduk.slice(indexOfFirstTodo, indexOfLastTodo);

    const hasil = currentdataProduk.map((isi, urutan) => {
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
            pathname: '/productDetail/', 
            state: {produkID}
          }
         } id="kat" id="kiri1">{img}</Link>&nbsp; &nbsp;
        </div><br/>
            <p  class="tun "><h3 id="kiri1">{namaProduk}</h3><span id="kanan1">{kategoriProduk}</span></p>
        <div class="ca-rt " id="kiri1">
            <a href="# " class="item_add ">
            <p class="number item_price "><i> </i>$ {hargaProduk}</p>
            </a>
        </div>
        <br/> <br/> <br/>
    </div>
        }
      });


      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(dataProduk.length / dataProdukPerPage); i++) {
      pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
         return (
             <ul class="pagination">
             <li
             // key={number}
             // id={number}
             // onClick={this.handleClick}
             >
             <a href="#" id={number} onClick={this.handleClick}>{number}</a> &nbsp;
             </li>
             </ul>
         );
         });


    return(
        <div>
          <Navbar/>
          <br/>
          <br/>
           <ul class="nav nav-tabs">
            <li><a id="headercategory" data-toggle="tab-header">CATEGORY</a></li>
            <li><a href="/allproduct">All Products</a></li>
            <li><a href="/fleece">Fleece</a></li>
            <li><a href="/catton">Catton</a></li>
            <li><a href="/wool">Wool</a></li>
            <li><a href="/feather">Feather</a></li>
            <li><a href="/synthetic">Synthetic</a></li>
            <li><a href="/flanel">Flanel</a></li>
            <li><span></span></li>
            <li><a></a></li>
            <li><a></a></li>

            <li class="dropdown" style={{float:"canter"}}>
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Sort By <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#" onClick={() => this.newest()} >Newest to Oldest</a></li>
                <li><a href="#" onClick={() => this.oldest()} >Oldest to Newest</a></li>
                <li><a href="#" onClick={() => this.cheap()} >Price Low to High</a></li>
                <li><a href="#" onClick={() => this.expensive()} >Price High to Low</a></li>                                                
              </ul>
            </li>
         </ul>
         <br/>
         <br/>
                <div class="bottom-product">
                <div class="row">
                    <h1 id="kanan1">CATTON</h1>
                    <br/><br/><br/>
                    {hasil}
                    <br/>
                    </div>
                </div>

        <ul id="page-numbers">
            {renderPageNumbers}
        </ul>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Footer/>
            </div>
    )
  }
}
export default Catton;