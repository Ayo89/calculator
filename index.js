let value = [];
let value1 = 0;
let value2 = 0;
let operador = "";

const addValue = (num) => {
  let number = Number(num);
  value.push(number);
};

const totalValue = (arr) => {
  let result = Number(arr.join(''))
  return result;
};

const operator = (operator, num1, num2) => {
  const operatos = {
    "+": (num1, num2) => num1 + num2,
    "-": (num1, num2) => num1 - num2,
    "*": (num1, num2) => num1 * num2,
    "/": (num1, num2) => num1 / num2,
  };

  if (operatos[operator]) {
    return operatos[operator](num1, num2);
  } else {
    throw new Error("Operator no support");
  }
};

//Screen
let screenCal = document.createElement("div");
screenCal.setAttribute("id", "screen");

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
  button.addEventListener("click", (e) => {
    if (
      typeof Number(e.target.textContent) === "number" &&
      !isNaN(e.target.textContent)
    ) {
      addValue(e.target.textContent);
    }
    if (
      e.target.textContent === "+" ||
      e.target.textContent === "/" ||
      e.target.textContent === "-" ||
      e.target.textContent === "*"
    ) {
      operador = e.target.textContent;
      value1 = totalValue(value);
      value = [];
    }
    if (e.target.textContent === "=") {
      value2 = totalValue(value);
      let result = operator(operador, value1, value2);
      console.log(result);
    }
  });
  containerButton.appendChild(button);
}
