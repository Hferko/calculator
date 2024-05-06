"use strict";

let screen = document.querySelector('#screen');
let gombok = document.querySelectorAll('.gomb');
let operatorok = document.querySelectorAll('.operator');
let egyenlo = document.getElementById("equal");

function factorial(n) {
    if (!Number.isInteger(n)) return 'Nem pozitív egész szám';

    if (n == 1 || n == 0) return 1;
    else return (n * factorial(n - 1));
}


for (let elem of gombok) {
    if (elem === egyenlo) {
        egyenlo.addEventListener('click', () => {
            try {
                screen.value = eval(screen.value);
            }
            catch (err) {
                screen.value = "Error";
            }
        })
    }
    else {
        elem.addEventListener('click', (event) => {
            let gombText = event.target.innerText;
            screen.value += gombText;
        })
    }
}

function erorrHandler(action) {
    try {
        screen.value = action;
    }
    catch (err) {
        screen.value = "Error";
    }
}

for (let op of operatorok) {
    op.addEventListener('click', (e) => {
        let opText = e.target.value;
       
        switch (opText) {
            case 'AC':
                screen.value = "";
                break;

            case 'C':
                screen.value = screen.value.toString().slice(0, -1)
                break;

            case 'sin':
                console.log(screen.value);
                screen.value = Math.sin(screen.value);
                break;

            case 'cos':
                screen.value = Math.cos(screen.value);
                break;

            case 'tan':
                screen.value = Math.tan(screen.value);
                break;

            case 'x!':
                screen.value = factorial(Number(screen.value));
                break;

            case 'Pi':
                screen.value += Math.PI;
                break;

            case 'e':
                screen.value += Math.E;
                break;

            case 'log10':
                screen.value = Math.log10(screen.value);
                break;

            case 'gyok2':
                screen.value = Math.sqrt(screen.value);
                break;

            case 'gyok3':
                screen.value = Math.cbrt(screen.value);
                break;

            case 'x2':
                screen.value = Number(screen.value) * Number(screen.value);
                break;

            case '2x':
                screen.value = Math.pow(2, screen.value);
                break;

            case '1/x':
                screen.value = 1 / Number(screen.value);
                break;

            case 'x3':
                screen.value = Math.pow(screen.value, 3);
                break;

            case '+/-':
                screen.value = -1 *  Number(screen.value);
                break;

            default:
                break;
        }
    })
}


