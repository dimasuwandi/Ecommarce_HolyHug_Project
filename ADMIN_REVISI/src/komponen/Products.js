import React, { Component } from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import './style.css';
import { Redirect } from 'react-router-dom';


var componentConfig = {
 iconFiletypes: ['.pdf', '.jpg', '.png', '.gif', '.jpeg'],
 showFiletypeIcon: true,
 postUrl: '/uploadHandler'
}

class Products extends Component {
  state = {
      dataproduk: [],
      categorylist: [],
      subcategorylist: [],
      redirect: false,
      quantity: [],
  }

  constructor(){
    super();5
    this.state = {
      dataProduk : [],
    }
  }


  onchange = (e) => {
    switch(e.target.name){
        case 'foto_produk':
            this.setState({
                foto_produk: e.target.files[0],
            });
            break;
    }
  }

  updateData = (e) => {
  e.preventDefault();
  let formData = new FormData();
  formData.append('file', this.state.foto_produk);
  }

  ambil(){
    var url1 = 'http://localhost:8000/data';
    axios.get(url1).then((x)=>{
      console.log(x.data);
      this.setState({dataProduk: x.data}) 
      })
    }



  kirim(){
    var url1 = 'http://localhost:8000/data';
    axios.get(url1).then((x)=>{
      var pjg = x.data

      var kode = this.refs.kode.value;
      
        var i;
      for(i = 0; i<pjg.length; i++){
          if (kode === pjg[i].kode){
              alert("Please Input Product Code Corectly");
              break;
          }else if (i === pjg.length - 1){
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
                alert("FAILED To Post, Please Fill The Form Correctly")
            }else{
            axios.post(url1, {
              kode: this.refs.kode.value,
              nama: this.refs.nama.value,
              harga: this.refs.harga.value,
              kategori: this.refs.kategori.value,
              prodesc: this.refs.prodesc.value
            }).then(()=>{
              alert("Succesfully Enterd Data")
            })
            break;
            }
          }
      }
      })
}



    delete(){
      // var id_sblm = this.props.location.state.produkID;
      // var produkID = isi.id;
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
  render() {
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
                var produkDesc =  isi.prodesc;
             
                
    
                // kalo pake &nbps akan keluar eror di console "nodes cannot appear as a child of <tr>. Make sure you don't have any "
                return  <tr key={urut} style={{textAlign: 'center'}}>
                            <td>{urut}</td>
                            <td>{produkID}</td>
                            <td>{kodeProduk}</td> 
                            {/* <td>{urut}</td>  */}
                            <td>{namaProduk}</td> 
                            <td>{hargaProduk}</td>
                            <td>{kategoriProduk}</td> 
                            <td>{produkDesc}</td> 
                            {/* <td><a href={gambar}>{foto_produk}</a></td>  */}
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
        );
    
    return (
        <div>
            {this.renderRedirect()}
            <Header />
            <div className="content-wrapper">
            {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>Add Product</h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
                        <li><a href="#">Add Product</a></li>
                        <li className="active">Data tables</li>
                    </ol>
                </section>

            {/* Main content */}
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3>Input Data Product</h3>
                            </div>
                            {/* /.box-header */}
                            <div className="box-body">
                             

        {/* --------------------------------------------------DARI PROJECT MY FIRST CRUD --------------------------------- */}

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
                                        <label>Category</label>
                                        <select ref="kategori" class="form-control form-control-lg">
                                        <option selected>Choose...</option>
                                        <option>Fleece</option>
                                        <option>Catton</option>
                                        <option>Wool</option>
                                        <option>Feather</option>
                                        <option>Synthetic</option>
                                        <option>New Product (Flane)</option>
                                        </select>
                                        </div> 
                                        <div className="form-group">
                                            <label>Product Description</label>
                                            <input type="text" ref="prodesc" placeholder="Product Description" style={{width: '100%', height: '50px',lineHeight: '18px', border: '1px solid #dddddd',padding: '10px', wordBreak: 'break-word'}}/>
                                        </div>
                                        <form role="form" onSubmit={this.updateData} encType="multipart/form-data">
                                        <div className="form-group">
                                            <label>Foto Produk</label>
                                            <input name="foto_produk" type="file" className="form-control" onChange={this.onchange}/>
                                        </div>
                                        </form>
                                    </div>        
                                    &nbsp; &nbsp;<button onClick={()=>{this.kirim()}} className="btn btn-success">Input Data</button> &nbsp;
                                    <button onClick={()=>{this.ambil()}} className="btn btn-primary">Show Data</button>
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
          <td style={{textAlign: 'center'}}>Product Description</td>
          <td style={{textAlign: 'center'}}>Photo</td>
          <td style={{textAlign: 'center'}}>Setting</td>
          
     </tr>            
         </thead>
        <tbody>
          {/* {listMainan} */}
        
          {hasil}
        </tbody></table>
          
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




















// import React, { Component } from 'react';
// // import logo from './logo.svg';
// // import './App.css';
// import axios from 'axios';
// import {Link} from 'react-router-dom';
// // var mysql = require('mysql'); // hasil dari sudo npm i mysqljs/mysql

// class Products extends Component {

//   constructor(){
//     super();
//     this.state = {
//       dataProduk : [],

//     }
//   }

//   ambil(){
//     var url1 = 'http://localhost:8000/remi';
//     axios.get(url1).then((x)=>{
//       console.log(x.data);
//       this.setState({dataProduk: x.data}) //untuk munculin data browsernya
//       })
//     }

//   kirim(){
//     var url1 = 'http://localhost:8000/data';
//     axios.post(url1, {
//       id: this.refs.id.value,
//       nama: this.refs.nama.value,
//       harga: this.refs.harga.value,
//       berat: this.refs.berat.value,
//       stok: this.refs.stok.value
//     }).then(()=>{
//       console.log("data sukses di POST")
//     })
//     }

//     delete(){
//       // var id_sblm = this.props.location.state.produkID;
//       // var produkID = isi.id;
//       var url1 = 'http://localhost:8000/delete/';
//       axios.delete(url1).then(()=>{
//         console.log("data sukses di POST")
//       })
//       }


//   render() {

    

//     const hasil = this.state.dataProduk
//     .map((isi, urutan) => 
//         {
//             var foto_produk = isi.foto_produk_produk;
//             var gambar = 'http://localhost:8000/tampunganFile/'+ foto_produk;
//             var img = <img src = {gambar} alt=""/>
//             var urut = urutan + 1;
//             var produkID = isi.id;
//             var namaproduk = isi.nama;
//             var hargaproduk = isi.harga;
//             var berat = isi.berat;
//             var foto_produk = isi.foto_produk_produk;
//             var stok =  isi.stok;
         
            

//             // kalo pake &nbps akan keluar eror di console "nodes cannot appear as a child of <tr>. Make sure you don't have any "
//             return  <tr key={urutan} style={{textAlign: 'center'}}>
//                         <td>{produkID}</td> 
//                         <td>{urut}</td> 
//                         <td>{namaproduk}</td> 
//                         <td>{hargaproduk}</td>
//                         <td>{berat}</td> 
//                         <td>{stok}</td> 
//                         <td><a href={gambar}>{foto_produk}</a></td> 
//                         <td>
//                             <Link to={
//                                     {
//                                         pathname: '/editdata/', 
//                                         state: {produkID}
//                                     }
//                                 } 
//                                 className="btn btn-info"><i className="fa fa-pencil"></i> Edit</Link>&nbsp; &nbsp;
//                         </td>
//                     </tr>
                    
//         }
//     );


//     return (
//       <div className="App">
//         <h3><b>MY FIRST CRUD</b></h3>
//         <input type="number" ref="id" placeholder="ketik ID......" ></input><br/>
//         <input type="text" ref="nama" placeholder="ketik nama......" ></input><br/>
//         <input type="number" ref="harga" placeholder="ketik harga......" ></input><br/>
//         <input type="number" ref="berat" placeholder="ketik berat......"></input><br/>
//         <input type="number" ref="stok" placeholder="ketik stok......"></input><br/>
//         <button onClick={()=>{this.kirim()}}>Input Data</button>
//         <button onClick={()=>{this.ambil()}}>Show Data</button>
//         <br/><br/>
//        <center>
//        <table className="table table-striped table-hover table-bordered" style={{width: "80%"}}>
//          <thead>
//          <tr style={{backgroundColor: ''}}>
//           <td style={{textAlign: 'center'}}>ID</td>
//           <td style={{textAlign: 'center'}}>No Urut</td>
//           <td style={{textAlign: 'center'}}>Nama</td>
//           <td style={{textAlign: 'center'}}>Harga</td>
//           <td style={{textAlign: 'center'}}>Berat</td>
//           <td style={{textAlign: 'center'}}>Stok</td>
//           <td style={{textAlign: 'center'}}>foto_produk</td>
//           <td style={{textAlign: 'center'}}>Setting</td>
          
//      </tr>            
//          </thead>
//         <tbody>
//           {/* {listMainan} */}
        
//           {hasil}
//         </tbody></table>
//           </center>
          
          
        
        

//       </div>
//     );
//   }
// }

// export default Products;