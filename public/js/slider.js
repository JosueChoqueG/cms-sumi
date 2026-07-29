jQuery(function($) {     
	if ($('.dt_slider-carousel').length) {
        $('.dt_slider-carousel').owlCarousel({
			rtl: $("html").attr("dir") == 'rtl' ? true : false,
            loop: true,
			margin: 0,
			nav: true,
            dots: false,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			smartSpeed: 1000,
			autoplay: true,
			autoplayTimeout: atua_slider_options.animationSpeed,
            navText: [ '<span></span>', '<span></span>' ],
            responsive:{
                0:{
                    nav: false,
                    items: 1
                },
                600:{
                    nav: false,
                    items: 1
                },
                800:{
                    items: 1
                },
                1024:{
                    items: 1
                }
            }
        });
    }
});