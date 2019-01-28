var router = require("express").Router();
var bodyParser = require("body-parser");
var mySql = require("mysql");

var db = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "sekolahku"
});

db.connect(() => {
  console.log("Database terhubung!");
});

router.use(bodyParser.json());

// SIGN UP
router.post("/signup", (req, res) => {
  var dbStat = "insert into users set ?";
  var data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  db.query(dbStat, data, (error, output) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log(output);
      res.send({
        username: req.body.username,
        email: req.body.email,
        status: "signup sukses!"
      });
    }
  });
});

// LOG IN
router.post("/login", (req, res) => {
  if (req.body.email && req.body.username) {
    res.send("pilih email atau username saja!");
  } else if (!req.body.password) {
    res.send("masukkan password");
  } else {
    var dbStat = `select * from users where username = '${
      req.body.username
    }' or email = '${req.body.email}'`;
    db.query(dbStat, (error, output) => {
      if (error) {
        throw error;
      } else if (output == 0) {
        res.send({
          login: "failed",
          status: "akun tidak terdaftar"
        });
      } else {
        if (req.body.password != output[0].password) {
          res.send({
            login: "failed",
            status: "password salah"
          });
        } else {
          res.send({
            login: "ok",
            status: "login sukses"
          });
        }
      }
    });
  }
});

module.exports = router;
