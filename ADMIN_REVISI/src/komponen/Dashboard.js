import React, { Component } from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import './style.css';
import { Redirect } from 'react-router-dom';
import img from './img/us_military.jpg';


class Dashboard extends Component {

    state = {
        kode: '',
        nama: '',
        harga: '',
        kategori: '',
        qty:'',
        prodesc: '',
        foto_produk: '',
    }


  constructor(){
    super();
    this.state = {
      dataProduk : [],
      currentPage:1,
      dataProdukPerPage: 5

    }
    this.handleClick = this.handleClick.bind(this);
  }
  

  componentDidMount(){

    axios.get('http://localhost:8000/daftarinvoice')
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
    // window.location.reload();
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
                var noinvoice = isi.noinvoice;
                var id = isi.id;
                var urut = urutan + 1;
                var username = isi.username;
                var bukti = isi.bukti;
                var status = isi.status;
                var date = isi.date;

                return  <tr key={urut} style={{textAlign: 'center'}}>
                            <td>{urut}</td>
                            <td>{noinvoice}</td>
                            <td>{username}</td> 
                            <td>{bukti}</td> 
                            <td>{status}</td>
                            <td>{date}</td>
                            <td>
                                <Link to={
                                        {
                                            pathname: '/confirm/', 
                                            state: {id, noinvoice, }
                                        }
                                    } 
                                    className="btn btn-info"><i className="fa fa-pencil"></i> Confirmation</Link>&nbsp; &nbsp;
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
                    <h1>Order List</h1>
                </section>
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-primary">
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
                            <button type="submit" onClick={() => this.showentries()} className="btn btn-primary" style={{marginTop:"0px", marginLeft:"40px"}}><i className="fa fa-refresh"></i> Refresh</button>
                            </div> 
                             
        <table className="table table-striped table-hover table-bordered" style={{width: "95%", marginLeft:"1.5%"}}>
         <thead>
         <tr style={{backgroundColor: 'lightBlue'}}>
          <td style={{textAlign: 'center'}}>No</td>
          <td style={{textAlign: 'center'}}>No. Invoice</td>
          <td style={{textAlign: 'center'}}>Username</td>
          <td style={{textAlign: 'center'}}>Proof of Payment </td>
          <td style={{textAlign: 'center'}}>Status</td>
          <td style={{textAlign: 'center'}}>Date</td>
          <td style={{textAlign: 'center'}}>Confirm</td>
          
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
export default Dashboard;
