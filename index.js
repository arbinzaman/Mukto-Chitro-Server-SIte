const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

async function main() {
  try {
    const db = mysql.createConnection({
      host: "by6mask49emwcqqlrkkw-mysql.services.clever-cloud.com",
      user: "ubt3atvcgyq8bzcb",
      password: "wJRalw3Kz2bOuUllCRBE",
      database: "by6mask49emwcqqlrkkw",
    });
    
    // const db = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "muktochitro",
    // });



    // const db = mysql.createConnection({
    //   host: "sql12.freesqldatabase.com",
    //   user: "sql12665888",
    //   password: "VElcfBJK4M",
    //   database: "sql12665888",
    // });




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

    app.get("/event", (req, res) => {
      const sqlSelect = "SELECT * FROM event";
      db.query(sqlSelect, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    });

    app.get("/packages", (req, res) => {
      const sqlSelect = "SELECT * FROM packages";
      db.query(sqlSelect, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    });

    app.get("/packagedetails", (req, res) => {
      const sqlSelect = "SELECT * FROM packagedetails";
      db.query(sqlSelect, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    });

    app.get("/packagedetails/location/dhaka", (req, res) => {
      const sqlSelect = `SELECT * FROM packagedetails WHERE location = 'Dhaka';`;
      db.query(sqlSelect, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    });

    app.get("/packagedetails/location/outsideDhaka", (req, res) => {
      const sqlSelect = `SELECT * FROM packagedetails WHERE location = 'Outside Dhaka';`;
      db.query(sqlSelect, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    });
    app.get("/packagedetails/location/outdoor", (req, res) => {
      const sqlSelect = `SELECT * FROM packagedetails WHERE location = 'Outdoor';`;
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

    // app.get('/book/:id', (req, res) => {
    //   const bookingId = req.params.id; // Extract the booking ID from the URL

    //   // Query the database to retrieve the booking by ID
    //   const query = 'SELECT * FROM book WHERE bookingId = ?';

    //   db.query(query, [bookingId], (err, results) => {
    //     if (err) {
    //       console.error('Error querying the database:', err);
    //       res.status(500).json({ error: 'Internal Server Error' });
    //       return;
    //     }

    //     if (results.length > 0) {
    //       const booking = results[0]; // Assuming there's only one result
    //       res.json(booking);
    //     } else {
    //       res.status(404).json({ error: 'Booking not found' });
    //     }
    //   });
    // });

    app.get("/book/:customerEmail", (req, res) => {
      const customerEmail = req.params.customerEmail;

      const query = "SELECT * FROM book WHERE customerEmail = ?";

      db.query(query, [customerEmail], (err, results) => {
        if (err) {
          console.error("Error querying the database:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          if (results.length > 0) {
            res.json(results);
          } else {
            res
              .status(404)
              .json({ error: "No book found for the given email" });
          }
        }
      });
    });

    // admin api
    app.get("/users/admin/:email", (req, res) => {
      const email = req.params.email;
      const query = "SELECT role FROM users WHERE email = ?";

      db.query(query, [email], (error, results, fields) => {
        if (error) {
          console.error("Error: " + error);
          res.status(500).json({ error: "Internal server error" });
        } else {
          try {
            if (results.length === 0) {
              res.json({ isAdmin: false });
            } else {
              res.json({ isAdmin: results[0].role === "admin" });
            }
          } catch (e) {
            console.error("Error processing results: " + e);
            res.status(500).json({ error: "Internal server error" });
          }
        }
      });
    });

    // Post Api

    app.post("/users", (req, res) => {
      const sql =
        "INSERT INTO users (userName,address,contact,email,password) VALUES (?)";
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

    app.post("/packagedetails", (req, res) => {
      const sql =
        "INSERT INTO packagedetails (title,price,description,location,event) VALUES (?)";
      const values = [
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.location,
        req.body.event,
      ];
      console.log(values);
      db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    });

    app.post("/event", (req, res) => {
      const sql = "INSERT INTO event (title,description,img) VALUES (?)";
      const values = [req.body.title, req.body.description, req.body.img];
      console.log(values);
      db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    });

    app.post("/book", (req, res) => {
      const sql =
        "INSERT INTO book (customerEmail,title,price,location,event) VALUES (?)";
      const values = [
        req.body.customerEmail,
        req.body.title,
        req.body.price,
        req.body.location,
        req.body.event,
      ];
      console.log(values);
      db.query(sql, [values], (err, data) => {
        if (err) {
          console.error("Error posting from the database: " + data);
          res.status(500).json({ error: "Error posting data" });
        } else {
          res.json({ message: "Data Posted successfully" });
        }
      });
    });

    app.post("/packages", (req, res) => {
      const sql = "INSERT INTO packages (title,description,img) VALUES (?)";
      const values = [req.body.title, req.body.description, req.body.img];
      // console.log(values);
      db.query(sql, [values], (err, data) => {
        if (err) {
          console.error("Error posting from the database: " + data);
          res.status(500).json({ error: "Error posting data" });
        } else {
          res.json({ message: "Data Posted successfully" });
        }
      });
    });

    // Delete Api

    app.delete("/packages/:id", (req, res) => {
      const { id } = req.params;

      const deleteQuery = "DELETE FROM packages WHERE packageID = ?";
      db.query(deleteQuery, [id], (error, results) => {
        if (error) {
          console.error("Error deleting from the database: " + error);
          res.status(500).json({ error: "Error deleting data" });
        } else {
          res.json({ message: "Row deleted successfully" });
        }
      });
    });
    app.delete("/book/:id", (req, res) => {
      const { id } = req.params;
      console.log(id);
      const deleteQuery = "DELETE FROM book WHERE bookingID = ?";
      db.query(deleteQuery, [id], (error, results) => {
        if (error) {
          console.error("Error deleting from the database: " + error);
          res.status(500).json({ error: "Error deleting data" });
        } else {
          res.json({ message: "Row deleted successfully" });
        }
      });
    });

    app.delete("/event/:id", (req, res) => {
      const { id } = req.params;

      const deleteQuery = "DELETE FROM event WHERE eventID = ?";
      db.query(deleteQuery, [id], (error, results) => {
        if (error) {
          console.error("Error deleting from the database: " + error);
          res.status(500).json({ error: "Error deleting data" });
        } else {
          res.json({ message: "Row deleted successfully" });
        }
      });
    });

    app.delete("/users/:id", (req, res) => {
      const { id } = req.params;
      console.log(id);

      const deleteQuery = "DELETE FROM users WHERE userID = ?";

      db.query(deleteQuery, [id], (error, results) => {
        if (error) {
          console.error("Error deleting from the database: " + error);
          res.status(500).json({ error: "Error deleting data" });
        } else {
          res.json({ message: "Row deleted successfully" });
        }
      });
    });

    // Put Api

    app.put("/users/:id", (req, res) => {
      const id = req.params.id; 
      console.log(id);
      const newRole = "admin";
      const updateQuery = "UPDATE users SET role = ? WHERE userID = ?";
      db.query(updateQuery, [newRole, id], (err, result) => {
        if (err) {
          console.error("Error updating user role:", err);
          res.status(500).json({ error: "Failed to update user role" });
          return;
        }
        console.log("User role updated to admin");
        res.json({ message: "User role updated to admin" });
      });
    });

    app.listen(3001, () => {
      console.log("running on port 3001");
    });
  } catch (error) {
    console.error("Error connecting to the database: " + error);
  }
}

main();
