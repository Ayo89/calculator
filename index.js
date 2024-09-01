
//Screen
let screenCal = document.createElement('div')
screenCal.setAttribute('id', 'screen')

let container = document.querySelector('#container');

container.appendChild(screenCal);

//Container Buttons
let containerButton = document.createElement('div');
containerButton.setAttribute('id', 'containerButton');
container.appendChild(containerButton)

//Buttons
let simbols = ['+', '-', '*', '/', 1,2,3,4,5,6,7,8,9,0, '=']
for (let i = 0; i < simbols.length; i++) {
        let button = document.createElement("button");
        button.setAttribute("class", "button");
        if (simbols[i] === '='){
            button.setAttribute('id', 'equal')
        }
        button.textContent = simbols[i];
        containerButton.appendChild(button);
}


