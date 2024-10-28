
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

app.use(express.json());
app.use(cors());
dotenv.config();

//Connecting to db;

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

//Check if db connection works

db.connect((err)=>{
 if(err) return console.log("DB connected successfully");
 console.log("DB connected successfully");

 app.set("view engine", "ejs");
 app.set('views',__dirname + '/views');

 app.get("/patients",(req,res)=>{

    db.query('SELECT * FROM patients', (err,response)=>{
        if(err){
            console.err("Error receiving data");
            res.status(500).send('Error retrieving data')
        }else{
            res.render('data', {results:response});
        }
    })

 });

 app.get("/providers",(req,res)=>{

    db.query('SELECT * FROM providers', (err,response)=>{
        if(err){
            console.err("Error receiving data");
            res.status(500).send('Error retrieving data')
        }else{
            res.render('data', {results:response});
        }
    })

 })


 app.get("/patientsFirstNames",(req,res)=>{

    db.query('SELECT first_name FROM patients', (err,response)=>{
        if(err){
            console.err("Error receiving data");
            res.status(500).send('Error retrieving data')
        }else{
            res.render('data', {results:response});
        }
    })

 });


 app.get("/provider_specialty",(req,res)=>{

    db.query('SELECT provider_specialty FROM providers', (err,response)=>{
        if(err){
            console.error("Error receiving data");
            res.status(500).send('Error retrieving data')
        }else{
            res.render('data', {results:response});
        }
    })

 });

 
 
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);

    
    
})

})