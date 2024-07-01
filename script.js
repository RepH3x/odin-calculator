//grab div references

const output = document.querySelector("#output");

//global variables

let firstNumber = null;
let operator = null;
let lastOperator = null;
let lastNumber = null;
let secondNumber = null;

let equalsJustPressed = true;

const OPERATORS = "+-*/";
const MAX_NUMBER_SIZE = 14;

//setup button eventlisteners

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonPress(button.innerText));
});


//functions

function operate(oper) {
  switch (oper) {
    case "+":
      let addOutput = add(firstNumber, secondNumber);
      return addOutput > MAX_NUMBER_SIZE ? addOutput.substring(0, MAX_NUMBER_SIZE) : addOutput;
    case "-":
      let subOutput = subtract(firstNumber, secondNumber);
      return subOutput < MAX_NUMBER_SIZE ? subOutput.substring(0, MAX_NUMBER_SIZE) : subOutput;
    case "*":
      let multOutput = multiply(firstNumber, secondNumber);
      if(multOutput.includes("e")) return multOutput > MAX_NUMBER_SIZE ? multOutput.substring(multOutput.length, multOutput.length - MAX_NUMBER_SIZE) : multOutput;
      return multOutput > MAX_NUMBER_SIZE ? multOutput.substring(0, MAX_NUMBER_SIZE) : multOutput;
    case "/":
      let divOutput = divide(firstNumber, secondNumber);
      return divOutput < MAX_NUMBER_SIZE ? divOutput.substring(0, MAX_NUMBER_SIZE) : divOutput;
  }
}

function handleButtonPress(buttonText) {
  if(OPERATORS.includes(buttonText)) {   
    handleOperatorPress(buttonText);
  } else {
    switch(buttonText) {
      case "=": 
        handleEqualsPress();
        break;
      case ".":
        handleDecimalPress();
        break;
      case "ac":
        handleACPress();
        break;
      case "back":
        handleBackPress();
        break;
      default:
        handleNumberPress(buttonText);
    }
  }
}

function handleOperatorPress(buttonText) {
  if(firstNumber) {
    secondNumber = output.innerText;
    operator = buttonText;
    output.innerText = operate(operator);
    lastNumber = secondNumber;
    lastOperator = operator;
    clearData();
  } else {
    firstNumber = output.innerText;
    operator = buttonText;
    output.innerText = "0";
    equalsJustPressed = true;
  }
}

function handleEqualsPress() {
  if(firstNumber && operator) {
    secondNumber = output.innerText;
    output.innerText = operate(operator);
    lastNumber = secondNumber;
    lastOperator = operator;
    clearData();
    equalsJustPressed = true;
  } else if(lastOperator && lastNumber) {
    firstNumber = output.innerText;
    secondNumber = lastNumber;
    operator = lastOperator;
    output.innerText = operate(operator);
    lastNumber = secondNumber;
    clearData();
    equalsJustPressed = true;
  }
}

function handleACPress() {
  clearData();
  lastNumber = null;
  lastOperator = null;
  output.innerText = "0";
  equalsJustPressed = true;
}

function handleDecimalPress() {
  if(output.innerText.includes(".")) return;
  output.innerText += ".";
  equalsJustPressed = false;
}

function handleBackPress() {
  if(output.innerText.length > 1) {
    output.innerText = output.innerText.substring(0, output.innerText.length - 1);
    equalsJustPressed = false;
  }
}

function handleNumberPress(buttonText) {
  if(equalsJustPressed) {
    output.innerText = buttonText;
    equalsJustPressed = false;
  }
  else if(output.innerText.length < MAX_NUMBER_SIZE) { 
    output.innerText += buttonText; 
    equalsJustPressed = false;
  }
}

function clearData() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  equalsJustPressed = false;
}

function add(num1, num2) { return Number(num1) + Number(num2) + ""; }
function subtract(num1, num2) { return Number(num1) - Number(num2) + ""; }
function multiply(num1, num2) { return Number(num1) * Number(num2) + ""; }
function divide(num1, num2) { 
  if(num1 === "0" || num2 === "0") return "0";
  return Number(num1) / Number(num2) + ""; 
}