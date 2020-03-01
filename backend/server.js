const http = require('http');
const express = require('express');
const path = require('path');
const translate = require('@vitalets/google-translate-api');

const bodyparser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;
var app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
// app.use('static', express.static(path.join('static')));
console.log(__dirname)
app.use(express.static(__dirname + '/public'));
// app.use('/images', express.static(__dirname + '/Images'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
});

const nlpHandler = require('./nlpHandler');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
     database : 'nodemysql'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

async function handleTranslation(req, res) {
    translate(req.body.text, {to: 'en'}).then(out => {
        console.log(out.text);
        //=> I speak English
        console.log(out.from.language.iso);
        //=> nl
        res.send({
            text: out.text
        })
    }).catch(err => {
        res.send({err: err});
    });
}

async function handleRequest(req, res) {
    try {
        console.log("inside ")
        console.log(req.body);
        
        let sentence = req.body.sentence;
            // let body = JSON.parse(mdata) // 'Buy the milk'

        if(!sentence) throw new Error('sentence not found');    

        let query = await nlpHandler.processSentence(sentence);
        console.log("Query",query);
        if (!query) {
            res.send({query:false});
        }
        if(query){
            let sql = query;
            console.log(sql);
            db.query(sql, (err, results) => {
            if(err) throw err;
            
            //For adding history
            let hist = {Query: sql,text: sentence};
            let query = 'INSERT INTO history SET ?';
            db.query(query, hist,(err, result) => {
                if(err) throw err;
                console.log(result);
            })

            res.send({
                query:sql,
                results:(results)?(results):(null)
            });
            });
        }
    //write a response to the client
    } catch (error) {
        res.send({msg:error.message}); //write a response to the client
    }

}


app.route('/').post(handleRequest);
app.route('/translate').post(handleTranslation);

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE history(id int AUTO_INCREMENT, Query VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table created');
    });
});

app.get('/create-sheet', (req,res) => {
    let data = req.body.table;
    if(data == 'students'){
        let sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
    if(err) throw err;
    const csvData = csvjson.toCSV(results, {
    headers: 'key'
});
    writeFile('public/students-data.csv', csvData, (err) => {
    if(err) {
        console.log(err); // Do something to handle the error or just throw it
        throw new Error(err);
    }
    res.send('Successfully downloaded');
});
})
    }else{
        let sql = 'SELECT * FROM cars';
        db.query(sql, (err, results) => {
        if(err) throw err;
        const csvData = csvjson.toCSV(results, {
        headers: 'key'
    });
        writeFile('public/cars-data.csv', csvData, (err) => {
        if(err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }
        res.send('Successfully downloaded');
    });
    })
    }
    
})

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

app.get('/history', (req, res) => {
    let sql = 'SELECT * FROM history';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

 let PORT = 5000;
app.listen( PORT, () => {
    console.log(`listening on ${PORT}`);
});

//create a server object:
// http.createServer(handleRequest)
//     .listen(3000, function() {
//         console.log("server start at port 3000"); //the server object listens on port 3000
//     });