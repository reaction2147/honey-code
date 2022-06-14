const mysql = require('mysql');
const expresss = require('express')
const port = 3000
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = expresss()
app.use(cors())

const con = mysql.createPool({
    host: 'database-1.csmy25xtazfw.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'rootroot'
})

con.getConnection((err, connection) => {
if(err) {
    console.log(err)
} else {
    connection.query('CREATE DATABASE IF NOT EXISTS users;');
    connection.query('USE users;');
    connection.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), password varchar(255),PRIMARY KEY(id));', function(error, result, fields) {
    });
}
})

app.post('/users', async(req, res) => {
    const username = req.query.username
    const password = await bcrypt.hash(req.query.password, 10)
    if(username && password) {
        console.log('Request Received')
        try {
           con.getConnection( async (err, connection) => {
               await connection.query(`INSERT INTO users.users (username, password) VALUES ('${username}','${password}')`,(err, result, fields) => {
                    if(err) res.send(err);
                    if(result) res.send({username: username, password: password});
                    if(fields) console.log(fields)
                    
                })
                con.end()
            })
        } catch (error) {
           console.log(error) 
        }
    } 
})

app.get('/users',(req, res) => {
    con.getConnection((err, connection) => {
        connection.query(`SELECT * FROM users.users`, (err, result, fields) => {
            if(err) res.send(err);
            if(result) res.send(result);
         })
    })
})

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})