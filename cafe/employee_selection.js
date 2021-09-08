var pay_now = document.getElementsByClassName('pay_now')[0];
var pay_later = document.getElementsByClassName('pay_later')[0];
var cards = document.querySelectorAll('.cards');
localStorage.removeItem('clicked_index');

console.log('url = ', document.URL)

// cards clicks background change
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
        var clicked_index = parseInt(localStorage.getItem('clicked_index'));
        console.log(clicked_index);
        if (clicked_index || clicked_index == 0) {
            console.log('ele = ', cards[clicked_index]);
            cards[clicked_index].style.background = '#263238';
            cards[clicked_index].style.color = 'rgb(241, 241, 241)';
        }
        // cards[i].style.background = '#455b66';
        cards[i].style.background = 'rgb(241, 241, 241)'
        cards[i].style.color = '#263238';
        localStorage.setItem('clicked_index', i);
    });
}

// payments button clicks
pay_now.addEventListener('click', () => {
    alert('pay now clicked')
});

pay_later.addEventListener('click', () => {
    alert('pay later clicked')
});

// Search bar
var input = document.getElementById('empl_search');
input.addEventListener('keyup', () => {
    var search_key = input.value;
    searchEmployee(search_key.toLowerCase());
});

function searchEmployee(search_key) {
    console.log('search_key = ', search_key);
    var empl_names = document.querySelectorAll('#empl_name');
    var empl_ids = document.querySelectorAll('#empl_id');
    for (i = 0; i < empl_names.length; i++) {
        var empl_name = empl_names[i].textContent;
        var empl_id = empl_ids[i].textContent;
        console.log(empl_name, empl_id);
        if (empl_name.toLowerCase().includes(search_key) || empl_id.toLowerCase().includes(search_key)) {
            empl_names[i].parentNode.parentNode.parentNode.style.display = 'block';
        } else {
            empl_names[i].parentNode.parentNode.parentNode.style.display = 'none';
        }
    }
};