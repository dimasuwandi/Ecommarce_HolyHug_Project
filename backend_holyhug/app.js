// const crypto = require('crypto');


var express = require('express');
var routeku = require('./route/route_mysql');
var cors = require('cors')

var app = express();
app.use(routeku);
app.use(cors())
app.use('/tampunganFile/', express.static('tampunganFile'))


//aktivasi server
var port = 8000
app.listen(8000, () => {
    console.log('Server Aktif di port ' + port + '!')
})