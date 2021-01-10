const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const pdf = require("html-pdf");
const path = require('path');

const connectDB=require('./server/database/connection')

const app = express();


// import config file for port
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

// log request when refresh the webpage
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to bodyparser
app.use(bodyparser.urlencoded({extended:true}));

// set view engine
app.set("view engine", "ejs");
// used to set different directry for views 
// app.set("views".path.resolve(__dirname,"views/ejs"));

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));

//Load router
app.use('/',require('./server/routes/router'));

// app.get('/',(req,res)=>{
//     res.render('index');
// })

app.listen(PORT,'0.0.0.0',()=>
{
    console.log(`server is listening on the http://localhost:${PORT}`);
})