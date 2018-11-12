import React, { Component } from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import './style.css';
import { Redirect } from 'react-router-dom';
import img from './img/us_military.jpg';


class Dashboard extends Component {

    // state = {
    //     kode: '',
    //     nama: '',
    //     harga: '',
    //     kategori: '',
    //     qty:'',
    //     prodesc: '',
    //     foto_produk: '',
    // }


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

    axios.get('http://localhost:8000/listmember')
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
                var nama = isi.nama;
                var username = isi.username;
                var urut = urutan + 1;
                var email = isi.email;
                var number = isi.number;
                var address = isi.address;
                var photo_profile = isi.photo_profile;
                var gambar = 'http://localhost:8000/tampunganFile/'+ photo_profile;
                var img = <img id="img" src = {gambar} alt=""/>

                return  <tr key={urut} style={{textAlign: 'center'}}>
                            <td>{urut}</td>
                            <td>{nama}</td>
                            <td>{username}</td> 
                            <td>{email}</td> 
                            <td>{number}</td>
                            <td>{address}</td>
                            <td>{img}</td>
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
            <Header />
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Member List</h1>
                </section>
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-primary">
                            <div className="box-header">
                                {/* <h3></h3> */}
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
                            <button type="submit" onClick={() => this.showentries()} className="btn btn-primary" style={{marginTop:"0px", marginLeft:"40px"}}><i className="fa fa-refresh"></i> Refresh</button>
                            </div> 
                             
        <table className="table table-striped table-hover table-bordered" style={{width: "95%", marginLeft:"1.5%"}}>
         <thead>
         <tr style={{backgroundColor: 'lightBlue'}}>
          <td style={{textAlign: 'center'}}>No</td>
          <td style={{textAlign: 'center'}}>Name</td>
          <td style={{textAlign: 'center'}}>Username</td>
          <td style={{textAlign: 'center'}}>Email</td>
          <td style={{textAlign: 'center'}}>Number</td>
          <td style={{textAlign: 'center'}}>Address</td>
          <td style={{textAlign: 'center'}}>Profile Picture</td>
          
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
