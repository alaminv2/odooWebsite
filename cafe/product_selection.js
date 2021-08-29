var carts = document.querySelectorAll('.add_to_cart');
console.log(carts)
for (var i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', product_click);
}

function product_click(e) {
    console.log(e)
    alert('clicked');
    localStorage.setItem('cart_items', 45);
}

function onLoadPage() {
    var cart_items = localStorage.getItem('cart_items');
    cart_items = parseInt(cart_items);
    if (cart_items) {
        localStorage.setItem('cart_items', cart_items + 1);
    }
    console.log('cart_itemssds = ', cart_items);
}
onLoadPage();