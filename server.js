const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "muktochitro",
});

app.get("/", (req, res) => {
  return res.json("Hello World");
});

// get APi
app.get("/users", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/book", (req, res) => {
  const sqlSelect = "SELECT * FROM book";
  db.query(sqlSelect, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Post Api

app.post("/users", (req, res) => {
  const sql =
    "INSERT INTO users (userName,address,contact,email,password) VALUES (?,?,?,?,?)";
  const values = [
    req.body.userName, 
    req.body.address, 
    req.body.contact, 
    req.body.email, 
    req.body.password,
  ];
console.log(values);
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
