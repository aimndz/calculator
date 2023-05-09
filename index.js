const numberButtons = document.querySelectorAll("[number]");
const operatorButtons = document.querySelectorAll("[operator]");
const equalsButton = document.getElementById("equal");

const allClearButton = document.getElementById("allClear");
let lowerScreenEl = document.getElementById("lowerScreen");
let upperScreenEl = document.getElementById("upperScreen");

let previousNum = "";
let currentNum = "";
let operatorEl = null;
let display = "";
let result = 0;
let temp = "";
let computable = false;

allClearButton.addEventListener("click", allClear);
equalsButton.addEventListener("click", displayResult);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNum(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

function appendNum(number) {
  if (operatorEl) {
    currentNum += number;
  } else {
    previousNum += number;
  }

  display += number;

  displayScreen(display);
}

function setOperation(operator) {
  if (operatorEl !== null) evaluate();

  operatorEl = operator;
  display += operator;
  displayScreen(display);
}

function displayScreen(num) {
  if (lowerScreenEl.textContent === "0") clearScreen();
  lowerScreenEl.textContent = num;
}

function evaluate() {
  previousNum = parseInt(previousNum);
  currentNum = parseInt(currentNum);

  result = operate(operatorEl, previousNum, currentNum);
  result = parseFloat(result.toFixed(5));
  previousNum = result;

  currentNum = 0;
  computable = true;
}

function displayResult() {
  evaluate();

  if (isNaN(result)) {
    displayScreen("Nope");
  } else {
    displayScreen(`=${result}`);
    upperScreenEl.textContent = display;
    display = result.toString();

    if (!isFinite(result)) {
      lowerScreenEl.textContent = "You can't";
    }
  }
}

function clearScreen() {
  lowerScreenEl.textContent = "";
}

//cannot delete num and evaluate
function deleteNum() {
  lowerScreenEl.textContent = lowerScreenEl.textContent.slice(0, -1);
  previousNum = lowerScreenEl.textContent;
  display = lowerScreenEl.textContent;

  console.log(previousNum);
  console.log(operatorEl);
}

function allClear() {
  lowerScreenEl.textContent = "0";
  upperScreenEl.textContent = "";
  previousNum = "";
  currentNum = "";
  operatorEl = null;
  display = "";
  result = 0;
}

function operate(oper, num1, num2) {
  switch (oper) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "%":
      return num1 % num2;
    case "÷":
      return num1 / num2;
    default:
      return "Invalid";
  }
}
