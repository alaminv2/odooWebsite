console.log('execution start');

showingItemsOnCart();
// Adding products to cart
var visible_items = document.querySelectorAll('.product');
for (let i = 0; i < visible_items.length; i++) {
    visible_items[i].addEventListener('click', () => {
        var img_path = String(visible_items[i].childNodes[1].childNodes[1].getAttribute('src'));
        var name = String(visible_items[i].childNodes[1].childNodes[3].childNodes[0].textContent);
        var price = parseFloat(visible_items[i].childNodes[1].childNodes[5].childNodes[1].childNodes[0].textContent);
        var p_id = parseInt(visible_items[i].childNodes[1].childNodes[7].childNodes[0].textContent);
        addToCart(name, price, p_id, img_path);
    })
}



// Showing Cart item delete btn on hover
var cart_items = document.querySelectorAll('.cart_item');
for (let i = 0; i < cart_items.length; i++) {
    cart_items[i].addEventListener('mouseenter', () => {
        showCartItemBtns(cart_items[i]);
    })
    cart_items[i].addEventListener('mouseleave', () => {
        hideCartItemBtns(cart_items[i]);
    })
}

// Delete items from carts
var dlt_btns = document.querySelectorAll('#dlt');
for (let i = 0; i < dlt_btns.length; i++) {
    dlt_btns[i].addEventListener('click', () => {
        deleteItemFromCart(dlt_btns[i].parentNode.parentNode);
    });
}

// Decrease quantity of a cart item
var minus_btns = document.querySelectorAll('#minus');
for (let i = 0; i < minus_btns.length; i++) {
    minus_btns[i].addEventListener('click', () => {
        decreaseItemQty(minus_btns[i].parentNode.parentNode);
    });
}

// Increase quantity of a cart item
var plus_btns = document.querySelectorAll('#plus');
for (let i = 0; i < plus_btns.length; i++) {
    plus_btns[i].addEventListener('click', () => {
        increaseItemQty(plus_btns[i].parentNode.parentNode);
    });
}


// Procedd button execution
var proceed = document.getElementById('proceed_btn');
proceed.addEventListener('click', () => {
    // localStorage.clear();
    // var cart = document.getElementById('cart_container');
    // cart.innerHTML = '';
    // showingItemsOnCart();
    var url = window.location.origin + '/employee_selection.html';
    window.location.href = url;
})
console.log('execution end');


function addToCart(name, price, p_id, img_path) {
    console.log('adding to cart = ', name, price, p_id, img_path);
    // increasing item number in cart
    var cart_item_number = localStorage.getItem('cart_item_number');
    if (cart_item_number) {
        cart_item_number = parseInt(cart_item_number);
        localStorage.setItem('cart_item_number', cart_item_number + 1);
    } else {
        localStorage.setItem('cart_item_number', 1);
        localStorage.setItem('total_cost', 0);
    }
    // adding the product to localStorage object
    var cart_items = JSON.parse(localStorage.getItem('cart_items'));
    var new_product = {
        'id': p_id,
        'name': name,
        'price': price,
        'img_path': img_path,
        'quantity': 1,
    }
    if (cart_items) {
        if (cart_items[p_id]) {
            cart_items[p_id].quantity += 1;
        } else {
            cart_items[p_id] = new_product;
        }
    } else {
        cart_items = {
            [p_id]: new_product
        }
    }
    localStorage.setItem('cart_items', JSON.stringify(cart_items));
    calcTotalCost(price);
    showingItemsOnCart();
    essentialsFunc();
}

function showingItemsOnCart() {
    var cart_items = JSON.parse(localStorage.getItem('cart_items'));
    var total_cost = parseFloat(localStorage.getItem('total_cost'));

    console.log('in show cart_items = ', cart_items);
    console.log('in show total cost = ', total_cost);
    var cart = document.getElementById('cart_container');
    cart.innerHTML = '';

    if (cart_items && cart) {
        Object.values(cart_items).map(item => {
            cart.innerHTML += `
                <div class="row cart_item">
                    <div class="col-md-3 cart_item_pic">
                        <img class="img-fluid rounded" width="100%" src="${item.img_path}" alt="">
                    </div>
                    <div class="col-md-9 cart_item_info">
                        <div>
                            <p style="display: none;">${item.id}</p>
                            <p class="name">${item.name}</p>
                            <p class="price">BDT ${item.price}</p>
                        </div>
                        <div>
                            <p class="quantity"><span>${item.quantity} Units</span> at BDT ${item.price} / Unit</p>
                        </div>
                        <div class="cart_item_btns hide_element">
                            <a id="plus" href="#" class="">
                                <div class="plus">
                                    <i class="fas fa-plus"></i>
                                </div>
                            </a>
                            <a id="minus" href="#" class="">
                                <div class="minus">
                                    <i class="fas fa-minus"></i>
                                </div>
                            </a>
                            <a id="dlt" href="#" class="">
                                <div class="dlt">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            `
        });
        if (cart.innerHTML != '') {
            cart.innerHTML += `
            <div class="row cart_total">
                <p class="text-center">Total: <span>${total_cost}</span> tk</p>
            </div>
            `
        }
    }
}

function calcTotalCost(price) {
    var total_cost = parseFloat(localStorage.getItem('total_cost'));
    total_cost += price;
    localStorage.setItem('total_cost', total_cost);
}

function showCartItemBtns(item) {
    target = item.childNodes[3].childNodes[5];
    target.classList.remove('hide_element');
}

function hideCartItemBtns(item) {
    target = item.childNodes[3].childNodes[5];
    target.classList.add('hide_element');
}

function deleteItemFromCart(item) {
    var p_id = parseInt(item.childNodes[1].childNodes[1].childNodes[0].textContent);
    // Updating cart items
    var cart_items = JSON.parse(localStorage.getItem('cart_items'));
    var cart_item_number = parseInt(localStorage.getItem('cart_item_number'));
    var total_cost = parseFloat(localStorage.getItem('total_cost'));

    var p_qty = cart_items[p_id].quantity;
    var p_cost = cart_items[p_id].price * p_qty;

    delete cart_items[p_id];

    // Updating locastorage values
    console.log('updated cart = ', cart_items);
    localStorage.setItem('cart_items', JSON.stringify(cart_items));
    localStorage.setItem('cart_item_number', cart_item_number - p_qty);
    localStorage.setItem('total_cost', total_cost - p_cost);
    showingItemsOnCart();
    essentialsFunc();
}

function decreaseItemQty(item) {
    var p_id = parseInt(item.childNodes[1].childNodes[1].childNodes[0].textContent);

    var cart_items = JSON.parse(localStorage.getItem('cart_items'));
    var cart_item_number = parseInt(localStorage.getItem('cart_item_number'));
    var total_cost = parseFloat(localStorage.getItem('total_cost'));

    if (cart_items[p_id].quantity == 1) {
        deleteItemFromCart(item);
    } else {
        cart_items[p_id].quantity -= 1;
        cart_item_number -= 1;
        total_cost -= cart_items[p_id].price;

        localStorage.setItem('cart_items', JSON.stringify(cart_items));
        localStorage.setItem('cart_item_number', cart_item_number);
        localStorage.setItem('total_cost', total_cost);
        showingItemsOnCart();
        essentialsFunc();
    }
}

function increaseItemQty(item) {
    var p_id = parseInt(item.childNodes[1].childNodes[1].childNodes[0].textContent);

    var cart_items = JSON.parse(localStorage.getItem('cart_items'));
    var cart_item_number = parseInt(localStorage.getItem('cart_item_number'));
    var total_cost = parseFloat(localStorage.getItem('total_cost'));

    cart_items[p_id].quantity += 1;
    cart_item_number += 1;
    total_cost += cart_items[p_id].price;

    localStorage.setItem('cart_items', JSON.stringify(cart_items));
    localStorage.setItem('cart_item_number', cart_item_number);
    localStorage.setItem('total_cost', total_cost);
    showingItemsOnCart();
    essentialsFunc();
}

function essentialsFunc() {
    // Showing Cart item delete btn on hover
    var cart_items = document.querySelectorAll('.cart_item');
    for (let i = 0; i < cart_items.length; i++) {
        cart_items[i].addEventListener('mouseenter', () => {
            showCartItemBtns(cart_items[i]);
        })
        cart_items[i].addEventListener('mouseleave', () => {
            hideCartItemBtns(cart_items[i]);
        })
    }

    // Delete items from carts
    var dlt_btns = document.querySelectorAll('#dlt');
    for (let i = 0; i < dlt_btns.length; i++) {
        dlt_btns[i].addEventListener('click', () => {
            deleteItemFromCart(dlt_btns[i].parentNode.parentNode);
        });
    }

    // Decrease quantity of a cart item
    var minus_btns = document.querySelectorAll('#minus');
    for (let i = 0; i < minus_btns.length; i++) {
        minus_btns[i].addEventListener('click', () => {
            decreaseItemQty(minus_btns[i].parentNode.parentNode);
        });
    }

    // Increase quantity of a cart item
    var plus_btns = document.querySelectorAll('#plus');
    for (let i = 0; i < plus_btns.length; i++) {
        plus_btns[i].addEventListener('click', () => {
            increaseItemQty(plus_btns[i].parentNode.parentNode);
        });
    }
}