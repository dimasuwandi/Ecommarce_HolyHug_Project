// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import Pagination from "react-js-pagination";
// // require("bootstrap/less/bootstrap.less");
 
// class Coba extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activePage: 15
//     };
//   }
 
//   handlePageChange(pageNumber) {
//     console.log(`active page is ${pageNumber}`);
//     this.setState({activePage: pageNumber});
//   }
 
//   render() {
//     return (
//       <div>
//         <Pagination
//           activePage={this.state.activePage}
//           itemsCountPerPage={10}
//           totalItemsCount={450}
//           pageRangeDisplayed={5}
//           onChange={this.handlePageChange}
//         />
//       </div>
//     );
//   }
// }
 
// ReactDOM.render(<Coba />, document.getElementById("root"));

// export default Coba;



// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import Pagination from "react-js-pagination";
// class TodoApp extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       dataProduk: ['a','b','c','d','e','f','g','h','i','j','k'],
//       currentPage: 1,
//       dataProdukPerPage: 3
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(event) {
//     this.setState({
//       currentPage: Number(event.target.id)
//     });
//   }

//   render() {
//     const { dataProduk, currentPage, dataProdukPerPage } = this.state;

//     // Logic for displaying dataProduk
//     const indexOfLastTodo = currentPage * dataProdukPerPage;
//     const indexOfFirstTodo = indexOfLastTodo - dataProdukPerPage;
//     const currentdataProduk = dataProduk.slice(indexOfFirstTodo, indexOfLastTodo);

//     const renderdataProduk = currentdataProduk.map((todo, index) => {
//       return <li key={index}>{todo}</li>;
//     });

//     // Logic for displaying page numbers
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(dataProduk.length / dataProdukPerPage); i++) {
//       pageNumbers.push(i);
//     }

//     const renderPageNumbers = pageNumbers.map(number => {
//       return (
//         <li
//           key={number}
//           id={number}
//           onClick={this.handleClick}
//         >
//           {number}
//         </li>
//       );
//     });

//     return (
//       <div>
//         <ul>
//           {renderdataProduk}
//         </ul>
//         <ul id="page-numbers">
//           {renderPageNumbers}
//         </ul>
//       </div>
//     );
//   }
// }


// ReactDOM.render(
//   <TodoApp />,
//   document.getElementById('app')
// );


// export default TodoApp;



// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import Pagination from "react-js-pagination";
// // console.clear();


//     class TodoApp extends React.Component {
//       constructor() {
//         super();
//         this.state = {
//           dataProduk: ['a','b','c','d','e','f','g','h','i','j','k'],
//           currentPage: 1,
//           dataProdukPerPage: 2
//         };
//         this.handleClick = this.handleClick.bind(this);
//       }

//       handleClick(event) {
//         this.setState({
//           currentPage: Number(event.target.id)
//         });
//       }

//       render() {
//         const { dataProduk, currentPage, dataProdukPerPage } = this.state;

//         // Logic for displaying current dataProduk
//         const indexOfLastTodo = currentPage * dataProdukPerPage;
//         const indexOfFirstTodo = indexOfLastTodo - dataProdukPerPage;
//         const currentdataProduk = dataProduk.slice(indexOfFirstTodo, indexOfLastTodo);

//         const renderdataProduk = currentdataProduk.map((todo, index) => {
//           return <li key={index}>{todo}</li>;
//         });

//         // Logic for displaying page numbers
//         const pageNumbers = [];
//         for (let i = 1; i <= Math.ceil(dataProduk.length / dataProdukPerPage); i++) {
//           pageNumbers.push(i);
//         }

//         const renderPageNumbers = pageNumbers.map(number => {
//           return (
//             <li
//               key={number}
//               id={number}
//               onClick={this.handleClick}
//             >
//               {number}
//             </li>
//           );
//         });

//         return (
//           <div>
//             <ul>
//               {renderdataProduk}
//             </ul>
//             <ul id="page-numbers">
//               {renderPageNumbers}
//             </ul>
//           </div>
//         );
//       }
//     }


//     // ReactDOM.render(
//     //   <TodoApp />,
//     //   document.getElementById('app')
//     // );

//     export default TodoApp;












import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import axios from 'axios';
import {Link} from 'react-router-dom';
// console.clear();


    class TodoApp extends React.Component {
      constructor() {
        super();
        this.state = {
          // dataProduk: ['a','b','c','d','e','f','g','h','i','j','k'],
          dataProduk: [],
          currentPage: 1,
          dataProdukPerPage: 2
        };
        this.handleClick = this.handleClick.bind(this);
      }

      componentWillMount(){
        axios.get('http://localhost:8000/Synthetic')
        .then((ambilData) => {
          this.setState({
            dataProduk: ambilData.data
          })
        })
      }

      handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
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


        // const newp = this.state.dataProduk
        const newp = currentdataProduk.map((isi, index) => {
        // .map((isi, urutan) => 
            {
                var foto_produk = isi.foto_produk;
                var gambar = 'http://localhost:8000/tampunganFile/'+ foto_produk;
                var img = <img id="img" src = {gambar} alt=""/>
                var index = index + 1;
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
        // );
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
              <a href="#" id={number} onClick={this.handleClick}>{number}</a>
              {/* {number} &nbsp; */}
            </li>
            </ul>
          );
        });

        return (
          <div>
            <div>
            <ul>
              {/* {renderdataProduk} */}
              {newp}
            </ul>
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div>
            <ul id="page-numbers">
              {renderPageNumbers}
            </ul>
            </div>
          </div>
        );
      }
    }


    // ReactDOM.render(
    //   <TodoApp />,
    //   document.getElementById('app')
    // );

    export default TodoApp;