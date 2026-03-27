// const myFun = () => {
//     // console.log("myFun running")
//     return () => {
//         alert("hello world 12345")
//     }
// }

// const new_function = myFun()

// new_function()




// practical
// Different discount functions

function noDiscount(price) {
    return price;
}

function tenPercentDiscount(price) {
    return price * 0.9;
}

function fiftyOff(price) {
    return price - 50;
}

// Higher-order function (takes function as argument)
function calculateFinalPrice(price, discountFunction) {
    return discountFunction(price);
}


// Using first-class functions
let price1 = calculateFinalPrice(500, noDiscount);
let price2 = calculateFinalPrice(500, tenPercentDiscount);
let price3 = calculateFinalPrice(500, fiftyOff);

console.log("No Discount:", price1);
console.log("10% Discount:", price2);
console.log("50 OFF:", price3);


