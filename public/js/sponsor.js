jQuery(function($) {  
		// Clients
		if ($('.dt_clients_carousel').length) {
			$(".dt_clients_carousel").owlCarousel({
				loop: true,
				margin: 25,
				smartSpeed: 500,
				autoplay: false,
				navText: ['<span></span>', '<span></span>'],
				responsive:{
					0: {
						items: 2,
						nav: false
					},
					600: {
						items: 3,
						nav: false
					},
					992: {
						items: atua_sponsor_options.itemsCount,
						nav: false
					}
				}
			});
		}
});