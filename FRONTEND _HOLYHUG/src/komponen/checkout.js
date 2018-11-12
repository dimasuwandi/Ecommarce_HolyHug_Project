import React, {Component} from 'react';
import './style.css';
import img1 from './img/fleece/ariannacoral.jpg';
import img2 from './img/fleece/plush.jpg';
import close from './img/close_1.png';
import cart from './img/cart-1.png';
import Footer from './footer';
import Navbar from './nav';
import jsPDF from 'jspdf'
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Checkout extends Component {

    constructor(){
        super();
        this.state = {
          dataProduk : [],
          total :[],
          qty: ''
    
        }
      }
    
    state = {
        userData: [],
        nama: '',
        username: '',
        email: '',
        number: '',
        address: '',
        password: '',
        photo_profile:'',


        kode: '',
        nama: '',
        harga: '',
        kategori: '',
        qty: '',
        prodesc: '',
        foto_produk: '',
        total: ''
      }


       componentDidMount(){
        // var u = cookies.get('userID');
        axios.post('http://localhost:8000/carts', {
          username: this.refs.username
        }).then((hasilAmbil) => {
          this.setState({
            // qty: hasilAmbil.data[0].qty,
         
          })
        })
        axios.get()
      }

      componentWillMount(){
        var iduser = cookies.get('userID');
        axios.post('http://localhost:8000/profileuser', {
          userid: iduser
        }).then((ambilData) => {
          this.setState({
            username: ambilData.data[0].username,
          })
        })
        axios.get()
      }

      cart(){
        //   var usr = this.state.username
        var url1 = 'http://localhost:8000/carts';
        axios.post(url1, {
            username: this.refs.username.value
        }).then((x)=>{
          console.log(x.data);
          this.setState({
              dataProduk: x.data,
              kode: x.data[0].kode,
              nama: x.data[0].nama,
              harga: x.data[0].harga,
              kategori: x.data[0].kategori,
            //   qty: x.data[0].qty,
            qty: "asd",
              prodesc: x.data[0].prodesc,
            }) //untuk munculin data browsernya
          })
        }

    sum(){
        //   var usr = this.state.username
        var url1 = 'http://localhost:8000/sum';
        axios.post(url1, {
            username: this.refs.username.value
        }).then((x)=>{
          console.log(x.data);
          alert('Data Successfully Submitted, please print your invoice')
          this.setState({
            total:x.data[0].total,
          }) //untuk munculin data browsernya
          })
        }



        // daftarUser = (e) => {
        //     axios.post('http://localhost:8000/cart', {
        //             username : e.username.value,
        //     })
        //   }
        
        kurangnotifcart(){
            axios.post('http://localhost:8000/kurangnotifcart', {
          })
          }

      
    unduhPDF(){
        var dokumen = new jsPDF({
            unit:'cm',
            // format :[tinggi.lebar]
            format:[29.7,21.0]
        })


        var dlv = 5;
        var jml = this.state.total + dlv
        var jum = this.state.total 
        var obj = JSON.stringify(jum)
        var delivery = JSON.stringify(dlv)
        var total1 = JSON.stringify(jml)


        var a = new Date()
        var tahun = a.getFullYear()
        var bulan = a.getMonth() + 1
        var tgl = a.getDate()
        var hari = a.getDay()
        var jam = a.getHours()
        var menit = a.getMinutes()
        var detik = a.getSeconds()
        var milidt = a.getMilliseconds()
     
        var tanggal = tgl + "-" + bulan + "-" + tahun
        var inv = tgl + "" + jam + "" + detik + "" + milidt + "" + tahun


        axios.post('http://localhost:8000/carts', {
            username : this.refs.username.value,
        }).then((ambilData) => {
        this.setState({
          dataProduk: ambilData.data
        })
    })

        axios.post('http://localhost:8000/createinvoice', {
            username : "INV"+inv,
            username1 : this.refs.username.value,
    })

        axios.post('http://localhost:8000/createinputinvoice', {
            username : "INV"+inv,
            username1 : this.refs.username.value,
            date : tgl + "/" + bulan + "/" + tahun
    })

        axios.post('http://localhost:8000/invoiceadmin', {
                username : "INV"+inv,
                username1 : this.refs.username.value,
                date : tgl + "/" + bulan + "/" + tahun
    })

        axios.post('http://localhost:8000/invoice', {
            username : "INV"+inv,
            username1 : this.refs.username.value
    })


        axios.post('http://localhost:8000/inputinvoice', {
            username : "INV"+inv,
            username1 : this.refs.username.value,
    })

        axios.post('http://localhost:8000/inputinvoice2', {
            username : "INV"+inv,
            username1 : this.refs.username.value,
            fullname : this.refs.fullname.value,
            email : this.refs.email.value,
            phone : this.refs.phone.value,
            address : this.refs.address.value,
            bank : this.refs.bank.value,
    })


        axios.post('http://localhost:8000/notifinvoice', {
    })


        axios.post('http://localhost:8000/deleteallcart', {
            username1 : this.refs.username.value,
    })

                // var hasil = this.state.dataProduk
                // .map((isi, urutan) => 
                //     {
                //         var foto_produk = isi.foto_produk;
                //         var gambar = 'http://localhost:8000/tampunganFile/'+ foto_produk;
                //         var img = <img id="img" src = {gambar} alt=""/>
                //         var urut = urutan + 1;
                //         var produkID = isi.id;
                //         var kodeProduk = isi.kode;
                //         var namaProduk = isi.nama;
                //         var hargaProduk = isi.harga;
                //         var kategoriProduk = isi.kategori;
                //         var qty = isi.qty;
                //         var produkDesc =  isi.prodesc;
                    
                        
                //         return  <tr key={urut} style={{textAlign: 'center'}}>
                //                     <td>{urut}</td>
                //                     <td>{produkID}</td>
                //                     <td>{kodeProduk}</td> 
                //                     <td>{namaProduk}</td> 
                //                     <td>{hargaProduk}</td>
                //                     <td>{kategoriProduk}</td> 
                //                     <td>{qty}</td>
                //                     <td>{produkDesc}</td> 
                //                     <td id="img">{img}</td> 
                //                     {/* <td>
                //                         <Link to={
                //                                 {
                //                                     pathname: '/editdata/', 
                //                                     state: {produkID}
                //                                 }
                //                             } 
                //                             className="btn btn-info"><i className="fa fa-pencil"></i> Edit</Link>&nbsp; &nbsp;
                //                     </td> */}
                //                 </tr>
                                
                //     }
                // );


        dokumen.setFontSize(10)

        dokumen.text("PT. HolyHug Nusantara"  ,3,3)
        dokumen.text("Invoice Date : " + tanggal ,13.5,3)
        dokumen.text("Invoice No : INV"+ inv  ,13.5,3.4)
        dokumen.text("Account Username : "+ this.state.username  ,13.5,3.8)


        dokumen.text('Deliver To: ',3,6.3)
        dokumen.text("Full Name : " + this.refs.fullname.value ,3,7) // (sumbu x , sumbu y)
        dokumen.text("Email : " + this.refs.email.value ,3,7.5)
        dokumen.text("Phone : " + this.refs.phone.value ,3,8)
        dokumen.text("Address : " + this.refs.address.value ,3,8.5)
        dokumen.text("Bank : " + this.refs.bank.value ,3,9)

        dokumen.text("__________________________________________________________________________", 3,9.5)


        dokumen.text("Calculation : " ,3,10.8)
        dokumen.text("Amount                   $ "  + obj ,3,11.5)
        dokumen.text("Discount                  $" + " ----"  ,3,12)
        dokumen.text("Delivery Charges    $ "  + delivery ,3,12.5)
        dokumen.text("________________________  +", 3,12.62)
        dokumen.text("Total                        $"  + total1 ,3,13)


        dokumen.text("Pay To (Choose One) : ",9.5,10.8)

        dokumen.text("BCA: 0938892321 An: PT HolyHug Nusantara ",9.5,11.5)
        dokumen.text('BNI: 0243892321 An: PT HolyHug Nusantara ',9.5,12)
        dokumen.text('OCBC: 01121892321 An: PT HolyHug Nusantara ',9.5,12.5)
        dokumen.text('Maybank: 0732892321 An: PT HolyHug Nusantara ',9.5,13)
        dokumen.text('Mandiri: 0131892321 An: PT HolyHug Nusantara ',9.5,13.5)

        dokumen.text("__________________________________________________________________________", 3,14.2)

        // dokumen.text(this.state.dataProduk  ,3,15)
        // dokumen.text(hasil ,3,15)

        dokumen.save("INV"+inv+ 'Holyhug.pdf')

    }


  render(){

    const dataitems = this.state.dataProduk
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
                var qty = isi.qty;
                var produkDesc =  isi.prodesc;
             
                
    
                // kalo pake &nbps akan keluar eror di console "nodes cannot appear as a child of <tr>. Make sure you don't have any "
                return  <tr style={{textAlign: 'center'}}>
                            {/* <td>{urut}</td> */}
                            <td>{produkID}</td>
                            <td>{kodeProduk}</td> 
                            {/* <td>{urut}</td>  */}
                            <td>{namaProduk}</td> 
                            <td>{hargaProduk}</td>
                            <td>{kategoriProduk}</td> 
                            <td>{qty}</td>
                            <td>{produkDesc}</td> 
                            {/* <td><a href={gambar}>{foto_produk}</a></td>  */}
                            <td id="img">{img}</td> 
                        </tr>
                        
            }
        );
        var delivery = 5.00;
        var total = this.state.total + delivery
    return(
        <div>
        <Navbar/>
            <div id="wrappercheck">
                <div class="container">
                <div class="check">
                  
                    <div className="col-md-6">
                            <div className="box box-widget" style={{padding: '20px'}}>
                            <h3><b>Delivery Address</b></h3>
                                <hr />
                                <form role="form">
                                <input ref="username" type="hidden" className="form-control input-md" defaultValue={this.state.username} placeholder="full name" />
                                {/* <input ref="u" type="text" className="form-control input-md" defaultValue={this.state.nama} placeholder="full name" /> */}
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" ref="fullname" className="form-control" value="Muhammad Dimas Suwandi" placeholder="Enter your full name"/>
                                        {/* <input type="text" ref="fullname" className="form-control" placeholder="Enter your full name"/> */}
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" ref="email" className="form-control" value="muhammad_dimas95@yahoo.com" placeholder="Email Address" />
                                        {/* <input type="email" ref="email" className="form-control" placeholder="Email Address" /> */}
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="text" ref="phone" className="form-control" value="085717393810" placeholder="Phone Number" />
                                        {/* <input type="text" ref="phone" className="form-control" placeholder="Phone Number" /> */}
                                    </div>
                                    <div className="form-group">
                                        <label>Delivery Address</label>
                                        {/* <input type="text" ref="address" className="form-control" value="Jl.H.Muhi 4, No.9, RT:005, RW:004, Pondok-Pinang, Kebayoran Lama, Jaksel" placeholder="Address" /> */}
                                        <input type="text" ref="address" className="form-control" placeholder="Address" />
                                    </div>
                                <h3><b>Payment Method</b> <span></span></h3>
                                    <div className="form-group">
                                        <label>Bank Transfer</label>
                                        <select ref="bank" class="form-control">
                                        <option>Choose....</option>
                                        <option>BCA</option>
                                        <option>BNI</option>
                                        <option>OCBC</option>
                                        <option>Maybank</option>
                                        <option>Mandiri</option>
                                            
                                        </select>
                                    </div>
                                    <button type="button" onClick={(event) => {this.sum(); this.kurangnotifcart()}} className="btn btn-lg btn-block btn-success"><i className="fa fa-paper-plane"></i> Submit</button>
                                </form>
                            </div>
                        </div>
                        <br/><br/><br/>
                    <div class="col-md-3 cart-total">
                        <a href="#" onClick={() => this.sum()} class="continue">Click for Price Details</a>
                        <div class="price-details">
                            <span style={{fontSize:"15px", float:'left'}}>Amount</span>
                            <span style={{fontSize:"15px", float:'left'}} class="total1">$ {this.state.total}.00</span><br/>
                            <span style={{fontSize:"15px", float:'left'}}>Discount</span>
                            <span style={{fontSize:"15px", float:'left'}}>---</span><br/>
                            <span style={{fontSize:"15px"}}>Delivery Charges</span>
                            <h3>$ {delivery}.00</h3>
                            <div class="clearfix"></div>
                        </div>
                        <div class="total_price">
                            <div class="last_price">
                                <h4>TOTAL</h4>
                            </div>
                            <div><span id="totalharga">$ {total}.00</span></div>
                            <br/>
                            <br/>
                            <br/>
                            <div class="clearfix"> </div>
                        </div>
                        <button type="submit" onClick={() => this.unduhPDF()} className="btn btn-primary"><i className="fa fa-print"></i> Print Invoice</button>
                    </div>
                </div>
            </div>
        </div>
            <br/><br/><br/><br/>
    <Footer/>
    </div>
            
    )
  }
}
export default Checkout;

















