

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
    return a / b;
}

function negate(a) {
    return -a;
}

function operate(operator, a, ...b){
    
    switch(operator){
        case("+"): return add(a, b[0]);
        case("-"): 
        {
            if(!Number(b)) return negate(a);
            return subtract(a, b[0]);
        }

        case("*"): return multiply(a, b[0]);
        case("/"): return divide(a, b[0]);
        default: return negate(a);
    }
}