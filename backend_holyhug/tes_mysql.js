var mysql = require('mysql');

const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'dilarangmerokok',
        database: 'ecommarce'
    })
    //untuk konekin ke database
db.connect(() => {
    console.log('connected database')
});
//db.end() //untuk matiin connection, jadi ketika dijalankan langsung mati

// untuk get data
// var perintah = 'select * from produk_mainan';
// db.query(perintah, (error, hasil) => {
//         if (error) throw error; //ini kasih tahu kalo error 
//         console.log(hasil);
//     })
//     // coba jalankan node tes_mysql maka data yg di database mysql akan ada di terminal


// // get spesifik data untuk harga < 100000
// var perintah = 'select * from produk_mainan where harga < 100000';
// db.query(perintah, (error, hasil) => {
//         if (error) throw error; //ini kasih tahu kalo error 
//         console.log(hasil);
//     })
//     // coba jalankan node tes_mysql maka data yg di database mysql akan ada di terminal


// // get spesifik data 
// var barang = 'Tamiya';
// var perintah = 'select * from produk_mainan where nama = ?';
// db.query(perintah, barang, (error, hasil) => {
//         if (error) throw error; //ini kasih tahu kalo error 
//         console.log(hasil);
//     })
//     // coba jalankan node tes_mysql maka data yg di database mysql akan ada di terminal


// get spesifik data harga kurang dari 1000000 stok kurang dari 50 (tanda tanya leboh dari satu pake array kayak disamping perintah)
// var barang = 'Tamiya';
// var perintah = `select * from produk_mainan where harga < ? and stok < ?`;
// db.query(perintah, [100000, 50], (error, hasil) => {
//         if (error) throw error; //ini kasih tahu kalo error 
//         console.log(hasil);
//     })
//     // coba jalankan node tes_mysql maka data yg di database mysql akan ada di terminal


// kirim data ke mysql
// var data = {
//     id: 6,
//     nama: 'Balon',
//     harga: 10000,
//     berat: 0.1,
//     stok: 3
// }
// var perintah = 'insert into produk_mainan set ?'
// db.query(perintah, data, (error, hasil) => {
//     if (error) throw error;
//     console.log(hasil);
// })

// var data = {
//     id: 6,
//     nama: 'Balon',
//     harga: 10000,
//     berat: 0.1,
//     stok: 3
// }
// var perintah = 'update produk_mainan set berat = ? where id=5'
// db.query(perintah, 2.0, (error, hasil) => {
//     if (error) throw error;
//     console.log(hasil);
// })

db.end();