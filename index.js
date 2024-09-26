let values = [];
let tempValues = "";
let tempResult = 0;
let result = 0;
let totalFirstValue = "";
let totalSecondValue = "";
let operador = [];
let checkUserChoice = false;
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

const addTextScreen = (text) => {
  if (text === "Enter" || text === '=') {
    textScreen.textContent += "";
  } else {
    textScreen.textContent += text;
  }
};

//Operate function
const operator = (operator, totalFirstValue, totalSecondValue) => {
  console.log(`soy funcion operator ${operator}`);
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

let containerHistoryScreen = document.createElement('div');
containerHistoryScreen.setAttribute('id', 'containerHistoryScreen')

container.appendChild(screenCal);

//Container Buttons
let containerButton = document.createElement("div");
containerButton.setAttribute("id", "containerButton");
container.appendChild(containerButton);

//Create buttons and event click
let simbols = ["+", "-", "*", "/", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "="];
for (let i = 0; i < simbols.length; i++) {
  button = document.createElement("button");
  button.setAttribute("class", `button`);
  if (simbols[i] === "=") {
    button.setAttribute("id", "equal");
  }
  button.textContent = simbols[i];
  button.addEventListener("click", (e) => {
    console.log(values);
    console.log(e.type);
    calculator(e.target.textContent);
    //result
  });
  containerButton.appendChild(button);
}

// main function Calculator
const calculator = (e) => {
  console.log(result);
  let userValue = e;

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
    console.log("reset");
    checkUserChoice = false;
    console.log(values);
  }
  if (typeof Number(userValue) === "number" && !isNaN(userValue)) {
    //add value from the user
    console.log(userValue);
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
    console.log(values);

    //check values not is empty and add
    if (checkValue(tempValues)) {
      values.push(tempValues);
      //reset values
      tempValues = "";
    }
    // check have some result in the stack and operate with this
    if (result > 0 && values[1]) {
      console.log(values);

      console.log("este es el problema");
      tempResult = operator(operador[0], Number(tempResult), Number(values[1]));
      //reset values and save result temp
      tempValues = "";
      values = [];
      values.push(tempResult);
      operador.shift();
    }
    //check if the have 2 value for operate
    console.log(values);
    if (values.length === 2) {
      console.log("segundo if");
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
    console.log(operador);
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
    containerOperator.setAttribute('class', 'operation')
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
    containerHistoryScreen.appendChild(historyScreen)

    containerHistoryScreen.scrollTop = containerHistoryScreen.scrollHeight

    //reset values and result save
    console.log(`tempresult ${tempResult}`);
    tempValues = tempResult;
    values = [];
    operador.shift();
    result = tempResult;
    checkUserChoice = true;
    console.log(values);
    console.log(`result ${result}`);
    //reset and update text main screen
    textScreen.textContent = "";
    addTextScreen(result);
  }
};

//get user keypress
document.addEventListener("keypress", (e) => {
  calculator(e.key);
});
