"use strict";

class Calculator {
    constructor(elozoSzamitasText, aktualSzamitasText) {
        this.elozoSzamitasText = elozoSzamitasText;
        this.aktualSzamitasText = aktualSzamitasText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.muvelet = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(muvelet) {
        if (this.currentOperand === '') return;

        if (this.previousOperand !== '') {
            this.kiszamol();
        }

        this.muvelet = muvelet;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    kiszamol() {
        let szamitas;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) {
            return;
        }

        switch (this.muvelet) {
            case '+':
                szamitas = prev + current;
                break;
            case '-':
                szamitas = prev - current;
                break;
            case '*':
                szamitas = prev * current;
                break;
            case '÷':
                szamitas = prev / current;
                break;
          
            default:
                return;
        }

        this.currentOperand = szamitas;
        this.muvelet = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString("hu-HU", {maximumFractionDigits: 0});
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay},${decimalDigits}`;
        }
        else{
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.aktualSzamitasText.innerText = this.getDisplayNumber(this.currentOperand);       

        if (this.muvelet != null) {
            this.elozoSzamitasText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.muvelet}`;
        }  
        else{
            this.elozoSzamitasText.innerText = '';
        }      
    }
}

const szamGombok = document.querySelectorAll('[data-number]');
const operatorGombok = document.querySelectorAll('[data-operator]');
const egyenlosegGomb = document.querySelector('[data-equals]');
const torolGomb = document.querySelector('[data-delete]');
const mindentTorol = document.querySelector('[data-all-clear]');
const elozoSzamitasText = document.querySelector('[data-previous-operand]')
const aktualSzamitasText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(elozoSzamitasText, aktualSzamitasText);

szamGombok.forEach(gomb => {
    gomb.addEventListener('click', () => {
        calculator.appendNumber(gomb.innerText);
        calculator.updateDisplay();
    })
})

operatorGombok.forEach(gomb => {
   
    gomb.addEventListener('click', () => {
        calculator.chooseOperation(gomb.innerText);
        calculator.updateDisplay();
    })
})

egyenlosegGomb.addEventListener('click', gomb => {
    calculator.kiszamol();
    calculator.updateDisplay();
})

mindentTorol.addEventListener('click', gomb => {
    calculator.clear();
    console.log(this.muvelet);
    calculator.updateDisplay();
})

torolGomb.addEventListener('click', gomb => {
    calculator.delete();
    calculator.updateDisplay();
})
