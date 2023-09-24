const display = document.querySelector(".display");
const operators = document.querySelectorAll(".Operator")
 const numbers = document.querySelectorAll(".numbers")

// Buttons for calculations
const plusButton = document.querySelector("#PlusCross");
const minusButton = document.querySelector("#MinusCross");
const multiplyButton = document.querySelector("#MultiplyCross");
const divideButton = document.querySelector("#DivisionCross");
const equalButton = document.querySelector("#EqualButton");
const clearButton = document.querySelector("#C");
const decimalButton = document.querySelector("#decimal");
const plusMinusButton = document.querySelector("#plusMinusButton");


function add([...args]) {
 let result = 0;
 args.forEach(arg => result += arg);
 return result;
}

function subtract([a, b = 0, ...args]) {
  let result = a - b;
  args.forEach(arg => result += arg);
  return result;
}

function multiply([...array]) {
  let result = 1;
  for (let num of array) {
  result *= num;
}
return result;
}

function divide(a , b = 1, ...args) {
  let result = a / b;
  for (i = 0; i < args.length; i++) result /= args[i];
  return result;
}


let operations = {inputs: [], sign: ""};
let inputs = operations.inputs;
let sign = operations.sign;
let Output = display.dataset;


function operate() {
  if (Output.input) inputs.push(+Output.input);
  if (sign == "plus") {
    inputs = [add(inputs)];
    display.textContent = add(inputs);
  } else if (sign == "minus") {
    inputs = [subtract(inputs)]
    display.textContent = subtract(inputs);
  } else if (sign == "cross") {
    inputs = [multiply(inputs)];
    display.textContent = multiply(inputs);
  } else if (sign == "divide") {
    inputs = [divide(inputs)];
    display.textContent = divide(inputs);
  }

  sign = "";
  Output.input = "";
}


display.textContent = "0";
numbers.forEach(button => button.addEventListener("click", () => {
    if (sign == "equal") {
        inputs = [];
        sign = "";
    }
    Output.input += button.id;
    display.textContent = Output.input
}))

decimalButton.addEventListener("click", () => {
    if (Output.input == "") {
        Output.input += "0.";
        display.textContent = Output.input;
    }
    if (!Output.input.includes(".")) {
        Output.input += ".";
        display.textContent = Output.input;
    }
})

plusMinusButton.addEventListener("click", () => {
    if (inputs == "" && !Output.input) return;
    if (Output.input) {
        inputs[0] *= -1;
        display.textContent = inputs[0];
    }
})

operators.forEach(button => button.addEventListener("click", () => {
    if (sign) operate();
    if (Output.input) inputs.push(+Output.input);
    Output.input = "";
    sign = button.id;
}))


equalButton.addEventListener("click", () => {
    if (Output.input) operate();
    sign = "equal";
})

clearButton.addEventListener("click", () => {
    Output.input = "";
    display.textContent = "0";
    inputs = [];
    sign = "";
})

function stylePressed(e) {
    if (!e.target.id) return;
    display.classList.add("displayAction");
    display.addEventListener("transitionend", () => display.classList.remove("displayAction"));
    const button = document.getElementById(`${e.target.id}`);
    button.classList.add("pressed");
    button.addEventListener("transitionend", () => button.classList.remove("pressed"));
}
window.addEventListener("click", stylePressed);