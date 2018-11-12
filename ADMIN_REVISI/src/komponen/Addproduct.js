import React, { Component } from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import './style.css';
import { Redirect } from 'react-router-dom';
import img from './img/us_military.jpg';


class Products extends Component {

    state = {
        kode: '',
        nama: '',
        harga: '',
        kategori: '',
        qty:'',
        prodesc: '',
        foto_produk: '',
        // qty:''
    
    }


  constructor(){
    super();
    this.state = {
      dataProduk : [],
      currentPage:1,
      dataProdukPerPage: 5

    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount(){
    axios.get('http://localhost:8000/data')
    .then((ambilData) => {
      this.setState({
        dataProduk: ambilData.data
      })
    })
  }



gambar = (e) => {
    switch(e.target.name){
      case 'foto_produk': 
      this.setState({
        foto_produk: e.target.files[0],
      })
      break;
    }
  }

      tampungData = (e) => {
        window.location.reload();

                var kode = this.refs.kode.value;
                var nama = this.refs.nama.value;
                var harga= this.refs.harga.value;
                var kategori= this.refs.kategori.value;
                var prodesc= this.refs.prodesc.value;
            
                var url1 = 'http://localhost:8000/data';
            
                var kode1 = kode.length;
                var nama1 = nama.length;
                var harga1 = harga.length;
                var kategori;
                var prodesc1 = prodesc.length
                if (kode1 != 7 || nama1 < 1 || harga1 == 0 || kategori == "Choose..." || prodesc1 < 4 ){
                    alert("FAILED To Post, Please Fill The Form Correctly and Completly ")
                }else{
                    console.log('mulai msk ke dayatampung')
                    var kode = e.kode.value
                    var nama = e.nama.value;
                    var harga = e.harga.value;
                    var kategori = e.kategori.value;
                    var prodesc = e.prodesc.value;
                    var qty = e.qty.value
                    this.setState({
              
                      kode : kode,
                      nama: nama,
                      harga: harga,
                      kategori: kategori,
                      prodesc: prodesc,
                      qty: qty
                      
                    })
                    alert("Succesfully Input Data")
                    window.location.reload();
                }
    }

kirimData = (e) => {
    e.preventDefault()
    let formproduk = new FormData();
    formproduk.append('kode', this.state.kode);
    formproduk.append('nama', this.state.nama);
    formproduk.append('harga', this.state.harga);
    formproduk.append('kategori', this.state.kategori);
    formproduk.append('prodesc', this.state.prodesc);
    formproduk.append('foto_produk', this.state.foto_produk);
    formproduk.append('qty', this.state.qty);

  axios.post('http://localhost:8000/kirimdata', formproduk)
  }



  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/productlist'/>
    }
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/productlist'/>
    }
  }



  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    // currentPage: this.refs.number.value
    });
  }

  showentries() {
    this.setState({
        dataProdukPerPage: this.refs.showentries.value
        // dataProdukPerPage: 1
    });
  }



  render() {

        const { dataProduk, currentPage, dataProdukPerPage } = this.state;

        // Logic for displaying current dataProduk
        const indexOfLastTodo = currentPage * dataProdukPerPage;
        const indexOfFirstTodo = indexOfLastTodo - dataProdukPerPage;
        const currentdataProduk = dataProduk.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderdataProduk = currentdataProduk.map((todo, index) => {
        return <li key={index}>{todo}</li>;
        });


        // const hasil = this.state.dataProduk
        const hasil = currentdataProduk.map((isi, urutan) => {
        // .map((isi, urutan) => 
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
             
                
                return  <tr key={urut} style={{textAlign: 'center'}}>
                            <td>{urut}</td>
                            <td>{produkID}</td>
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
                                            pathname: '/editdata/', 
                                            state: {produkID}
                                        }
                                    } 
                                    className="btn btn-info"><i className="fa fa-pencil"></i> Edit</Link>&nbsp; &nbsp;
                            </td>
                        </tr>
                        
            }
        });

         // Logic for displaying page numbers
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
    
    return (
        <div>
            {this.renderRedirect()}
            <Header />
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add Product</h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
                        <li><a href="#">Add Product</a></li>
                        <li className="active">Data tables</li>
                    </ol>
                </section>
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-primary">
                        <h3 style={{marginLeft:"15px"}}>Product List</h3>
                        <div style={{marginLeft:"15px"}} className="form-group">
                            <p style={{float:"left", marginTop:"7px"}}>Show &nbsp;</p>  
                            <select ref="showentries" class="form-control form-control-lg" style={{width:"80px"}}>
                                    <option onClick={() => this.showentries(this.refs)}>1</option>
                                    <option>3</option>
                                    <option selected>5</option>
                                    <option>10</option>
                                    <option>20</option>
                                </select>
                            <p style={{marginTop:"-27px", marginLeft:"130px"}}>entries</p>
                            {/* <button className="btn btn-primary" onClick={() => this.showentries(this.refs)} style={{marginTop:"0px", marginLeft:"55px"}}><i class="fa fa-refresh"> Refresh</i></button> */}
                            <button type="submit" onClick={() => this.showentries()} className="btn btn-primary" style={{marginTop:"0px", marginLeft:"40px"}}><i className="fa fa-refresh"></i> Refresh</button>
                            </div> 
                            <table className="table table-striped table-hover table-bordered" style={{width: "95%", marginLeft:"1.5%"}}>
                            <thead>
                            <tr style={{backgroundColor: 'lightBlue'}}>
                            <td style={{textAlign: 'center'}}>No</td>
                            <td style={{textAlign: 'center'}}>ID</td>
                            <td style={{textAlign: 'center'}}>Product Code</td>
                            <td style={{textAlign: 'center'}}>Product Name</td>
                            <td style={{textAlign: 'center'}}>Product Price ($)</td>
                            <td style={{textAlign: 'center'}}>Category</td>
                            <td style={{textAlign: 'center'}}>Quantity</td>
                            <td style={{textAlign: 'center'}}>Product Description</td>
                            <td style={{textAlign: 'center'}}>Photo</td>
                            <td style={{textAlign: 'center'}}>Setting</td>
                            
                        </tr>            
                            </thead>
                            <tbody>
                            {hasil}
                            </tbody></table>
                            {/* {renderPageNumbers} */}

                            <ul id="page-numbers">
                                {renderPageNumbers}
                                </ul>

                            <div className="box-header">
                                <h3>Input Data Product</h3>
                            </div>
                            <div className="box-body">
                             

                            <form className="form-horizontal" onSubmit={this.kirimData}>
                                <div className="box-body">
                                        <div className="form-group">
                                            <label>Product Code</label>
                                            <input type="text" ref="kode" className="form-control"  placeholder="Product Code"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input type="text" ref="nama" className="form-control"  placeholder="Product Name" />
                                        </div>
                                        <div className="form-group">
                                            <label>Product Price</label>
                                            <input type="number" ref="harga" className="form-control"  placeholder="Product Price"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Product Quantity</label>
                                            <input type="number" ref="qty" className="form-control" placeholder="Product Quantity" />
                                        </div>
                                        <div className="form-group">
                                        <label>Category</label>
                                        <select ref="kategori" class="form-control form-control-lg">
                                        <option selected>Choose...</option>
                                        <option>Fleece</option>
                                        <option>Catton</option>
                                        <option>Wool</option>
                                        <option>Feather</option>
                                        <option>Synthetic</option>
                                        <option>Flanel</option>
                                        <option>New Product (Fleece)</option>
                                        <option>New Product (Catton)</option>
                                        <option>New Product (Wool)</option>
                                        <option>New Product (Feather)</option>
                                        <option>New Product (Synthetic)</option>
                                        <option>New Product (Flanel)</option>
                                        <option>Best Seller (Fleece)</option>
                                        <option>Best Seller (Catton)</option>
                                        <option>Best Seller (Wool)</option>
                                        <option>Best Seller (Feather)</option>
                                        <option>Best Seller (Synthetic)</option>
                                        <option>Best Seller (Flanel)</option>
                                        </select>
                                        </div> 
                                        <div className="form-group">
                                            <label>Product Description</label>
                                            <input type="text" ref="prodesc" placeholder="Product Description" style={{width: '100%', height: '50px',lineHeight: '18px', border: '1px solid #dddddd',padding: '10px', wordBreak: 'break-word'}}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Foto Produk</label>
                                            <input name="foto_produk" ref="foto_produk" type="file" className="form-control"  onChange={this.gambar}/>
                                        </div>
                                    </div>        
                                    &nbsp; &nbsp;<button onClick={() => this.tampungData(this.refs)} className="btn btn-success">Input Data</button> &nbsp;
                                    </form>
        <br/><br/>

           {/* <div className="form-group">
             <input type="number" ref="showentries" className="form-control" placeholder="Product Quantity" defaultValue="5" />
             <button onClick={() => this.showentries(this.refs)}className="btn btn-success">show</button> &nbsp;
           </div> */}
          
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    )
  }
}
export default Products;
