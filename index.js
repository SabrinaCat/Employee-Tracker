
const mysql = require("mysql");
const inquirer = require("inquirer");


//set the port
const PORT = process.env.PORT || 8080;

//create mysql connection on local device
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Sushicat1001",
  database: "employee_tracking"
});
//console.log error or success
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Start our server to listen to our requests
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

