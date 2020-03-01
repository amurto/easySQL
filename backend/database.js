const connection = new MySqlConnection('localhost', 'root', 'pass@123');  
     
connection.connectAsync().then(() => { 
    console.log("Database Connected");
 });

 module.exports = connection;