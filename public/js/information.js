jQuery(function($) { 
		 // Service
    if ($('.dt_service_carousel').length) {
        $(".dt_service_carousel").owlCarousel({
            rtl: $("html").attr("dir") == 'rtl' ? true : false,
            margin: 25,
            loop: true,
            dots: false,
            navText: ['<span></span>', '<span></span>'],
            autoHeight: true,
            autoplay: true,
            autoplayTimeout: 30000,
            smartSpeed: 2000,
            stagePadding: 17,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                576: {
                    items: 2,
                    nav: false
                },
                992: {
                    stagePadding: 17,
                    items: atua_information_options.itemsCount,
                    nav: false
                }
            }
        });
    }
});