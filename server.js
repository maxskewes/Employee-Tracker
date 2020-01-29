// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table")
const figlet = require("figlet");
const awesomeBanner = require("awesome-banner");

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
       name: "choices",
       message: "What would you like to do?",
       choices: ["View all departments", "View all employees", "View all roles", "Add a department", "Add an employee", "Add a role", "Update employee roles", "Exit/Quit"]
    })

.then(function(answer) {
    switch (answer.choices) {
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

        case "Update employee roles":
            updateRoles();
            console.log("Case firing");
            break;

        case "Exit":
            quit();
            break;
    
    }
});
}

questions();

function viewAllDepts() {
    connection.query("SELECT * FROM DEPARTMENTS", function(err, res)  {
    if (err) throw err;
    // console.log(
    //     awesomeBanner.blue(
    //       figlet.textSync("Departments", { horizontalLayout: "default" })
    //     )
    //);
        console.table(res);
    });
questions();
};

function viewAllEmps()  {
    console.log("employee");
    connection.query("SELECT * FROM EMPLOYEES", function(err, res)  {
        if (err) throw err;
        console.table(res);
    });
questions();
};

function viewAllRoles() {
    console.log("roles");
    connection.query("SELECT * FROM ROLES", function(err, res)  {
        if (err) throw err;
        console.table(res);
    });
questions();
};

//add a department
function addDept()  {
    inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "Enter the name of the department you would like to add"
      }
    ])
    .then(function(answer){
        console.log(answer);
        connection.query("INSERT INTO DEPARTMENTS SET ?", {NAME:answer.dept}, function(err, res){
            console.log(res)
        })
    })
    .then(questions);
};

//add an employee
function addEmp()  {
    inquirer
    .prompt([
      {
        type: "input",
        name: "emp",
        message: "Enter the name of the employee you would like to add"
      }
    ])
    .then(function(answer){
        console.log(answer);
        connection.query("INSERT INTO EMPLOYEES SET ?", {FIRST_NAME:answer.emp}, function(err, res){
            console.log(res)
        })
    })
    .then(questions)
};

//add A role
function addRole()  {
    inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Enter the name of the role you would like to add"
      }
    ])
    .then(function(answer){
        console.log(answer);
        connection.query("INSERT INTO ROLES SET ?", {TITLE:answer.role}, function(err, res){
            console.log(res)
        })
    })
    .then(questions)
};

function updateRoles()  {
    console.log("updateRoles FIRED")
    inquirer
    .prompt([
        {
        type: "input",
        name: "empID",
        message: "Enter the ID of the employee whose role you would like to update"
      },
      {
        type: "input",
        name: "newRole",
        message: "Enter the new role you would like the employee to take on"
      }
    ])
    .then(function(answer)  {
        console.log(answer);
        connection.query("UPDATE EMPLOYEES SET ? WHERE ?", {ROLES_ID:answer.newRole, ID:answer.empID}, function(err, res){
            console.log("anyword")
        })
    }).then(questions);
    
};

function quit() {
    console.log("<<<YOU HAVE EXITED>>>")
};