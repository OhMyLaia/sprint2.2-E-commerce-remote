"use strict"

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];
let total = 0;

//* Exercise 1
function buy(id) {

    let itemInCart = {};
    let itemToFind = products.find(item => item.id === id);
    
    try {
        if (!itemToFind) {
            throw new Error(`Product ID:${id} not found`);

        } else {
            itemInCart = cart.find(item => item.id === id);
                if (itemInCart) {
                    itemInCart.quantity++;

                } else {
                    itemToFind.quantity = 1;
                    cart.push(itemToFind);
                    console.log(`item pushed to cart`);
                    console.table(cart);
                }
        }
    } catch (error) {
        alert(error.message);
    }
}

//* Exercise 2
function cleanCart() {
    cart = [];
    total = 0;
    console.log(`cart cleaned, total -> ${total}`);
    console.table(cart);
}

//* Exercise 3
function calculateTotal() {
    let itemInCart = {};

    try {
        if (!itemInCart) {
            throw new Error(`Product ID:${id} not found`);

        } else if (cart.length == 0) {
            alert(`Cart is empty`);

        } else {
            for (let i = 0; i < cart.length ; i++) {
                itemInCart = cart[i];
                total += itemInCart.price;
            }
        }
        console.log(totalSum)
    } catch (error) {
        alert(error.message);
    }
}

//* Exercise 4
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

}



// Exercise 5
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    let cartList = document.getElementById("cart_list");
    cartList.innerHTML = "";

}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {

}

function open_modal() {
    printCart();
}

// id: 1,
// name: 'cooking oil',
// price: 10.5,
// type: 'grocery',
// offer: {
//     number: 3,
//     percent: 20
// }

// id: 3,
// name: 'Instant cupcake mixture',
// price: 5,
// type: 'grocery',
// offer: {
//     number: 10,
//     percent: 30
// }

