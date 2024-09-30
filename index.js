
//save values for operate
let values = [];

//save the temporal values input from the user
let tempValues = "";

//save the tempResult take before to press final result in a operation
let tempResult = 0;

//save the final result after click =
let result = 0;
// used  for operate in operator function
let totalFirstValue = "";
let totalSecondValue = "";

//save the operador in every operation
let operador = [];

//use for check if user take a final result
let checkUserChoice = false;

// check input used in validateInput function
const regex = /^[\d*\/+\-=x]+$|^Enter$/;
let button;

//Add values
const addValue = (num) => {
  values.push(Number(num));
};

//check is valid value
const checkValue = (value) => {
  if (value !== "") {
    return true;
  }
};

//check text in the main screen
const addTextScreen = (text) => {
  if (text === "Enter" || text === "=" || text === undefined) {
    textScreen.textContent += "";
  } else if (text === "*") {
    textScreen.textContent += "x";
  } else {
    textScreen.textContent += text;
  }
};

//Operate function
const operator = (operator, totalFirstValue, totalSecondValue) => {
  const operatos = {
    "+": (totalFirstValue, totalSecondValue) =>
      totalFirstValue + totalSecondValue,
    "-": (totalFirstValue, totalSecondValue) =>
      totalFirstValue - totalSecondValue,
    "*": (totalFirstValue, totalSecondValue) =>
      totalFirstValue * totalSecondValue,
    "/": (totalFirstValue, totalSecondValue) =>
      totalFirstValue / totalSecondValue,
  };

  if (operatos[operator]) {
    return operatos[operator](totalFirstValue, totalSecondValue);
  } else {
    throw new Error("Operator no support");
  }
};

//Screen
let screenCal = document.createElement("div");
screenCal.setAttribute("id", "screen");

let textScreen = document.createElement("p");
screenCal.appendChild(textScreen);

//General container
let container = document.querySelector("#container");

let containerHistoryScreen = document.createElement("div");
containerHistoryScreen.setAttribute("id", "containerHistoryScreen");

container.appendChild(screenCal);

//Container Buttons
let containerButton = document.createElement("div");
containerButton.setAttribute("id", "containerButton");
container.appendChild(containerButton);

//Create buttons and event click
let simbols = ["+", "-", "x", "/", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "="];
for (let i = 0; i < simbols.length; i++) {
  button = document.createElement("button");
  button.setAttribute("class", `button`);
  if (simbols[i] === "=") {
    button.setAttribute("id", "equal");
  }
  button.textContent = simbols[i];
  button.addEventListener("click", (e) => {
    if (e.target.textContent === "x") {
      e.target.textContent = "*";
    }

    calculator(e.target.textContent);
    //result
  });
  containerButton.appendChild(button);
}

//Check is number 'Enter' or simbols for operation
const validateInputUser = (input) => {
  let filterInput = input.replace(/[^0-9*\/+\-=xEnter]/g, "");

  return regex.test(filterInput);
};

// main function Calculator
const calculator = (e) => {
  let userValue;

  if (validateInputUser(e)) {
    userValue = e;
  }
  //add screen
  addTextScreen(userValue);

  //Reset for new Operation
  if (
    typeof Number(userValue) === "number" &&
    !isNaN(userValue) &&
    checkUserChoice
  ) {
    tempValues = "";
    textScreen.textContent = userValue;
    values = [];
    result = 0;
    tempResult = 0;
    checkUserChoice = false;
  }
  if (typeof Number(userValue) === "number" && !isNaN(userValue)) {
    //add value from the user
    tempValues += userValue;
  }
  if (
    userValue === "+" ||
    userValue === "/" ||
    userValue === "-" ||
    userValue === "*"
  ) {
    checkUserChoice = false;
    //add operador to the stack
    operador.push(userValue);

    //check values not is empty and add
    if (checkValue(tempValues)) {
      values.push(tempValues);
      //reset values
      tempValues = "";
    }
    // check have some result in the stack and operate with this
    if (result > 0 && values[1]) {

      tempResult = operator(operador[0], Number(tempResult), Number(values[1]));
      //reset values and save result temp
      tempValues = "";
      values = [];
      values.push(tempResult);
      operador.shift();
    }
    //check if the have 2 value for operate
    if (values.length === 2) {
      tempResult = Number(
        operator(operador[0], Number(values[0]), Number(values[1]))
      );
      //reset values and save result temp
      tempValues = "";
      values = [];
      values.push(tempResult);
      operador.shift();
    }
  }
  // take result and save result the next interaction!
  if (userValue === "=" || userValue === "Enter") {
    //history Screen

    checkValue(tempValues) && values.push(tempValues);

    if (values.length > 1 && operador.length > 0) {
      tempResult = operator(
        operador[0],
        Number(tempResult > 0 ? tempResult : values[0]),
        Number(values[1])
      );
    } else {
      tempResult = tempValues;
      tempValues = "";
    }

    let historyScreen = document.createElement("div");
    historyScreen.setAttribute("id", "historyScreen");
    //text history
    let textHistoryScreen = document.createElement("p");
    let containerOperator = document.createElement("p");
    containerOperator.setAttribute("class", "operation");
    containerOperator.textContent = textScreen.textContent;
    //temporal Result Dom
    let tempResultDom = document.createElement("span");
    tempResultDom.textContent = tempResult;

    //Equal Dom
    let equalsDom = document.createElement("span");
    equalsDom.textContent = "=";

    //expression operator Dom
    textHistoryScreen.appendChild(containerOperator);

    //result Dom
    textHistoryScreen.appendChild(equalsDom);
    textHistoryScreen.appendChild(tempResultDom);
    historyScreen.appendChild(textHistoryScreen);
    container.insertBefore(containerHistoryScreen, screenCal);
    containerHistoryScreen.appendChild(historyScreen);

    containerHistoryScreen.scrollTop = containerHistoryScreen.scrollHeight;

    //reset values and result save
    tempValues = tempResult;
    values = [];
    operador.shift();
    result = tempResult;
    checkUserChoice = true;
    //reset and update text main screen
    textScreen.textContent = "";
    addTextScreen(result);
  }
};

//get user keypress
document.addEventListener("keypress", (e) => {
  calculator(e.key);
});
