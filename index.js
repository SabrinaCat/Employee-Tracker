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
    connection.query("SELECT * FROM DEPARTMENTS", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}

function viewRoles() {
    connection.query("SELECT * FROM ROLES", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM EMPLOYEES", function (err, results) {
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
                "INSERT INTO DEPARTMENTS SET ?",
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
        connection.query("SELECT id FROM DEPARTMENTS WHERE name = ?",
            [answer.newRoleDept], function (err, results) {
                if (err) throw err;
                let newRoleDeptId = results[0].id;

                connection.query(
                    "INSERT INTO ROLES SET ?",
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
function addEmployee() {
    inquirer.prompt([
        {
            name: "newFirstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "newLastName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "newEmpRole",
            type: "list",
            message: "What is the employee's role?",
            choices: [
                "Human Resources Officer",
                "Accountant",
                "Gadget Developer",
                "Office Worker",
                "Secret Agent"
            ]
        },
        {
            name: "newEmpManager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: [
                "Archer",
                "Poovey",
                "Figgis",
                "None"
            ]
        }
        //apply new employee data to the coninciding tables
    ]).then(function (answer) {
        connection.query("SELECT id FROM ROLES WHERE title = ?",
            [answer.newEmpRole], function (err, results) {
                if (err) throw err;
                let newEmpRoleId = results[0].id;
                // this function is like addRole but also needs if/else statement to handle case of no manager
                if (answer.manager = "None") {
                    insertEmployee(answer, newEmpRoleId, null);
                } else {
                    connection.query("SELECT id FROM EMPLOYEES WHERE last_name = ?",
                        [answer.newEmpManager], function (err, results) {
                            if (err) throw err;
                            let newEmpManagerId = results[0].id;

                            insertEmployee(employeeData, newEmpRoleId, newEmpManagerId);
                        }
                    );
                }
            }
        )
    })
}

//minimized clutter by creating a seperate function to handle inserting new employee data
function insertEmployee(employeeData, newEmpRoleId, newEmpManagerId) {
    connection.query(
        "INSERT INTO EMPLOYEES SET ?",
        {
            first_name: employeeData.newFirstName,
            last_name: employeeData.newLastName,
            role_id: newEmpRoleId,
            manager_id: newEmpManagerId
        },
        function (err) {
            if (err) throw err;
            console.log("Your new employee was added successfully");
            start();
        }

    );
}

function updateRole() {
    inquirer.prompt([
        {
            name: "whichEmp",
            type: "list",
            message: "Which employee would you like to update?",
            choices: [
                "Kane",
                "Gillette",
                "Krieger",
                "Tunt"
            ]
        },
        {
            name: "whichRole",
            type: "list",
            message: "What will their new role be?",
            choices: [
                "Human Resources Officer",
                "Accountant",
                "Gadget Developer",
                "Office Worker",
                "Secret Agent"
            ]
        }
    ]).then(function (answer) {
        //same logic to get id from role
        connection.query("SELECT id FROM ROLES WHERE title = ?",
            [answer.whichRole], function (err, results) {
                if (err) throw err;
                let whichRoleId = results[0].id;
                //then set new role targeting user choice employee (input = last_name)
                connection.query(
                    "UPDATE EMPLOYEES SET ? WHERE ?", [
                    {
                        role_id: whichRoleId
                    },
                    {
                        last_name: answer.whichEmp
                    }

                ],

                    function (err) {
                        if (err) throw err;
                        console.log("Your role was updated successfully!");
                        start();
                    }
                );
            }
        )
    })
}
// Start our server to listen to our requests
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

