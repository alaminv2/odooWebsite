// Adding products to cart
var visible_items = document.querySelectorAll('.product');
for (let i = 0; i < visible_items.length; i++) {
    visible_items[i].addEventListener('click', () => {
        var image = visible_items[i].childNodes[1].childNodes[1];
        var name = String(visible_items[i].childNodes[1].childNodes[3].childNodes[0].textContent);
        var price = parseFloat(visible_items[i].childNodes[1].childNodes[5].childNodes[1].childNodes[0].textContent);
        var p_id = parseInt(visible_items[i].childNodes[1].childNodes[7].childNodes[0].textContent);
        addToCart(name, price, p_id);
    })
}

function addToCart(name, price, p_id) {
    console.log('add = ', name, price, p_id);
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
        'quantity': 1,
    }
    if (cart_items) {
        if (cart_items[p_id]) {
            cart_items[p_id].quantity = cart_items[p_id].quantity + 1;
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
    showingOnCart();
}

function showingOnCart() {
    var cart_items = JSON.parse(localStorage.getItem('cart_items'));
    var total_cost = parseFloat(localStorage.getItem('total_cost'));

    console.log('in show', cart_items);
    console.log('in show', total_cost);
    var cart = document.getElementById('cart_container');
    cart.innerHTML = '';

    if (cart_items && cart) {
        Object.values(cart_items).map(item => {
            cart.innerHTML += `
                <div class="row cart_item">
                    <div class="col-md-3 cart_item_pic">
                        <img class="img-fluid rounded" width="100%" src="./Chicken Curry Sandwich.jpeg" alt="">
                    </div>
                    <div class="col-md-9 cart_item_info">
                        <div>
                            <p class="name">${item.name}</p>
                            <p class="price">BDT ${item.price}</p>
                        </div>
                        <div>
                            <p class="quantity"><span>${item.quantity} Units</span> at BDT ${item.price} / Unit</p>
                        </div>
                        <a href="#" class="hide_delete">
                            <div class="cart_delete">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </div>
                        </a>
                    </div>
                </div>
            `
        });
    }
}

function calcTotalCost(price) {
    var total_cost = parseFloat(localStorage.getItem('total_cost'));
    total_cost += price;
    localStorage.setItem('total_cost', total_cost);
}


showingOnCart();
// Showing Cart item delete btn on hover
var cart_items = document.querySelectorAll('.cart_item');
for (let i = 0; i < cart_items.length; i++) {
    cart_items[i].addEventListener('mouseenter', () => {
        showDeleteBtn(cart_items[i]);
    })
    cart_items[i].addEventListener('mouseleave', () => {
        hideDeleteBtn(cart_items[i]);
    })
}

function showDeleteBtn(item) {
    target = item.childNodes[3].childNodes[5];
    target.classList.remove('hide_delete');
}

function hideDeleteBtn(item) {
    target = item.childNodes[3].childNodes[5];
    target.classList.add('hide_delete');
}


// Procedd button execution
var proceed = document.getElementById('proceed_btn');
proceed.addEventListener('click', () => {
    localStorage.clear();
    var cart = document.getElementById('cart_container');
    cart.innerHTML = '';
    showingOnCart();
})