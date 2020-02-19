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
       name: "choices",
       message: "What would you like to do?",
       choices: ["View all departments", "View all employees", "View all roles", "Add a department", "Add an employee", "Add a role", "Update employee roles", "Update employee's manager", "View employees by manager", "Delete employee", "Exit/Quit"]
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
            break;
            
        case "Update employee's manager":
            updateMGR();
            break;

        case "View employees by manager":
            viewByMgr();
            break;

        case "Delete employee":
            deleteEmployee();
            break;

        case "Exit":
            quit();
            break;
    }
});
}

questions();

//view departments
function viewAllDepts() {
    connection.query("SELECT * FROM DEPARTMENTS", function(err, res)  {
    if (err) throw err;
        console.table(res);
    });
questions();
};

//view employees
function viewAllEmps()  {
    console.log("employee");
    connection.query("SELECT * FROM EMPLOYEES", function(err, res)  {
        if (err) throw err;
        console.table(res);
    });
questions();
};

//view roles
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
        name: "firstName",
        message: "Enter the first name of the employee you would like to add."
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the employee you would like to add."
      },
      {
        type: "input",
        name: "department",
        message: "Enter the ID of their department."
      },
      {
        type: "input",
        name: "manager",
        message: "Enter the ID of their manager."
      },
      {
        type: "input",
        name: "empRole",
        message: "Enter the ID of their role."
      }
    ])
    .then(function(answer){
        console.log(answer);
        connection.query("INSERT INTO EMPLOYEES SET ?", {FIRST_NAME:answer.firstName, LAST_NAME:answer.lastName, DEPARTMENTS_ID:answer.department, MANAGERS_ID:answer.manager, ROLES_ID:answer.empRole}, function(err, res){
            console.log(res)
        })
    })
    .then(questions)
};

//add a role
function addRole()  {
    inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Enter the name of the role you would like to add"
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the starting salary for this role."
      }
    ])
    .then(function(answer){
        console.log(answer);
        connection.query("INSERT INTO ROLES SET ?", {TITLE:answer.role, SALARY:answer.salary}, function(err, res){
            console.log(res)
        })
    })
    .then(questions)
};

//update employee's role
function updateRoles()  {
    inquirer
    .prompt([
        {
        type: "input",
        name: "empID",
        message: "Enter the ID of the employee whose role you would like to update."
      },
      {
        type: "input",
        name: "newRole",
        message: "Enter the ID of the new role you would like the employee to take on."
      }
    ])
    .then(function(answer)  {
        console.log(answer);

        connection.query(`UPDATE EMPLOYEES SET ROLES_ID = ? WHERE ID = ?`, [answer.newRole, answer.empID], function(err, res){
            if (err) throw err;
            console.log("anyword")
        })
    }).then(questions);
};

//update employee's MANAGER
function updateMGR()  {
    inquirer
    .prompt([
        {
        type: "input",
        name: "empID",
        message: "Enter the ID of the employee whose manager you would like to update."
      },
      {
        type: "input",
        name: "newMgrId",
        message: "Enter the ID of the new manager you would like the employee to take on."
      }
    ])
    .then(function(answer)  {
        console.log(answer);

        connection.query(`UPDATE EMPLOYEES SET MANAGERS_ID = ? WHERE ID = ?`, [answer.newMgrId, answer.empID], function(err, res){
            if (err) throw err;
            console.log("anyword")
        })
    }).then(questions);
};

function viewByMgr ()  {
    inquirer
    .prompt([
    {
        type: "input",
        name: "mgrID",
        message: "Enter the ID of the manager whose employees you would like to view."
    },
])
.then(function(answer)  {
    console.log(answer);

    connection.query("SELECT * FROM EMPLOYEES WHERE MANAGERS_ID = ?", answer.mgrID, function(err, res){
        if (err) throw err;
        console.table(res);
    })
}).then(questions);

};

function deleteEmployee ()  {
    inquirer
    .prompt([
    {
        type: "input",
        name: "empID",
        message: "Enter the ID of the employee you would like to delete."
    },
])
.then(function(answer)  {
    console.log(answer);

    connection.query("DELETE FROM EMPLOYEES WHERE ID = ?", answer.empID, function(err, res){
        if (err) throw err;
        console.log("anyword")
    })
}).then(questions);

};

function quit() {
    console.log("<<<YOU HAVE EXITED>>>")
};