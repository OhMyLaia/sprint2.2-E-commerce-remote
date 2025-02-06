import products from "./products.js";
import { validate } from "./checkout.js";


let cart = [];
let totalWithDiscount = 0;
let subtotal = 0;
const toFindElement = (arr, item) => arr.find( element => element.id == item );
const resultDiv = htmlID => document.getElementById(htmlID);
function showMessage(message, div) { div.innerHTML = message; }
let cartList = resultDiv("cart_list");
let totalPriceDiv = resultDiv("total_price");
let subtotalPriceDiv = resultDiv("subtotal_price");
let numInCartButtonDiv = resultDiv("count_product");



function addEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach((button, i) => {
        button.addEventListener("click", () => buy(i + 1));
        itemsBoughtButton()
    })

    const openCartModal = document.querySelector(".open-cart-modal");
    if (openCartModal) {
        openCartModal.addEventListener("click", open_modal);
    }

}

addEventListeners();


function itemsBoughtButton() {
    let cartArrayLength = cart.length + 1;
    const countProduct = document.querySelector("#count_product");

    // if (cart.length == 0) {
    //     countProduct.innerHTML = cart.length;
    // } else {
        countProduct.innerHTML = cartArrayLength;
    // }
}


//* Exercise 1
function buy(id) {

    let itemToFind = toFindElement(products, id);
    let itemInCart = {};
    
    try {

        if (!itemToFind) {
            throw new Error(`Product ID:${id} not found`);

        } else {
            itemInCart = toFindElement(cart, id);
                if (itemInCart) {
                    console.log(itemInCart);
                    itemToFind.quantity++;
                    console.table(cart);

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
    showMessage("0", totalPriceDiv);
    showMessage("", cartList);
    totalWithDiscount = 0;
    subtotal = 0;

    console.log(`cart cleaned, totalWithDiscount -> ${totalWithDiscount}`);
    console.table(cart);
}

//* Exercise 3
function calculateTotal() {
    // asi cada vez que llame a la funcion no se suma el resultado
    // de la ultima vez que llame a la funcion
    totalWithDiscount = 0;
    subtotal = 0;
    let itemInCart = {};
    let itemsPrice = 0;

    try {
        if (cart.length == 0) {
            console.log(`Cart is empty`);
            return totalWithDiscount
        }

        for (let i = 0; i < cart.length ; i++) {
            itemInCart = cart[i];
            itemsPrice = parseFloat(itemInCart.price);
            // este bloque if añade el precio de cada producto de la cesta al totalWithDiscount
            if (itemInCart.hasOwnProperty("offer") && itemInCart.quantity >= itemInCart.offer.number) {
                totalWithDiscount += applyPromoToProduct(itemInCart);
                subtotal += itemInCart.quantity * itemsPrice;

            } else {
                totalWithDiscount += itemInCart.quantity * itemsPrice;
                subtotal += itemInCart.quantity * itemsPrice;
            }
        }
        console.log(`totalWithDiscount: ${totalWithDiscount}`)
        return totalWithDiscount.toFixed(2);
        
    } catch (error) {
        alert(error.message);
    }
}

// setTimeout(calculatetotalWithDiscount, 8000);

//* Exercise 4
function applyPromoToProduct(myProduct) {

    let totalQuantity = myProduct.quantity;
    if (totalQuantity == 0) return;

    let discountAmount = 0;
    let minItemsForPromo = myProduct.offer.number;
    let unitsInPromo = Math.floor(totalQuantity / minItemsForPromo) * minItemsForPromo;
    let restOfUnits = totalQuantity % minItemsForPromo;
    let priceWithDiscount = 0;

    //? no volvemos a comprobar si entra en la oferta porque llamamos a esta funcion en
    //? calculateTotal() y ahi ya hacemos las validaciones
    discountAmount = myProduct.price * unitsInPromo * myProduct.offer.percent / 100;
    priceWithDiscount = myProduct.price * unitsInPromo - discountAmount;
    // restOfUnits pasa a valer el total del precio de los productos que no entran en la promo
    restOfUnits *= myProduct.price;

    console.log((priceWithDiscount + restOfUnits).toFixed(2));
    return parseFloat((priceWithDiscount + restOfUnits).toFixed(2));

}

// Exercise 5
function printCart() {

    console.log(`totalWithDiscount printed: ${totalWithDiscount}`)
    showMessage("", cartList);
    showMessage(calculateTotal(), totalPriceDiv);

    cart.forEach(item => console.log(`checking item: ${item}`));
    
    cart.forEach( item => {
        const cartiListRow = document.createElement("tr");
        cartiListRow.innerHTML =
        `
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${(item.price * item.quantity).toFixed(2)}</td>
        `;

        if (item.offer) {
            showMessage(subtotal, subtotalPriceDiv);
        } else {
            showMessage(subtotal, subtotalPriceDiv);
        }
        
        cartList.appendChild(cartiListRow);
    });



}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {

}

function open_modal() {
    printCart();
    validate();
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

