const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const express = require('express');
const app = express()
const port = 3000



app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', function(req, res){
    res.sendFile( `${__dirname}/index.html`);
})

app.post('/send-email', async (req, res)=>{
    dotenv.config()
    const {email,message} = req.body;

    contentHTML = `
    <h3>Let's connect !!</h3>
    <h4>Email: ${email}</h4>
    <p>${message}</p>
    ` 
    console.log(contentHTML)

    const  transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: process.env.SECRETUSER,
          pass: process.env.SECRETPASSWORD
        }
      });

    let mailOptions = {
        from: 'ivanlop.soft@outlook.com',
        to: 'ivlopez.dev@gmail.com',
        subject: 'Lets Connect!!',
        html: contentHTML
      };

    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.sendFile(`${__dirname}/index.html`)
          
        }
      });
      res.render(`${__dirname}/index.html`)    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})