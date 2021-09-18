window.addEventListener('load', () => {
    var item_container = document.querySelector('.item_container')
        // console.log(item_containers);
    var item_isotop = new Isotope(item_container, { itemSelector: '.item' });
    console.log('isotope = ', item_isotop)

    var items = document.querySelectorAll('.item_filters li')
    console.log('items = ', items);
    items.forEach(el => {
        el.addEventListener('click', () => {
            items.forEach(element => {
                element.style.background = 'transparent';
            });
            el.style.background = '#DC3545';
            console.log('class = ', el.getAttribute('data-fliter'))
            item_isotop.arrange({
                filter: el.getAttribute('data-fliter')
            })
        });
    });
});