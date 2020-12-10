const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const PORT = 3001;

const {encrypt,decrypt} = require('./EncriptionHandler');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password:'password',
    database:'passwordmanager'
});

app.post("/addpassword",(req,res)=>{
    const { password, title} = req.body;
    //const hasedPassword = encrypt(password);
    
    db.query('INSERT INTO passwords (password, title) VALUES (?,?)',
    [password,title],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Sucess");
        }
    }
    );
})


app.listen(PORT,()=>{
    console.log("Server is running");
})