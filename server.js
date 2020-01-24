// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table")

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
//var PORT = process.env.PORT || 3306;

// MySQL DB Connection Information
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Nah1sp1n1",
  database: "EMPLOYEE_TRACKER"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("<<CONNECTED>>")
});

function questions() {
    inquirer.prompt({
       type: "list",
       name: "response",
       message: "What would you like to do?",
       choices: ["View all departments", "View all employees", "View all roles", "Add a department", "Add an employee", "Add a role", "Update employee roles", "Exit/Quit"]
    })
};

questions()
.then(function(response) {
    switch (response.options) {
        case "View all departments":
            viewAllDepts();
            break;

        case "View all employees":
            viewAllEmps();
            break;

        case "View all roles":
            viewAllRoles();
            break;

        case "Add a department":
            addDept();
            break;

        case "Add an employee":
            addEmp();
            break;

        case "Add a role":
            addRole();
            break;

        case "Update Employee roles":
            updateEmpRoles();
            break;

        case "Exit/Quit":
            quit();
            break;
    
    }
});
