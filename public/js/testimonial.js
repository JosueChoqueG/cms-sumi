jQuery(function($) {   
		 // Testimonials
			if ($('.dt_testimonials_carousel').length) {
				$(".dt_testimonials_carousel").owlCarousel({
					rtl: $("html").attr("dir") == 'rtl' ? true : false,
					margin: 25,
					loop: true,
					dots: true,
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
						600: {
							items: 2,
							nav: false
						},
						992: {
							stagePadding: 17,
							items: atua_testimonial_options.itemsCount,
							nav: false
						}
					}
				});
			}
});