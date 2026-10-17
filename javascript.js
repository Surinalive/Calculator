let firstNumber = undefined;
let secondNumber = undefined;
let operation = undefined;
let resultCalculated = false;


function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0) return "Can't divide by zero. Please press clear and try again";
    return a / b;
}


function operate(operator, a, ...b){
    let result;
    switch(operator){
        case("+"): result = add((Number(a)), Number(b[0])); break;
        case("-"): result =  subtract(Number(a), Number(b[0])); break;
        case("*"): result =  multiply(Number(a), Number(b[0])); break;
        case("/"): result = divide(Number(a), Number(b[0]));
    }

    return Number(result.toFixed(2));
}

const numbers = document.querySelectorAll(".number");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equal");
const operations = document.querySelectorAll(".operation");
const display = document.querySelector(".display");
const dot = document.querySelector("#dot");
const back = document.querySelector("#back");

for (const number of numbers){
    number.addEventListener("click", (e) => {

        if(firstNumber === undefined) {
            firstNumber = number.textContent;
            display.textContent = number.textContent;
            console.log(firstNumber);
            return;
        }

        if(operation === undefined) {
            if (resultCalculated) {
                firstNumber = number.textContent;
                display.textContent = number.textContent;
                resultCalculated = false;
            }
            else {
                firstNumber += number.textContent;
                display.textContent += number.textContent;
            }
            console.log(firstNumber + " " + operation);
            return;
        }

        if(operation !== undefined) {
            if(secondNumber === undefined) {
                secondNumber = number.textContent;
                display.textContent += number.textContent;
                console.log(firstNumber + " " + operation + " " + secondNumber);
                return;
            }
            secondNumber += number.textContent;
            display.textContent += number.textContent;
            console.log(firstNumber + " " + operation + " " + secondNumber);
            return;
        }

        //console.log(e);
        }
    );
}

for (const op of operations){
    op.addEventListener("click", (e) => {
        decimalPressed = false;
        if(firstNumber !== undefined && secondNumber === undefined){

            if(operation !== undefined){
                operation = op.textContent;
                display.textContent = firstNumber + op.textContent;
                console.log(op.textContent);
                return;
            }

            //deal with negation outright
            if(op.textContent === "+/-") {
                firstNumber = -Number(firstNumber);
                display.textContent = firstNumber;
                console.log(op.textContent);
                return;  
            }

            operation = op.textContent;
            display.textContent += op.textContent;
            console.log(op.textContent);
            return;
        }
        if(operation !== undefined && secondNumber !== undefined){

            //calculate and display result of first pair.
            let ans = operate(operation, firstNumber, secondNumber)

            console.log(ans)
            console.log(op.textContent);
            operation = op.textContent;

            //dealing with negation outright
            if(operation === "+/-") {
                ans = -ans;
                display.textContent = ans;
            }

            else display.textContent = ans + operation;
            firstNumber = ans;
            secondNumber = undefined;  
        }
    });
}

equal.addEventListener("click", (e) => { 

    if(firstNumber === undefined) return;

    if(secondNumber === undefined) return firstNumber;

    const ans = operate(operation, firstNumber, secondNumber)
    console.log(ans)
    display.textContent = ans;
    firstNumber = ans;
    secondNumber = undefined;
    operation = undefined;
    resultCalculated = true;
});

clear.addEventListener("click", (e) => {
    display.textContent = "|";
    firstNumber = undefined;
    secondNumber = undefined;
    operation = undefined;
});

dot.addEventListener("click", (e) => {
    if(firstNumber === undefined || resultCalculated){
        firstNumber = "0.";
        display.textContent = "0.";
        resultCalculated = false;
    }

    if(operation === undefined) {
        if(!String(firstNumber).includes(".")){
            firstNumber += ".";
            display.textContent += ".";
        }
    }

    if(operation !== undefined) {
        if(secondNumber === undefined){
            secondNumber = "0.";
            display.textContent += "0.";
        }

       if(!String(secondNumber).includes(".")){
            secondNumber += ".";
            display.textContent += ".";
        }

    }


});

back.addEventListener("click", (e) => {
    if(resultCalculated) return;
    if(firstNumber === undefined) return;

    if(operation === undefined) {
        firstNumber = String(firstNumber).slice(0, -1);
        if(firstNumber === "") firstNumber = undefined;
    } else 
    if(secondNumber !== undefined) {
        secondNumber = String(secondNumber).slice(0, -1);
        if(secondNumber === "") secondNumber = undefined;
    } else operation = undefined;

    display.textContent = (firstNumber ?? "") + (operation ?? "") + (secondNumber ?? "") || "|";
});
