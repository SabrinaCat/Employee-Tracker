const mysql = require("mysql");
const inquirer = require("inquirer");
const console = require("console.table");
const { start } = require("repl");

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
  start();
});
//function to start user prompt questions
function start() {
    inquirer
        .prompt({
            name: "whatAction",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add department",
                "Add role",
                "Add employee",
                "Update employee role",
                "Exit"
            ]
        })
//functions for user options
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}
//add functions
function addDepartment() {
    inquirer.prompt([
        {
            name: "newDept",
            type: "input",
            message: "What department would you like to add?"
        }
    ])// wait for user input, then use input to create new table row
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.newDept
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new department has been created!");
                    start();
                }
            );

// Start our server to listen to our requests
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

