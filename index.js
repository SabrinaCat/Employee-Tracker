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
    ])
    // take user input and use input to create a new table row
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
            
function addRole() {
    inquirer.prompt([
        {
            name: "newRoleTitle",
            type: "input",
            message: "What role would you like to add?"
        },
        {
            name: "newRoleSalary",
            type: "input",
            message: "What salary will this role have?",
            validate: function (value) {
                if (isNaN(value) === false || value > 999999.99) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "newRoleDept",
            type: "list",
            message: "Which department shall I apply this role to?",
            choices: [
                "Human Resources",
                "Accounting",
                "Research",
                "Daily Operations",
                "*Top Secret*"
            ]
        }
    ])
    //get id from department name
    .then(function (answer) {
        connection.query("SELECT id FROM department WHERE name = ?",
            [answer.newRoleDept], function (err, results) {
                if (err) throw err;
                let newRoleDeptId = results[0].id;

                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.newRoleTitle,
                        salary: answer.newRoleSalary,
                        department_id: newRoleDeptId
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your role has been accepted!");
                        start();
                    }
                );
            }
        );
    });
}
// Start our server to listen to our requests
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

