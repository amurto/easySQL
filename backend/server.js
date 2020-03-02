const express = require('express');
const fs = require('fs');
const translate = require('@vitalets/google-translate-api');

const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;
const HttpError = require('./models/http-error');

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

// app.use((req, res, next) => {
//     const error = new HttpError('Could not find this route.', 404);
//     throw error;
// });

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

const nlpHandler = require('./nlp/nlpHandler');

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
        res.send({
            text: out.text
        })
    }).catch(err => {
        res.send({err: err});
    });
}

async function handleRequest(req, res) {
    try {
        let sentence = req.body.sentence;
        let query = await nlpHandler.processSentence(sentence);
        let sql = query;
        db.query(sql, (err, results) => {
            
            if(!results) {
                sql = null
            } else {
                //For adding history
                let hist = {Query: sql,text: sentence};
                let query = 'INSERT INTO history SET ?';
                db.query(query, hist,(err, result) => {
                    if(err) throw err;
                    console.log(result);
                })
            }
            
            res.send({
                query:sql,
                results:(results)?(results):(null)
            });
        });
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
