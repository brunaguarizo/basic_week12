const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
We will create an application that lists arrays within an object as looping through objects are useful
We will use for (let key in obj)

This application will allow hosts to give add users to their chat server, assign roles through permissions that are true or untrue

CHALLENGE 1,
Make a function and command to turn all permissions off and all permissions on

CHALLENGE 2,
Using the role object, make commands to assign different roles by looping through the settings and assign the values of the chosen role
*/

/* ---------------------- PLANNING ----------------------
Application -> list arrays and objects

  function: createUsers -> add user to chat server
  function: assignRole to a user -> moderator, simple, coAdmin

  function: listUsers -> see all the users added
  function: showSettings -> see all the settings
  function showPermissions -> see all the permissions
  
  permissions: true or false
  settings: darkMode, sensitivityAmount, editAccounts, deleteAccounts, createChannels, editChannels


CHALLENGE 1:
    turn permissions on -> 
    for(let key in permissions){
              permissions[key] = true;

    turn permissions off ->
    for(let key in permissions){
                    permissions[key] = false;


  CHALLENGE 2:  
    If permissions are X -> moderator
    If permissions are Y  -> simple
    If permissions are Z -> coAdmin

 ---------------------- PLANNING ---------------------- */

let users = [];

// CHALLENGE 2 - Role objects with permissions
let role = {
moderator: {
  darkMode: true,
  sensitivityAmount: false,
  editAccounts: true,
  deleteAccounts: false,
  createChannels: false,
  editChannels: true,
},
simple: {
  darkMode: true,
  sensitivityAmount: false,
  editAccounts: false,
  deleteAccounts: false,
  createChannels: false,
  editChannels: false,
},
coAdmin: {
  darkMode: true,
  sensitivityAmount: true,
  editAccounts: true,
  deleteAccounts: false,
  createChannels: true,
  editChannels: true,
},
};

let settings = {
darkMode: true,
sensitivityAmount: true,
editAccounts: true,
deleteAccounts: true,
createChannels: true,
editChannels: true,
};

// REGULAR EXERCISE - Function to create users
function createUsers() {
readline.question("Type the name of the user to add: ", (name) => {
  if (name) {
    users.push({ name, role: "simple" });
    console.log(`User ${name} added`);
  }
  StartApp();
});
}

// CHALLENGE 2 - Assign a role to a user
function assignRole() {
readline.question("Type the user's name to assign the role: ", (name) => {
  let user = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name) {
      user = users[i];
      break;
    }
  }

  if (!user) {
    console.log("User not found");
    return StartApp();
  }

  readline.question("Choose a role: moderator, simple or coAdmin: ", (newRole) => {
    if (role[newRole]) {
      user.role = newRole;
      console.log(`${name} is now a ${newRole}.`);
    } else {

      console.log("Role not found");
    }
    StartApp();
  });
});
}

// List users and their roles
function listUsers() {
if (users.length === 0) {
  console.log("No users added");
} else {
  users.forEach((user) => {
    console.log(`User: ${user.name}, Role: ${user.role}`);
  });
}
StartApp();
}

// Show permissions of users based on their role
function showPermissions() {
users.forEach((user) => {
  console.log(`${user.name}'s permissions:`);
  console.log(role[user.role]);
});
StartApp();
}

// Show application settings
function showSettings() {
console.log("Role settings:");
console.log(settings);
StartApp();
}

// I could not do this
function turnPermissions() {
}

// REGULAR EXERCISE
function StartApp() {
readline.question(
  "What would you like to do? add, list, role, settings, permissions, or quit: ",
  (command) => {

    if (command === "add") {
      createUsers();

    } else if (command === "list") {
      listUsers();

    } else if (command === "role") {
      assignRole();

    } else if (command === "settings") {
      showSettings();

    } else if (command === "permissions") {
      showPermissions();

    } else if (command === "quit") {
      readline.close();
    } else {

      console.log("Invalid command");
      StartApp();
    }
  }
);
}

StartApp();
