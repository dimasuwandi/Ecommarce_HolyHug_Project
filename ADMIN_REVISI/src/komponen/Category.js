import React, { Component } from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import './style.css';
import { Redirect } from 'react-router-dom';


class Products extends Component {

  constructor(){
    super();
    this.state = {
      dataProduk : [],
      currentPage:1,
      dataProdukPerPage: 5
    }
    this.handleClick = this.handleClick.bind(this);
  }

  fleece(){
    var url1 = 'http://localhost:8000/fleece';
    axios.get(url1).then((x)=>{
      console.log(x.data);
      this.setState({dataProduk: x.data}) 
      })
    }
    wool(){
        var url1 = 'http://localhost:8000/wool';
        axios.get(url1).then((x)=>{
          console.log(x.data);
          this.setState({dataProduk: x.data}) 
          })
        }
        catton(){
            var url1 = 'http://localhost:8000/catton';
            axios.get(url1).then((x)=>{
              console.log(x.data);
              this.setState({dataProduk: x.data}) 
              })
            }
            feather(){
                var url1 = 'http://localhost:8000/feather';
                axios.get(url1).then((x)=>{
                  console.log(x.data);
                  this.setState({dataProduk: x.data}) 
                  })
                }
                synthetic(){
                    var url1 = 'http://localhost:8000/synthetic';
                    axios.get(url1).then((x)=>{
                      console.log(x.data);
                      this.setState({dataProduk: x.data}) 
                      })
                    }
                    flanel(){
                        var url1 = 'http://localhost:8000/flanel';
                        axios.get(url1).then((x)=>{
                          console.log(x.data);
                          this.setState({dataProduk: x.data}) 
                          })
                        }
                        newp(){
                            var url1 = 'http://localhost:8000/new';
                            axios.get(url1).then((x)=>{
                              console.log(x.data);
                              this.setState({dataProduk: x.data})
                              })
                            }
                            best(){
                                var url1 = 'http://localhost:8000/best';
                                axios.get(url1).then((x)=>{
                                  console.log(x.data);
                                  this.setState({dataProduk: x.data}) 
                                  })
                                }

    delete(){
      var url1 = 'http://localhost:8000/delete/';
      axios.delete(url1).then(()=>{
        console.log("data sukses di POST")
      })
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

        const hasil = currentdataProduk.map((isi, urutan) => {
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
                    <h1>Product Category</h1>
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
                            <div className="box-header">
                                <h3>Show The Product List Base On Category</h3>
                            </div>
                            <div className="box-body">
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
                            <button type="submit" onClick={() => this.showentries()} className="btn btn-warning" style={{marginTop:"0px", marginLeft:"40px"}}><i className="fa fa-refresh"></i> Refresh</button>
                            </div> 
                             
        &nbsp; &nbsp;<button onClick={()=>{this.fleece()}} className="btn btn-primary">Fleece</button>
        &nbsp;<button onClick={()=>{this.catton()}} className="btn btn-primary">Catton</button>
        &nbsp;<button onClick={()=>{this.wool()}} className="btn btn-primary">Wool</button>
        &nbsp;<button onClick={()=>{this.feather()}} className="btn btn-primary">Feather</button>
        &nbsp;<button onClick={()=>{this.synthetic()}} className="btn btn-primary">Synthetic</button>
        &nbsp;<button onClick={()=>{this.flanel()}} className="btn btn-primary">Flanel</button>
        &nbsp;<button onClick={()=>{this.newp()}} className="btn btn-success">New Product</button>
        &nbsp;<button onClick={()=>{this.best()}} className="btn btn-danger">Best Seller</button>
        <br/><br/>
        
        <table className="table table-striped table-hover table-bordered" style={{width: "95%", marginLeft:"1.5%"}}>
         <thead>
         <tr style={{backgroundColor: 'lightBlue'}}>
          <td style={{textAlign: 'center'}}>No</td>
          <td style={{textAlign: 'center'}}>ID</td>
          <td style={{textAlign: 'center'}}>Product Code</td>
          <td style={{textAlign: 'center'}}>Product Name</td>
          <td style={{textAlign: 'center'}}>Product Price ($)</td>
          <td style={{textAlign: 'center'}}>Category</td>
          <td style={{textAlign: 'center'}}>Product Quantity</td>
          <td style={{textAlign: 'center'}}>Product Description</td>
          <td style={{textAlign: 'center'}}>Photo</td>
          <td style={{textAlign: 'center'}}>Setting</td>
          
     </tr>            
         </thead>
        <tbody>
          {hasil}
        </tbody></table>

        <ul id="page-numbers">
            {renderPageNumbers}
        </ul>
          
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