const prompt = require("prompt-sync")({sigint:true});

let currentList = [];
let completedTask = 0;

let areTodosComplete = [];
let isComplete = false;

let statsArray = [];
let status = "";
let yesStat = "- [complete] -";
let noStat = "[incomplete]";


console.log("\nWelcome to the To-Do List Manager Application!");
console.log("===============================================");

let count = 0;

    console.log(`\nYou currently have ${currentList.length} to-do item(s)`)
    
    console.log("\n~ Select an action ~ \n");

    console.log("[1] Create a to-do item \n[2] Complete a to-do item \n[3] Edit a to-do item \n[4] Delete a to-do item \n[5] Exit to-do list");

    let option = prompt("> ");

while (option !== "5"){
    count++;
    if (option === "1"){
        console.log("\n===============================================\n");
        console.log("~ Creating a new to-do item ~\n");
        console.log("What is this to-do item called?");
        console.log("(Enter [X] to go back)");
        let createTask = prompt(">");
        
        if (createTask === "x" || createTask === "X"){
            newAction();
        } else {
            isComplete = false;
            areTodosComplete.push(isComplete);
                    
            status = noStat;
            statsArray.push(status);
                    
            currentList.push(createTask);

            newAction();
        }
        
        
    } else if (option === "2"){
        console.log("\n===============================================\n");
        console.log("~ Completing a to-do item ~\n");

        option2();

    } else if (option === "3"){
        console.log("\n===============================================\n");
        console.log("~ Edit a to-do item ~\n");

        editItem();

    } else if (option === "4"){
        console.log("\n===============================================\n");
        console.log("~ Delete a to-do item ~\n");

        deleteItem();

    } else if (option === "5"){
        break;
    } else {
        console.log("\n===============================================\n");
        console.log("You have entered an invalid number\n\nPlease try again")
        newAction();
    }
      
}

console.log("\n===============================================\n");
console.log("Have a nice day!\n")



function newAction(){
    console.log("\n===============================================\n");

    console.log(`\nYou currently have ${currentList.length-completedTask} to-do item(s)\n`);
    for (let i = 0; i < currentList.length; i++){
        console.log(`${i+1}. ${statsArray[i]} ${currentList[i]}`);
    }

    console.log("\n~ Select an action ~ \n");

    console.log("[1] Create a to-do item \n[2] Complete a to-do item \n[3] Edit a to-do item \n[4] Delete a to-do item \n[5] Exit to-do list");

    option = prompt(">");

    //options that lead to other actions are in the while loop, which this fucntion is within

}


function option2(){
    for (let i = 0; i < currentList.length; i++){
        console.log(`${i+1}. ${statsArray[i]} ${currentList[i]}`);
    }
    
    console.log("\nWhich to-do item would you like to complete?\nEnter [X] to go back)");
    let complete = prompt("> ");

    if (complete === "x" || complete === "X"){
        newAction();
    } else if (Number(complete) <= currentList.length && Number(complete) > 0){
        //isComplete = true;
        status = yesStat;

        //change todos from false to true

        areTodosComplete.splice(Number(complete)-1, 0, true);
        //thrid parameter in splice is treated as a new element to insert in before the first parameter's location in array
        //second parameter at 0 will remove nothing
        areTodosComplete.splice(Number(complete), 1);
        //to remove the old incomplete tast string

        statsArray.splice(Number(complete)-1, 0, status);
        statsArray.splice(Number(complete), 1);

        
        //currentList.splice(Number(complete), 0, status+" "+newTask[Number(complete)-1]+"\u0336"); -> trying to strikethrough string

        completedTask++;
        newAction();
    } else if (Number(complete) <= 0 || Number(complete) > currentList.length){
        console.log("\nYou have entered and invalid number. \n\nPlease choose again\n");

        option2();
    } else if (Number(complete) === 0){
        console.log("\nYour list is empty. \n\nPlease choose again\n");

        option2();
    }
  
}

function editItem(){
    for (let i = 0; i < currentList.length; i++){
        console.log(`${i+1}. ${statsArray[i]} ${currentList[i]}`);
    }
    
    if (completedTask === 0){
        editItemText();
    } else {
        console.log("\nWhat would you like to edit? \n[1] Edit to-do item to incomplete \n[2] Edit to-do item text\n[X]. (go back)");

        let editChoice = prompt("> ");

        if (editChoice === "x" || editChoice === "X"){
            newAction();
        } else if (Number(editChoice) === 1){
            console.log("\nWhich item would you like to change back to incomplete?")
            let chooseItem = prompt("> ");
    
            
    
            if (Number(chooseItem) <= currentList.length && Number(chooseItem) > 0){
                if (areTodosComplete[Number(chooseItem)-1] === true){
                    areTodosComplete.splice(Number(chooseItem), 0, false);
                    areTodosComplete.splice(Number(chooseItem)-1, 1);
    
                    status = noStat;
    
                    statsArray.splice(Number(chooseItem), 0, status);
                    statsArray.splice(Number(chooseItem)-1, 1);
    
                    completedTask--;
    
                    newAction();
                } else if (areTodosComplete[Number(chooseItem)-1] === false){
                    console.log("\n Sorry, not a valid item to change\nPlease choose again\n\n***\n")
    
                    editItem();
                } else if (chooseItem === "x" || chooseItem === "X"){
                    newAction();
                }
            } else {
                console.log("\nYou have entered and invalid number. \n\nPlease choose again\n***\n");
        
                editItem();
            }
    
        } else if (Number(editChoice) === 2){
            editItemText();
        
        } else {
            console.log("\nYou have entered and invalid number. \n\nPlease choose again\n***\n");
    
            editItem();
        }
    }
    
}

function editItemText(){
    console.log("\nWhich to-do item would you like to edit?\n(Enter [X] to go back)");
        let toEdit = prompt("> ");

        if (toEdit === "x" || toEdit === "X"){
            newAction();
        } else if (Number(toEdit) <= currentList.length && Number(toEdit) > 0){
            console.log("\nType in edited to-do item\n");
            let editedItem = prompt("> ");
            
            currentList.splice(Number(toEdit), 0, editedItem);
            currentList.splice(Number(toEdit)-1, 1);
            //thrid parameter in splice is treated as a new element to insert in before the first parameter's location in array
            //second parameter at 0 will remove nothing
            
            console.log("\n Your to-do item has been edited");

            newAction();
        } else {
            console.log("\nYou have entered and invalid number. \n\nPlease choose again\n\n***\n");

            editItem();
        }
}


function deleteItem(){
    for (let i = 0; i < currentList.length; i++){
        console.log(`${i+1}. ${statsArray[i]} ${currentList[i]}`);
    }

    console.log("\nWhich to-do item would you like to delete?\nEnter [X] to go back)");
    let toDelete = prompt("> ");

    if (toDelete === "x" || toDelete === "X"){
        newAction();
    } else if (Number(toDelete) <= currentList.length && Number(toDelete) > 0){

        currentList.splice(Number(toDelete)-1, 1);
    
        console.log("\n Your to-do item has been deleted");
        
        newAction();
    } else if (Number(toDelete) <= 0 || Number(toDelete) > currentList.length){
        console.log("\nYou have entered and invalid number. \n\nPlease choose again\n");

        deleteItem();
    }
}