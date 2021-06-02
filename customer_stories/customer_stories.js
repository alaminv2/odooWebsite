$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        // stagePadding: 50,
        loop: true,
        margin: 40,
        nav: true,
        dots: false,
        navigation: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 900,
        fluidSpeed: 900,
        autoplaySpeed: 900,
        navSpeed: 900,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
});