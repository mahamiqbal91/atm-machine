#! /usr/bin/env node

import inquirer from "inquirer";
//Amount in account
let myBalance = 50000; //In Dollars

//Set Account pin code
let myPin = 7890;

//Greet
console.log("\nWelcome to the ATM Machine!\n");

//Taking pin from user
let pinEntered = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: "Please enter your pin: ",
  },
]);
//Comparing entered pin
if (pinEntered.pin === myPin) {
  console.log("\nCorrect!\n");

  //Listing more options
  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: "Select from below: ",
      choices: ["withdraw", "check balance"],
    },
  ]);

    //If "withdraw" is selected
    if (operationAns.operation === "withdraw") {
        //Give ways to withdraw
        let withdrawAns = await inquirer.prompt([
        {
            name: "withdrawMethod",
            type: "list",
            message: "\nSelect a withdrawal method: ",
            choices: ["Enter Amount", "Fast Cash"],
        },
        ]);

        if (withdrawAns.withdrawMethod === "Enter Amount") {
        let remaining = await inquirer.prompt([
            {
            name: "amount",
            type: "number",
            message: "\nEnter amount: $",
            },
        ]);
            if (remaining.amount > myBalance) {
                console.log("\nInsufficient Balance!");
            } else {
                myBalance -= remaining.amount; //Amount after withdrawal
                console.log(
                `\nWithdrawn Successfully!\nYour remaining balance is: $${myBalance}`
                );
            }
        } else if (withdrawAns.withdrawMethod === "Fast Cash") {
        let fastCashAns = await inquirer.prompt([
            {
            name: "amount",
            type: "list",
            message: "\nChoose amount: $",
            choices: [1000, 2000, 5000, 10000, 20000],
            },
        ]);
        

            if (fastCashAns.amount > myBalance) {
                console.log("\nInsufficient Balance!");
            } else {
                myBalance -= fastCashAns.amount; //Amount after withdrawal
                console.log(
                `\nWithdrawn Successfully!\nYour remaining balance is: $${myBalance}`
                );
            }
        }
    } else if (operationAns.operation === "check balance") {
      console.log("\nYour remaining balance is: $" + myBalance + "\n"); //If check balance is selected
    } else {
      console.log("Stop!");
    }
} else {
    console.log("\nWrong!"); //In case wrong pin is entered
}