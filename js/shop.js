import products from "./products.js";
import { validate } from "./checkout.js";

let cart = [];
let totalWithDiscount = 0;
let subtotal = 0;
let totalQuantityOfItems = 0;

const toFindElement = (arr, item) => arr.find( element => element.id == item );
const resultDiv = htmlID => document.getElementById(htmlID);
function showMessage(message, div) { div.innerHTML = message; }

let cartList = resultDiv("cart_list");
let totalPriceDiv = resultDiv("total_price");
let subtotalPriceSpan = resultDiv("subtotal_price_span");
let subtotalPriceDiv = resultDiv("subtotal_price_div");

function addEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach((button, i) => {
        button.addEventListener("click", () => buy(i + 1));
        cartItemCounter()
    })

    const openCartModal = document.querySelector(".open-cart-modal");
    if (openCartModal) {
        openCartModal.addEventListener("click", open_modal);
    }

    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function(event) {
            event.preventDefault();
            validate();
        });
    }

    const submitBtn = document.querySelector("#btn-submit");
    if (submitBtn) {
        submitBtn.addEventListener("click", validate);
    }

    const cleanCartBtn = document.querySelector("#clean-cart-btn");
    if (cleanCartBtn) {
        cleanCartBtn.addEventListener("click", cleanCart);
    }
}
addEventListeners();

function cartItemCounter() {
    totalQuantityOfItems = cart.reduce((total, item) => total + item.quantity, 0)
    document.getElementById("count_product").innerText = totalQuantityOfItems;
}

function buy(id) {

    let itemToFind = toFindElement(products, id);
    let itemInCart = {};
    
    try {

        if (!itemToFind) {
            throw new Error(`Product ID:${id} not found`);

        } else {
            itemInCart = toFindElement(cart, id);
                if (itemInCart) {
                    itemToFind.quantity++;
                    cartItemCounter();

                } else {
                    itemToFind.quantity = 1;
                    cart.push(itemToFind);
                    cartItemCounter();
                }
        }

    } catch (error) {
        alert(error.message);
    }
    // in this case, we leave this console in order to check the cart array while testing the app
    console.table(cart);
}

function cleanCart() {
    cart = [];
    subtotal = 0;
    totalWithDiscount = 0;

    showMessage("0", totalPriceDiv);
    showMessage("", cartList);
    showMessage("", subtotalPriceSpan);
    showMessage("", subtotalPriceDiv);
}

function calculateTotal() {

    totalWithDiscount = 0;
    subtotal = 0;
    let itemInCart = {};
    let itemsPrice = 0;

    try {
        if (cart.length == 0) {
            return totalWithDiscount;
        }

        for (let i = 0; i < cart.length ; i++) {
            itemInCart = cart[i];
            itemsPrice = parseFloat(itemInCart.price);

            if (itemInCart.hasOwnProperty("offer") && itemInCart.quantity >= itemInCart.offer.number) {
                totalWithDiscount += applyPromoToProduct(itemInCart);
                subtotal += itemInCart.quantity * itemsPrice;

            } else {
                totalWithDiscount += itemInCart.quantity * itemsPrice;
                subtotal += itemInCart.quantity * itemsPrice;
            }
        }

        return totalWithDiscount.toFixed(2);
        
    } catch (error) {
        alert(error.message);
    }
}

function applyPromoToProduct(myProduct) {

    let totalQuantity = myProduct.quantity;
    if (totalQuantity == 0) return;

    let discountAmount = 0;
    let priceWithDiscount = 0;

    let minItemsForPromo = myProduct.offer.number;
    let unitsInPromo = Math.floor(totalQuantity / minItemsForPromo) * minItemsForPromo;
    let restOfUnits = totalQuantity % minItemsForPromo;

    discountAmount = myProduct.price * unitsInPromo * myProduct.offer.percent / 100;
    priceWithDiscount = myProduct.price * unitsInPromo - discountAmount;

    restOfUnits *= myProduct.price;

    return parseFloat((priceWithDiscount + restOfUnits).toFixed(2));
}

function increaseItemQuantityFunction (index) {

    let itemToModify = cart[index];

    if (itemToModify) {
        itemToModify.quantity++;
        document.getElementById(`quantity-${index}`).innerText = itemToModify.quantity;
    }
    printCart();
}
function decreaseItemQuantityFunction (index) {

    let itemToModify = cart[index];

    if (!itemToModify) {
        deleteItemFromCart(itemToModify);
        document.getElementById("cart_list").innerText = "";
    } else {
        itemToModify.quantity--;
        document.getElementById(`quantity-${index}`).innerText = itemToModify.quantity;
    }
    printCart();
}

function printCart() {

    showMessage("", cartList);
    showMessage(calculateTotal(), totalPriceDiv);
    
    cart.forEach((item, index) => {

        cartItemCounter();

        const cartiListRow = document.createElement("tr");

        const increaseItemQuantityBtn = document.createElement("button");
        increaseItemQuantityBtn.classList.add("sum-btn");
        increaseItemQuantityBtn.innerHTML = " + ";
        increaseItemQuantityBtn.setAttribute("data-index", index);
        increaseItemQuantityBtn.addEventListener("click", () => increaseItemQuantityFunction(index));

        const decreaseItemQuantityBtn = document.createElement("button");
        decreaseItemQuantityBtn.classList.add("subtract-btn");
        decreaseItemQuantityBtn.innerHTML = "  -  ";
        decreaseItemQuantityBtn.setAttribute("data-index", index);
        decreaseItemQuantityBtn.addEventListener("click", () => decreaseItemQuantityFunction(index));

        if (item.quantity !== 0) {

            cartiListRow.innerHTML =
            `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td id="quantity-${index}">${item.quantity}</td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartList.appendChild(cartiListRow);
    
            const buttonCell = document.createElement("td");
            buttonCell.appendChild(increaseItemQuantityBtn);
            buttonCell.appendChild(decreaseItemQuantityBtn);
            cartiListRow.appendChild(buttonCell);

        } else {
            cartiListRow.innerHTML = "";
        }

        document.querySelectorAll(".sum-btn").forEach(button => {
            button.addEventListener("click", () =>
                increaseItemQuantityFunction(item));
        });

        document.querySelectorAll(".subtract-btn").forEach(button => {
            button.addEventListener("click", () =>
                decreaseItemQuantityFunction(item));
        });

    });

    totalWithDiscount == 0 ?
    showMessage("", subtotalPriceSpan) :
    showMessage(`Subtotal: $ ${subtotal}`, subtotalPriceSpan);
}

function deleteItemFromCart(item) {
    if (item) {
        for (let i = 0 ; i < cart.length ; i++) {
            if (cart[i].id == item.id) {
                cart.splice(cart[i], 1);
    
            }
        }
    }
}

function open_modal() {
    printCart();
}