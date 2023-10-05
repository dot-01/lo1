const express = require("express");
const app = express();

const database = "mydb";
const user = "root";
const host = "localhost";
const port = 3306;
const mysql = require("mysql");
let mydb = mysql.createConnection({
  user: user,
  database: database,
  port: port,
  host: host,
});
app.use(express.static("./front"));
app.use(express.json());
mydb.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("The connection established");
  }
});
app.post("/api/testuser", (req, res) => {
  let username = req.body.username;
  mydb.query(
    "SELECT * FROM user WHERE username = ?",
    [username],
    (err, rows, field) => {
      if (err) {
        res.status(404).json({ msg: "err" });
      } else {
        // Assuming you want to return the username from the query
        if (rows.length > 0) {
          res.status(200).json({ username: rows[0].username });
        } else {
          res.status(200).json({ username: null }); // No matching username found
        }
      }
    }
  );
});
app.post("/api/signup", (req, res) => {
  let data = req.body;
  mydb.query(
    "INSERT INTO user (fname, lname, email, password, phone, username) VALUES (?, ?, ?, ?, ?, ?)",
    [
      data.fname,
      data.lname,
      data.email,
      data.password,
      data.phone,
      data.username,
    ],
    (err) => {
      if (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ error: "Unable to create user" });
      } else {
        res.status(201).json({ message: "User created successfully" });
      }
    }
  );
});
app.post("/api/login", (req, res) => {
  let email = req.body.email;
  mydb.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (err, rows, field) => {
      if (rows.length > 0) {
        res.json(rows).status(200);
      } else {
        res.json(false);
      }
    }
  );
});
app.post("/data",(req,res)=>{
email = req.body.email
  mydb.query("SELECT * FROM user WHERE email = ?",[email],(err,rows,fel)=>{
if(err){
res.json(err)
}else{
  res.json(rows).status(200);
}
  })
})
app.listen(3000, () => {
  console.log("The server has been running on port: " + 3000);
});
