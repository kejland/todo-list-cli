const prompt = require("prompt-sync")({sigint:true});

let currentList = [];
let newTask = [];
let completedTask = 0;

console.log("\nWelcome to the To-Do List Manager Application!");
console.log("===============================================");

let count = 0;

    console.log(`\nYou currently have ${currentList.length} to-do item(s)`)
    
    console.log("\n~ Select an action ~ \n");

    console.log("[1] Create a to-do item \n[2] Complete a to-do item \n[3] Exit List");

    let option = prompt("> ");

while (option !== "3"){
    count++;
    if (option === "1"){
        console.log("\n===============================================\n");
        console.log("~ Creating a new to-do item ~\n");
        console.log("What is this to-do item called?");
        let createTask = prompt(">");
        currentList.push("[incomplete] " + createTask);
        newTask.push(createTask);
        newAction();
    } else if (option === "2"){
        console.log("\n===============================================\n");
        console.log("~ Completing a to-do item ~\n");

        option2();

    } else if (option === "3"){
        break;
    } else {
        console.log("\n===============================================\n");
        console.log("You have entered an invalid number\n\nPlease try again")
        newAction();
    }
      
}

console.log("\n===============================================\n");
console.log("Have a nice day!\n")



function newAction(choice){
    console.log("\n===============================================\n");

    console.log(`\nYou currently have ${currentList.length-completedTask} to-do item(s)\n`)
    for (let i = 0; i < currentList.length; i++){
        console.log(`${i+1}. ${currentList[i]}`)
    }

    console.log("\n~ Select an action ~ \n");

    console.log("[1] Create a to-do item \n[2] Complete a to-do item \n[3] Exit List");

    option = prompt(">");

    return choice;
}


function option2(choice){
    for (let i = 0; i < currentList.length; i++){
        console.log(`${i+1}. ${currentList[i]}`)
    }
    
    console.log("\nWhich to-do item would you like to complete?");
    let complete = prompt("> ");
    // if (Number(complete) === 1){
    //     currentList.unshift("[complete] " + currentList[0]);
    //     currentList.shift(currentList[1]);
    // } else 
    if (Number(complete) <= currentList.length && Number(complete) > 0){
        currentList.splice(Number(complete), 0, `[complete] ${newTask[Number(complete)-1]}`);
        currentList.splice(Number(complete)-1, 1);
        //thrid parameter in splice is treated as a new element to insert in before the first parameter's location in array
        //second parameter at 0 will remove nothing
        completedTask++;
        newAction();
    } else if (Number(complete) <= 0 || Number(complete) > currentList.length){
        console.log("\nYou have entered and invalid number. \n\nPlease choose again\n")

        option2();
    }
    return choice;
}

//array[i] = "new value" -> to modify something at a certain index