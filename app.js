const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const express = require('express');
const app = express()
const port = 3000



app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static('assets'))

app.get('/', function(req, res){
    res.sendFile( `${__dirname}/index.html`);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})