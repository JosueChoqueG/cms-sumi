(function($) {
    'use strict';

    // Button Split
    if ( document.body.classList.contains('btn--effect-two') || document.body.classList.contains('btn--effect-three') ) {
        document.querySelectorAll('.btn--effect-two .dt-btn .dt-btn-text, .btn--effect-three .dt-btn .dt-btn-text').forEach(button => button.innerHTML = `<span>` + button.textContent.trim().split('').join(`</span><span>`) + '</span>');
    }

    //Hide PreLoading
	function site_preloader() {
		if($('.dt_preloader').length){
			$('.dt_preloader').delay(1000).fadeOut(500);
		}
	}

    if ($(".dt_preloader-close").length) {
        $(".dt_preloader-close").on("click", function(){
            $('.dt_preloader').delay(200).fadeOut(500);
        });
    }

    //set animation timing
    var animationDelay = 2500,
        //loading bar effect
        barAnimationDelay = 3800,
        barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
        //letters effect
        lettersDelay = 50,
        //type effect
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800,
        //clip effect 
        revealDuration = 600,
        revealAnimationDelay = 1500;

    function initHeadline() {
        //insert <i> element for each letter of a changing word
        singleLetters($('.dt_heading.dt_heading_2').find('b'));
        singleLetters($('.dt_heading.dt_heading_3').find('b'));
        singleLetters($('.dt_heading.dt_heading_8').find('b'));
        singleLetters($('.dt_heading.dt_heading_9').find('b'));
        //initialise headline animation
        animateHeadline($('.dt_heading'));
    }

    function singleLetters($words) {
        $words.each(function() {
            var word = $(this),
                letters = word.text().split(''),
                selected = word.hasClass('is_on');
            for (var i in letters) {
                if (word.parents('.dt_heading_3').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
            }
            var newLetters = letters.join('');
            word.html(newLetters).css('opacity', 1);
        });
    }

    function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function() {
            var headline = $(this);

            if (headline.hasClass('dt_heading_4')) {
                duration = barAnimationDelay;
                setTimeout(function() {
                    headline.find('.dt_heading_inner').addClass('is-loading')
                }, barWaiting);
            } else if (headline.hasClass('dt_heading_6')) {
                var spanWrapper = headline.find('.dt_heading_inner'),
                    newWidth = spanWrapper.width() + 10
                spanWrapper.css('width', newWidth);
            } else if (!headline.hasClass('dt_heading_2')) {
                //assign to .dt_heading_inner the width of its longest word
                var words = headline.find('.dt_heading_inner b'),
                    width = 0;
                words.each(function() {
                    var wordWidth = $(this).width();
                    if (wordWidth > width) width = wordWidth;
                });
                headline.find('.dt_heading_inner').css('width', width);
            };

            //trigger animation
            setTimeout(function() {
                hideWord(headline.find('.is_on').eq(0))
            }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents('.dt_heading').hasClass('dt_heading_2')) {
            var parentSpan = $word.parent('.dt_heading_inner');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function() {
                parentSpan.removeClass('selected');
                $word.removeClass('is_on').addClass('is_off').children('i').removeClass('in').addClass('out');
            }, selectionDuration);
            setTimeout(function() {
                showWord(nextWord, typeLettersDelay)
            }, typeAnimationDelay);

        } else if ($word.parents('.dt_heading').hasClass('dt_heading_2') || $word.parents('.dt_heading').hasClass('dt_heading_3') || $word.parents('.dt_heading').hasClass('dt_heading_8') || $word.parents('.dt_heading').hasClass('dt_heading_9')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
            showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

        } else if ($word.parents('.dt_heading').hasClass('dt_heading_6')) {
            $word.parents('.dt_heading_inner').animate({
                width: '2px'
            }, revealDuration, function() {
                switchWord($word, nextWord);
                showWord(nextWord);
            });

        } else if ($word.parents('.dt_heading').hasClass('dt_heading_4')) {
            $word.parents('.dt_heading_inner').removeClass('is-loading');
            switchWord($word, nextWord);
            setTimeout(function() {
                hideWord(nextWord)
            }, barAnimationDelay);
            setTimeout(function() {
                $word.parents('.dt_heading_inner').addClass('is-loading')
            }, barWaiting);

        } else {
            switchWord($word, nextWord);
            setTimeout(function() {
                hideWord(nextWord)
            }, animationDelay);
        }
    }

    function showWord($word, $duration) {
        if ($word.parents('.dt_heading').hasClass('dt_heading_2')) {
            showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is_on').removeClass('is_off');

        } else if ($word.parents('.dt_heading').hasClass('dt_heading_6')) {
            $word.parents('.dt_heading_inner').animate({
                'width': $word.width() + 10
            }, revealDuration, function() {
                setTimeout(function() {
                    hideWord($word)
                }, revealAnimationDelay);
            });
        }
    }

    function hideLetter($letter, $word, $bool, $duration) {
        $letter.removeClass('in').addClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function() {
                hideLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else if ($bool) {
            setTimeout(function() {
                hideWord(takeNext($word))
            }, animationDelay);
        }

        if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
        }
    }

    function showLetter($letter, $word, $bool, $duration) {
        $letter.addClass('in').removeClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function() {
                showLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else {
            if ($word.parents('.dt_heading').hasClass('dt_heading_2')) {
                setTimeout(function() {
                    $word.parents('.dt_heading_inner').addClass('waiting');
                }, 200);
            }
            if (!$bool) {
                setTimeout(function() {
                    hideWord($word)
                }, animationDelay)
            }
        }
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    /*function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }*/

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is_on').addClass('is_off');
        $newWord.removeClass('is_off').addClass('is_on');
    }

    // Team Popup
    $('.dt_teams_toggle').on('click',function(e){
        e.preventDefault();
        $(this).parent().toggleClass('active');
    });

    if($('.dt_lightbox_img').length) {
		$('.dt_lightbox_img').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}
	
	if($('.wp-block-image a').length) {
		$('.wp-block-image').each(function() {
			// set the rel for each gallery
			$(this).find("a").attr('data-fancybox', 'gallery');
		});
		$('[data-fancybox="gallery"]').fancybox({
			buttons: [
				"slideShow",
				"thumbs",
				"zoom",
				"fullScreen",
				"share",
				"close"
			],
			loop: false,
			protect: true
		});
	}

    //Fact Counter + Text Count
	if($('.dt_count_box').length){
		$('.dt_count_box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".dt_count_text").attr("data-stop"),
				r = parseInt($t.find(".dt_count_text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".dt_count_text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".dt_count_text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".dt_count_text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}

    // Pricing Tab Content
    if ($('.dt_price').length) {
        function onPricing() {
            var m = 0;$('.dt_price .tab-content > .tab-pane.active').each(function(){ $(this).outerHeight(true) > m ? m = $(this).outerHeight(true) : '';});$( '.dt_price .tab-content' ).css('min-height', m);
        }$(window).on("resize", onPricing),$(window).on("load", onPricing);
    }

    /* ScrollAnimations */
	var scrollAnim = $('[data-animation]:not([data-animation-text]), [data-animation-box]');
	scrollAnim.scrollAnimations();

    // Tab Content
    $(".dt_tabs").each(function() {
        var myTabs = $(this);
        myTabs.find(".tabs li:first-child a").addClass("active");
        myTabs.find(".tab-content .tab-pane:first-child").addClass("active").addClass("show");
        myTabs.find(".tabs li a").click(function () {
            var tab_id = $(this).attr("data-tab");
            myTabs.find(".tabs li a").removeClass("active");
            myTabs.find(".tab-content .tab-pane").removeClass("active").removeClass("show");
            $(this).addClass("active");

            setTimeout(function () {
                $("#" + tab_id).addClass("active").addClass("show");
            }, 100);

            return false;
        });
    });

    // Top Up
    if ($('.dt_uptop').length) {
        var progressPath = document.querySelector('.dt_uptop path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function() {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > offset) {
                $('.dt_uptop').addClass('active');
            } else {
                $('.dt_uptop').removeClass('active');
            }
        });
        $('.dt_uptop').on('click', function(event) {
            event.preventDefault();

            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        });
    }

    // Progress Bar
	if ($('.dt_bar_inner').length) {
		$('.dt_bar_inner').appear(function(){
			var el = $(this);
			var percent = el.data('percent');
			$(el).css('width',percent).addClass('counted');
		},{accY: -50});
	}

    // Project
    activePostFilter();
    function activePostFilter(){
        var postFilter = $('.dt-filter-init');
        $.each(postFilter,function (index,value) {
            var el = $(this), parentClass = $(this).parent().parent().attr('class'), $selector = $('#'+el.attr('id'));
            $($selector).imagesLoaded(function () {
                var festivarMasonry = $($selector).isotope({
                    itemSelector: '.dt-filter-item',
                    percentPosition: true,
                    masonry: {
                        columnWidth: 0,
                        gutter:0
                    }
                });
                $(document).on('click', '.'+parentClass+' .dt-tab-filter a', function (e) {
                    e.preventDefault();
                    var filterValue = $(this).attr('data-filter');
                    festivarMasonry.isotope({
                        filter: filterValue
                    });
                });
            });
        });
    }
    $(document).on('click', '.dt-tab-filter a', function (e) {
        e.preventDefault();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

    //Accordion Box
	if($('.dt_accordion_box').length){
		$(".dt_accordion_box").on('click', '.dt_acc_btn', function() {
			
			var outerBox = $(this).parents('.dt_accordion_box');
			var target = $(this).parents('.dt_accordion');
			
			if($(this).hasClass('active')!==true) {
				$(outerBox).find('.dt_accordion .dt_acc_btn').removeClass('active');
			}
			
			if ($(this).next('.dt_acc_content').is(':visible')) {
				return false;
			} else {
				$(this).addClass('active');
				$(outerBox).children('.dt_accordion').removeClass('active');
				$(outerBox).find('.dt_accordion').children('.dt_acc_content').slideUp(300);
				target.addClass('active');
				$(this).next('.dt_acc_content').slideDown(300);	
			}
		});	
	}

    if($('body:not(.home) .paroller').length){
		$('.paroller').paroller({
			factor: 0.1,            // multiplier for scrolling speed and offset, +- values for direction control  
			factorLg: 0.1,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			type: 'foreground',     // background, foreground  
			direction: 'vertical' // vertical, horizontal  
		});
	}

	if($('body:not(.home) .paroller-2').length){
		$('body:not(.home) .paroller-2').paroller({
			factor: -0.1,            // multiplier for scrolling speed and offset, +- values for direction control  
			factorLg: -0.1,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			type: 'foreground',     // background, foreground  
			direction: 'vertical' // vertical, horizontal  
		});
	}

    //Parallax Scene for Icons
	if($('.parallax-scene-1').length){
		var scene = $('.parallax-scene-1').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-2').length){
		var scene = $('.parallax-scene-2').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-3').length){
		var scene = $('.parallax-scene-3').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-4').length){
		var scene = $('.parallax-scene-4').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-5').length){
		var scene = $('.parallax-scene-5').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-6').length){
		var scene = $('.parallax-scene-6').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-7').length){
		var scene = $('.parallax-scene-7').get(0);
		var parallaxInstance = new Parallax(scene);
	}

    // pieChart RoundCircle
	function roundCircles() {
		var rounderContainer = $('.piechart');
		if (rounderContainer.length) {
			rounderContainer.each(function () {
				var Self = $(this);
				var value = Self.data('value');
				var size = Self.parent().width();
				var color = Self.data('dt-color');

				Self.find('span').each(function () {
					var expertCount = $(this);
					expertCount.appear(function () {
						expertCount.countTo({
							from: 1,
							to: value*100,
							speed: 3000
						});
					});

				});
				Self.appear(function () {					
					Self.circleProgress({
						value: value,
						size: 100,
						thickness: 8,
						emptyFill: '#f2f2f2',
						animation: {
							duration: 3000
						},
						fill: {
							color: color
						}
					});
				});
			});
		};
	}

    // Breadcrumb effect  
    if ($(".dt_pagetitle .canvas").length) {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        let particlesArray = []
        window.addEventListener('resize', function () {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        })

        const mouse = {
            x: null,
            y: null
        }

        canvas.addEventListener('click', function (e) {
            mouse.x = e.x;
            mouse.y = e.y;
            for (let i = 0; i < 10; i++) {
                particlesArray.push(new Particle())
            }
        })

        canvas.addEventListener('mousemove', function (e) {
            mouse.x = e.x;
            mouse.y = e.y;
            for (let i = 0; i < 10; i++) {
                particlesArray.push(new Particle())
            }
        })
        class Particle {
            constructor() {
                this.x = mouse.x
                this.y = mouse.y
                this.size = Math.random() * 10 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = '#ffffff';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.1;
            }

            draw() {
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 0.4;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.stroke()
            }
        }

        function handleParticle() {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                if (particlesArray[i].size <= 0.3) {
                    particlesArray.splice(i, 1);
                    i--;
                }
            }
        }


        function animates() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            handleParticle()
            requestAnimationFrame(animates)
        }


        animates();
    }

    if ($('.dt_service').hasClass('dt_service--three')) {
        $(".dt_service--three .dt_item_inner").hover(function(){
            $(this).find('.dt_item_content').slideToggle(300);
            $(this).find('.dt_item_title').slideToggle(300);
        });
    }

   // Portfolio
    if ($('.dt_portfolio_carousel').length) {
        $(".dt_portfolio_carousel").owlCarousel({
            items: 1,
            rtl: $("html").attr("dir") == 'rtl' ? true : false,
            margin: 25,
            loop: true,
            dots: true,
            navText: ['<span></span>', '<span></span>'],
            autoHeight: true,
            autoplay: true,
            autoplayTimeout: 30000,
            smartSpeed: 2000,
            stagePadding: 50,
            responsive: {
                0: {
                    nav: false
                },
                576: {
                    nav: false
                },
                992: {
                    stagePadding: 105,
                    nav: false
                }
            }
        });
    }

    /* ==========================================================================
    Services Active Nine
    ========================================================================== */
    if ($(".dt_service--nine").length) {
        $('.dt_service--nine .dt_item_inner').hover(function () {
            $(this).find('.dt_item_hover').slideToggle(300);
            return false;
        });
        $('.dt_service--nine .dt_item_inner').hover(function () {
            $(this).find('.dt_item_holder .dt_item_title').slideToggle(300);
            $(this).find('.dt_item_holder .dt_item_content').slideToggle(300);
            $(this).find('.dt_item_icon').slideToggle(300);
            return true;
        });
    }
    
    /* ==========================================================================
    When document is loaded, do
    ========================================================================== */
	
	$(window).on('load', function() {
		site_preloader();
        roundCircles();
        initHeadline();
	});
    
})(jQuery);