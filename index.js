let values = [];
let tempValues = "";
let tempResult = 0;
let result = 0;
let totalFirstValue = "";
let totalSecondValue = "";
let operador = [];

//Add values
const addValue = (num) => {
  values.push(Number(num));
};

const tempTotalResult = (event) => {};

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

container.appendChild(screenCal);

//Container Buttons
let containerButton = document.createElement("div");
containerButton.setAttribute("id", "containerButton");
container.appendChild(containerButton);

//Buttons
let simbols = ["+", "-", "*", "/", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "="];
for (let i = 0; i < simbols.length; i++) {
  let button = document.createElement("button");
  button.setAttribute("class", `button`);
  if (simbols[i] === "=") {
    button.setAttribute("id", "equal");
  }
  button.textContent = simbols[i];

  //Logic buttons
  button.addEventListener("click", (e) => {
    if (
      typeof Number(e.target.textContent) === "number" &&
      !isNaN(e.target.textContent)
    ) {
      //add value from the user
      tempValues += e.target.textContent;
    }
    if (
      e.target.textContent === "+" ||
      e.target.textContent === "/" ||
      e.target.textContent === "-" ||
      e.target.textContent === "*"
    ) {
      console.log(tempResult);
      //add operador to the stack
      operador.push(e.target.textContent);

      //check values not is empty and add
      if (tempValues !== "") {
        values.push(tempValues);
        //reset values
        tempValues = "";
        console.log(values);
      }
      // check have some result in the stack and operate with this
      if (tempResult > 0) {
        tempResult = operator(
          operador[0],
          Number(tempResult),
          Number(values[1])
        );
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
    if (e.target.textContent === "=") {
      values.push(tempValues);
      console.log(`soy values ${values}`);
      console.log(`soy result y temp result ${result} ${tempResult}`);
      console.log(values[0], values[1], tempResult);
      tempResult = operator(
        operador[0],
        Number(tempResult > 0 ? tempResult : values[0]),
        Number(values[1])
      );
      //reset values and result save
      console.log(`result ${result}`);
      console.log(`tempresult ${tempResult}`);
      tempValues = "";
      values = [];
      values.push(tempResult);
    }
    //result
  });
  containerButton.appendChild(button);
}
