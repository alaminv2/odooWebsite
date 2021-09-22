// Modal login button Functionality
var modalLoginBtn = document.getElementById('modal_login_btn')
modalLoginBtn.addEventListener('click', () => {
    var db = document.getElementById('db').value
    var login = document.getElementById('login_mail')
    var pass = document.getElementById('login_pass')

    if (login.value === '' || pass.value === '') {
        document.getElementById('modal_err_msg').innerText = 'Please provide both email and password'
    } else {
        document.getElementById('modal_err_msg').innerText = '';
        const data = new FormData();
        data.append('db', db);
        data.append('login', login.value);
        data.append('password', pass.value);
        var xhr = new XMLHttpRequest();

        xhr.onload = (res) => {
            var response = JSON.parse(res.target.response)
            console.log('response = ', response)
            alert(response.login_success)
            if (response.login_success) {
                // document.cookie = `name=session_id`
                // console.log('cookie = ', decodeURIComponent(document.cookie))
                // window.location.href = 'http://0.0.0.0:8069/web#action=107&active_id=mailbox_inbox&cids=1&menu_id=83';
            } else {
                document.getElementById('modal_err_msg').innerText = response.error;
            }
        }
        xhr.open('POST', 'http://0.0.0.0:8069/outside_login', true)
        xhr.send(data);
    }
})

// Concerns details show on concern click
var all_concerns = document.querySelectorAll('.concern_btn');
var all_concern_infos = document.querySelectorAll('.concern_info');
// console.log('concerns = ', all_concerns);

for (let i = 0; i < all_concerns.length; i++) {
    if (i != 0)
        all_concern_infos[i].style.display = 'none';
    all_concerns[i].addEventListener('click', () => {
        // alert(all_concerns[i].textContent)
        for (let j = 0; j < all_concern_infos.length; j++) {
            all_concern_infos[j].style.display = 'none';
            all_concerns[j].classList.remove('filter-active');
        }
        all_concerns[i].classList.add('filter-active');
        all_concern_infos[i].style.display = '';
        all_concern_infos[i].fadeOut('slow');

    });
};