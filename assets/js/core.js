
"use strict";

var ashade = {},
    $ashade_html = jQuery('html'),
	ashade_tns = [],
    $ashade_body = jQuery('body'),
    $ashade_window = jQuery(window),
    $ashade_header = jQuery('header#ashade-header'),
    $ashade_footer = jQuery('footer#ashade-footer'),
	$ashade_main = jQuery('main.ashade-content-wrap'),
	$ashade_scroll = jQuery('.ashade-content-scroll'),
	$ashade_header_holder;













// Smooth Scroll
ashade.old_scroll_top = 0;
ashade.sScroll = {
	target: 0,
	current: 0,
	animate: function() {
		ashade.sScroll.current += ((ashade.sScroll.target - ashade.sScroll.current) * ashade.config.smooth_ease);
		$ashade_scroll.css('transform', 'translate3d(0, -'+ ashade.sScroll.current +'px, 0)');
		requestAnimationFrame( ashade.sScroll.animate );
	},
	layout: function() {
		if ($ashade_scroll.length) {
			let this_content = $ashade_scroll.children('.ashade-content');
			this_content.css('min-height', '0px');
			
			// Set Body Height (for smooth scroll)
			if ($ashade_scroll.height() <= $ashade_window.height()) {
				let min_height = $ashade_window.height() - $ashade_footer.height();

				if (!$ashade_body.hasClass('no-header-padding'))
					min_height = min_height - $ashade_scroll.children('.ashade-header-holder').height();

				this_content.css('min-height', min_height+'px');				
				$ashade_scroll.addClass('is-centered');
			} else {
				$ashade_scroll.removeClass('is-centered');
			}

			if ($ashade_body.hasClass('ashade-smooth-scroll')) {
				$ashade_body.height($ashade_scroll.height());
			}
		}
	}
};
if ($ashade_scroll.length || $ashade_body.hasClass('ashade-home-template')) {
	ashade.sScroll.animate();
}

ashade.init = function() {
	$ashade_body.addClass('is-init');
	ashade.old_scroll_top = $ashade_window.scrollTop();
	
	// Header Holder
	$ashade_header_holder = jQuery('<div class="ashade-header-holder"></div>');
	$ashade_header_holder.height($ashade_header.height()).prependTo($ashade_scroll);
	
	// Set Logo Size
	if (jQuery('a.ashade-logo').length) {
		jQuery('a.ashade-logo').each(function() {
			let $this = jQuery(this),
				$img = $this.children('img'),
				w = $img.attr('width'),
				h = $img.attr('height');
			if ($this.hasClass('is-retina')) {
				$this.width(w/2).height(h/2);
			} else {
				$this.width(w).height(h);
			}
		});
	}
	
	// Set Menu Active Parent Items
	if (jQuery('.current-menu-item').length) {
		jQuery('.current-menu-item').each(function() {
			jQuery(this).parents('li').addClass('current-menu-ancestor');
		});
	}
	
	// Mobile DOM Construct
	if (jQuery('.ashade-page-title-wrap').length) {
		if (jQuery('.ashade-content-wrap .ashade-content').length) {
			let ashade_mobile_title = jQuery('<div class="ashade-mobile-title-wrap">' + jQuery('.ashade-page-title-wrap').html() + '</div>');
			jQuery('.ashade-content-wrap .ashade-content').prepend(ashade_mobile_title);
		}
	}
	let ashade_mobile_header = jQuery('<div class="ashade-mobile-header">'),
		mobile_menu_button = jQuery('<a href="#" class="ashade-mobile-menu-button"><i class="la la-bars"></i></a>').appendTo(ashade_mobile_header),
		mobile_menu = jQuery('<nav class="ashade-mobile-menu"></nav>').appendTo($ashade_body),
		mobile_menu_close = jQuery('<a href="#" class="ashade-mobile-menu-close"></a>').appendTo(mobile_menu);
	
	if (jQuery('.ashade-aside-overlay').length) {
		ashade_mobile_header.append('\
			<a class="ashade-aside-toggler" href="#">\
				<span class="ashade-aside-toggler__icon01"></span>\
				<span class="ashade-aside-toggler__icon02"></span>\
				<span class="ashade-aside-toggler__icon03"></span>\
			</a>');
	}
	
	// Mobile Meintenance Email
	if ($ashade_body.hasClass('ashade-maintenance-wrap')) {
		ashade_mobile_header.prepend('<a class="ashade-contacts-toggler" href="#"><i class="la la-envelope"></i></a>');		
		jQuery(document).on('click', '.ashade-contacts-toggler', function() {
			$ashade_body.addClass('contacts-shown');
		});
		jQuery(document).on('click', '.ashade-contacts-close', function() {
			$ashade_body.removeClass('contacts-shown');
		});
	}

	$ashade_header.find('.ashade-nav-block').append(ashade_mobile_header);
	
	if ($ashade_header.find('.ashade-nav').length) {
		mobile_menu.append('\
			<div class="ashade-mobile-menu-inner">\
				<div class="ashade-mobile-menu-content">\
					'+ $ashade_header.find('.ashade-nav').html() +'\
				</div>\
			</div>\
		');
		mobile_menu.find('ul.main-menu a').on('click', function(e) {
			var $this = jQuery(this),
				$parent = $this.parent();
			if ($parent.hasClass('.menu-item-has-children') || $parent.find('ul').length) {
				e.preventDefault();
				$parent.children('ul').slideToggle(300).toggleClass('is-open');
			}
		});
		mobile_menu.find('ul.sub-menu').slideUp(1);
	}
	
	mobile_menu_button.on('click', function() {
		$ashade_body.addClass('ashade-mobile-menu-shown').addClass('is-locked');
		ashade.old_scroll_top = $ashade_window.scrollTop();
		gsap.fromTo('.ashade-mobile-menu ul.main-menu > li', 
			{
				x: 0,
				y: 40,
				opacity: 0,
			},
			{
				x: 0,
				y: 0,
				opacity: 1,
				duration: 0.2,
				delay: 0.3,
				stagger: 0.1,
				onComplete: function() {
					$ashade_body.removeClass('is-locked');
				}
			},
		);
	});
	

	jQuery('.ashade-menu-overlay').on('click', function() {
		$ashade_body.removeClass('ashade-mobile-menu-shown').removeClass('is-locked');
	});
	
	// Aside Open and Close
	jQuery(document).on('click', 'a.ashade-aside-toggler', function(e) {
		e.preventDefault();
		$ashade_body.addClass('ashade-aside-shown').removeClass('ashade-menu-fade');
		ashade.old_scroll_top = $ashade_window.scrollTop();
	});
	jQuery('a.ashade-aside-close').on('click', function(e) {
		e.preventDefault();
		$ashade_body.removeClass('ashade-aside-shown');
	});
	jQuery('.ashade-aside-overlay').on('click', function() {
		$ashade_body.removeClass('ashade-aside-shown');
	});

    // Main Nav Events
    jQuery('nav.ashade-nav a').on( 'mouseenter', function() {
        $ashade_body.addClass('ashade-menu-fade');
    });
    jQuery('nav.ashade-nav').on( 'mouseleave', function() {
        $ashade_body.removeClass('ashade-menu-fade');
    });

	// Back Button Functions 
	jQuery('.ashade-back').on('click', function(e) {
		e.preventDefault();
		var $this = jQuery(this);
		
		// Back to Top
		if ($this.hasClass('is-to-top')) {
			if ($ashade_window.scrollTop() > $ashade_window.height()/2) {
				$ashade_body.addClass('has-to-top');
			}
			$this.addClass('in-action');
			
			jQuery('html, body').stop().animate({scrollTop: 0}, 500, function() {
				$ashade_body.removeClass('has-to-top');
				$this.removeClass('in-action');
			});
		}
		
		// Maintenace Mode - Write Message
		if ($this.hasClass('is-message')) {
			$ashade_body.addClass('is-locked in-message-mode');
			$this.parent().removeClass('is-loaded');
			gsap.to('.ashade-content-wrap .ashade-content', {
				opacity: 0,
				y: -150,
				duration: 0.7,
				onComplete: function() {
					jQuery('.ashade-back-wrap .is-message').hide();
					jQuery('.ashade-back-wrap .is-message-close').show();
				}
			});
			gsap.to('.ashade-page-background', {
				opacity: 0,
				scale: 1.05,
				duration: 1,
			});
			gsap.to('#ashade-contacts-wrap', {
				opacity: 1,
				y: 0,
				duration: 0.7,
				delay: 0.3,
				onComplete: function() {
					$ashade_body.removeClass('is-locked');
					jQuery('.ashade-back-wrap').addClass('is-loaded');
				}
			});
		}
		
		// Maintenace Mode - Close Message
		if ($this.hasClass('is-message-close')) {
			$ashade_body.addClass('is-locked').removeClass('in-message-mode');
			$this.parent().removeClass('is-loaded');
			gsap.to('#ashade-contacts-wrap', {
				opacity: 0,
				y: 150,
				duration: 0.7,
				onComplete: function() {
					jQuery('.ashade-back-wrap .is-message').show();
					jQuery('.ashade-back-wrap .is-message-close').hide();
				}
			});
			gsap.to('.ashade-page-background', {
				opacity: 0.13,
				scale: 1,
				duration: 1,
			});
			gsap.to('.ashade-content-wrap .ashade-content', {
				opacity: 1,
				y: 0,
				duration: 1,
				delay: 0.3,
				onComplete: function() {
					$ashade_body.removeClass('is-locked');
					jQuery('.ashade-back-wrap').addClass('is-loaded');
				}
			});
		}
		
		// Home Return
		if ($this.hasClass('is-home-return')) {
			$ashade_body.addClass('is-locked');
			gsap.fromTo('.ashade-content', 1, {
				y: 0,
				opacity: 1,
			},
			{
				y: -100,
				opacity: 0,
				duration: 1,
				onComplete: function() {
					if ($ashade_scroll.find('#ashade-home-works').length) {
						var $current_content = jQuery('#ashade-home-works');
					}
					if ($ashade_scroll.find('#Technology-home-works').length) {
						var $current_content = jQuery('#Technology-home-works');
					}
					
					if ($ashade_scroll.find('#Manpower-home-works').length) {
						var $current_content = jQuery('#Manpower-home-works');
					}
					
					if ($ashade_scroll.find('#TrainingArea-home-works').length) {
						var $current_content = jQuery('#TrainingArea-home-works');
					}
					
					if ($ashade_scroll.find('#ashade-home-contacts').length) {
						var $current_content = jQuery('#ashade-home-contacts');
					}
					for (var i = 0; i < 4; i++) {
						$current_content.unwrap();
					}
					ashade.sScroll.layout();
					$ashade_body.height($ashade_window.height());
				}
			});
			
			if (jQuery('.ashade-page-title-wrap').length) {
				jQuery('.ashade-page-title-wrap').removeClass('is-loaded').addClass('is-inactive');			
				gsap.to('.ashade-page-title-wrap', 0.5, {
					css: {
						top: 0,
					},
					delay: 0.5,
				});
			}
			if (jQuery('.ashade-back-wrap').length) {
				jQuery('.ashade-back-wrap').removeClass('is-loaded').addClass('is-inactive');
				gsap.to('.ashade-back-wrap', 0.5, {
					css: {
						top: '200%',
					},
					delay: 0.5,
				});				
			}
			gsap.to('.openBtnMarketSurvey', 0.5, {
				css: {
					top: '100%',
				},
				delay: 1,
				onComplete: function() {
					jQuery('.openBtnMarketSurvey').addClass('is-loaded').removeClass('is-inactive');
				}
			});
			gsap.to('.openBtnTechnology', 0.5, {
				css: {
					top: '100%',
				},
				delay: 1,
				onComplete: function() {
					jQuery('.openBtnTechnology').addClass('is-loaded').removeClass('is-inactive');
				}
			});
			gsap.to('.openBtnManpower', 0.5, {
				css: {
					top: '100%',
				},
				delay: 1,
				onComplete: function() {
					jQuery('.openBtnManpower').addClass('is-loaded').removeClass('is-inactive');
				}
			});
			gsap.to('.openBtnTrainingArea', 0.5, {
				css: {
					top: '100%',
				},
				delay: 1,
				onComplete: function() {
					jQuery('.openBtnTrainingArea').addClass('is-loaded').removeClass('is-inactive');
				}
			});
			gsap.to('.ashade-home-link--contacts', 0.5, {
				css: {
					top: '100%',
				},
				delay: 1,
				onComplete: function() {
					jQuery('.ashade-home-link--contacts').addClass('is-loaded').removeClass('is-inactive');
				}
			});
			gsap.to('.ashade-page-background', {
				opacity: 0.75,
				scale: 1,
				duration: 1,
				delay: 1,
				onComplete: function() {
					$ashade_body.removeClass('ashade-content-shown');
					$ashade_body.removeClass('is-locked');
				}
			});
		}
	});	
	

	// Page Background
	if (jQuery('.ashade-page-background[data-src]').length) {
		jQuery('.ashade-page-background[data-src]').each(function() {
			jQuery(this).css('background-image', 'url('+ jQuery(this).data('src') +')');
		});
	}
	// Home Template
    if ($ashade_body.hasClass('ashade-home-template')) {	
		// Home Links Events
		jQuery('.ashade-home-link').on('mouseenter', function() {
			$ashade_body.addClass('is-faded');
		}).on('mouseleave', function() {
			$ashade_body.removeClass('is-faded');
		}).on('click', function(){
			var $this = jQuery(this);
			ashade.cursor.$el.removeClass('int-link');
			$ashade_body.removeClass('is-faded').addClass('ashade-content-shown');
			jQuery('.openBtnMarketSurvey').addClass('is-inactive');
			jQuery('.openBtnTechnology').addClass('is-inactive');
			jQuery('.openBtnManpower').addClass('is-inactive');
			jQuery('.openBtnTrainingArea').addClass('is-inactive');
			
			gsap.to('.ashade-page-background', {
				opacity: 0.1,
				scale: 1.05,
				duration: 1,
				delay: 0.5,
			});
			gsap.to('.openBtnMarketSurvey', 0.5, {
				css: {
					top: 0,
				},
				delay: 0.5,
			});
			gsap.to('.openBtnTechnology', 0.5, {
				css: {
					top: 0,
				},
				delay: 0.5,
			});
			gsap.to('.openBtnManpower', 0.5, {
				css: {
					top: 0,
				},
				delay: 0.5,
			});
			gsap.to('.openBtnTrainingArea', 0.5, {
				css: {
					top: 0,
				},
				delay: 0.5,
			});
			gsap.to('.ashade-home-link--contacts', 0.5, {
				css: {
					top: '200%',
				},
				delay: 0.5,
			});
			
			jQuery('.ashade-page-title').empty().append('<span>' + $this.find('span:first-child').text() + '</span>' + $this.find('span:last-child').text()).removeClass('is-inactive');
			jQuery('.ashade-home-return').removeClass('is-inactive');
			
			gsap.to('.ashade-page-title-wrap', 0.5, {
				css: {
					top: '100%',
				},
				delay: 1,
				onComplete: function() {
					jQuery('.ashade-page-title-wrap').addClass('is-loaded').removeClass('is-inactive');
				}
			});
			gsap.to('.ashade-back-wrap', 0.5, {
				css: {
					top: '100%',
				},
				delay: 1,
				onComplete: function() {
					jQuery('.ashade-back-wrap').addClass('is-loaded').removeClass('is-inactive');
				}
			});
			
			if ($this.parent().hasClass('openBtnMarketSurvey')) {
				var $current_content = jQuery('#ashade-home-works');
			}
			if ($this.parent().hasClass('openBtnTechnology')) {
				var $current_content = jQuery('#Technology-home-works');
			}
			if ($this.parent().hasClass('openBtnManpower')) {
				var $current_content = jQuery('#Manpower-home-works');
			}
			if ($this.parent().hasClass('openBtnTrainingArea')) {
				var $current_content = jQuery('#TrainingArea-home-works');
			}
			
			if ($this.parent().hasClass('ashade-home-link--contacts')) {
				var $current_content = jQuery('#ashade-home-contacts');
			}
			
			$current_content.wrap('\
				<main class="ashade-content-wrap">\
					<div class="ashade-content-scroll">\
						<div class="ashade-content">\
							<section class="ashade-section"></section>\
						</div><!-- .ashade-content -->\
					</div><!-- .ashade-content-scroll -->\
				</main>\
			');

			if ($ashade_body.hasClass('ashade-smooth-scroll')) {
				$ashade_scroll = $ashade_body.find('.ashade-content-scroll');
				$ashade_body.height($ashade_scroll.height());
			}				
			ashade.layout();
			
			gsap.fromTo('.ashade-content', 1, {
				y: 100,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 1,
				delay: 1.2,
			});
		});
    }

	// All Links Events
	jQuery('a').on('click', function(e) {
		var $this = jQuery(this),
			this_href = $this.attr('href');
		if ($this.attr('target') && '_blank' == $this.attr('target')) {
			// Nothing to do here. Open link in new tab.
		} else {
			if (this_href == '#') {
				e.preventDefault();
			} else if ($this.hasClass('ashade-lightbox-link')) {
				e.preventDefault();
			} else if (this_href.length > 1 && this_href[0] !== '#' && !/\.(jpg|png|gif)$/.test(this_href)) {
				e.preventDefault();
				ashade.change_location(this_href);
			}
		}
	}).on('mousedown', function(e) {
		e.preventDefault();
	});
	
	// Masonry Items
	if (jQuery('.is-masonry').length) {
		jQuery('.is-masonry').each(function() {
			jQuery(this).masonry();
		});
	}
	
	// Init Coming Soon Counter
	if ( jQuery('#ashade-coming-soon').length ) {
		ashade.count_down.init();
	}	
	
	// Before After
	if (jQuery('.ashade-before-after').length) {
		jQuery('.ashade-before-after').each(function() {
			new Ashade_Before_After(jQuery(this));
		});
	}
	
	// Kenburns Sliders
	if (jQuery('.ashade-kenburns-slider').length) {
		ashade.kenburns.init();
	}

	// Tiny Slider
	if (jQuery('.ashade-tns-container').length) {
		jQuery('.ashade-tns-container').each(function(){
			let $this = jQuery(this),
				$parent = $this.parent(),
				ashade_tns_options = {
					container: this,
					items: 1,
					axis: 'horizontal',
					mode: 'carousel',
					gutter: 0,
					edgePadding: 0,
					controls: false,
					nav: false,
					navPosition: 'bottom',
					speed: 1000,
					mouseDrag: true,
				};
		
			if ($parent.hasClass('ashade-testimonials-carousel')) {
				ashade_tns_options.autoHeight = true;
				ashade_tns_options.center = true;
				ashade_tns_options.nav = true;
				ashade_tns_options.loop = true;
				ashade_tns_options.gutter = 40;
			}
			
			// Init
			ashade_tns[$this.attr('id')] = tns(ashade_tns_options);
			
			// After Init Functions
			if ($parent.hasClass('ashade-testimonials-carousel')) {
				ashade_tns[$this.attr('id')].events.on('transitionEnd', ashade.sScroll.layout);
			}
		});
	}
	
	// Counters
	if (jQuery('.ashade-counter-item').length) {
		if ('IntersectionObserver' in window) {
			ashade.counter_observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (!jQuery(entry.target).hasClass('is-counted')) {
						if(entry.isIntersecting) {
							jQuery(entry.target).addClass('is-counted');
							ashade.counter(jQuery(entry.target).children('.ashade-counter-value')[0]);
						}					
					}
				});
			});			
		} else {
			jQuery('.ashade-counter-item').each(function() {
				jQuery(this).addClass('is-counted');
				ashade.counter(jQuery(this).children('.ashade-counter-value')[0]);
			});
		}
	}
	
	// Circle Progress Bar Init
	if (jQuery('.ashade-progress-item').length) {
		jQuery('.ashade-progress-item').each(function() {
			ashade.progress.init(this);
		});
	}
	
	// Bricks Gallery
	if (jQuery('.ashade-gallery-bricks.is-2x3').length) {
		jQuery('.ashade-gallery-bricks.is-2x3').each(function() {
			let $this = jQuery(this),
				count = 0;
			
			$this.find('.ashade-gallery-item').each(function(){
				count++;
				if (count > 5) {
					count = 1;
				}
				if (count == 1 || count == 2) {
					jQuery(this).addClass('is-large');
				} else {
					jQuery(this).addClass('is-small');
				}
			});
		});
	}
	
	// Lazy Loading Images
	if (jQuery('.lazy').length) {
		jQuery('.lazy').Lazy({
			scrollDirection: 'vertical',
			effect: 'fadeIn',
			visibleOnly: true,
			onError: function(element) {
				console.log('Error Loading ' + element.data('src'));
			},
			afterLoad: function(element) {
            	ashade.layout();
        	},
		});		
	}
	
	// Justify Gallery
	if (jQuery('.ashade-justified-gallery').length) {
		jQuery('.ashade-justified-gallery').justifiedGallery({
			rowHeight : 250,
			captions: false,
			lastRow : 'nojustify',
			margins : 10
		});
	}
	
	// Lightbox
	if ( jQuery('.ashade-lightbox-link').length ) {
		jQuery('.ashade-lightbox-link').each( function() {
			let $this = jQuery(this),
				this_item = {},
				this_gallery = 'default';
			
			if ($this.data('size')) {
				let item_size = $this.attr('data-size').split('x');
				this_item.w = item_size[0];
				this_item.h = item_size[1];
			}
			this_item.src = $this.attr('href');
			
			if ( $this.data('caption') ) {
				this_item.title = $this.data('caption');
			}
			
			if ( $this.data('gallery') ) {
				this_gallery = $this.data('gallery');
			}
			
			if ( ashade.pswp.gallery[this_gallery] ) {
				ashade.pswp.gallery[this_gallery].push(this_item);
			} else {
				ashade.pswp.gallery[this_gallery] = [];
				ashade.pswp.gallery[this_gallery].push(this_item);
			}
			
			$this.data('count', ashade.pswp.gallery[this_gallery].length - 1);
		});
			
		jQuery(document).on('click', '.ashade-lightbox-link', function(e) {
			e.preventDefault();
			
			let $this = jQuery(this),
				this_index = parseInt($this.data('count'), 10),
				this_gallery = 'default',
				this_options = {
					index: this_index,
					bgOpacity: 0.85,
					showHideOpacity: true,
					getThumbBoundsFn: function(index) {
                        var thumbnail = $this[0],
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect(); 
						
                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    },
				};
			
			if ( $this.data('gallery') ) {
				this_gallery = $this.data('gallery');
			}
			
			ashade.pswp.lightbox = new PhotoSwipe($ashade_body.find('.pswp')[0], PhotoSwipeUI_Default, ashade.pswp.gallery[this_gallery], this_options);
			ashade.pswp.lightbox.init();
		});
	}
	
	// Contact Form
	if (jQuery('form.ashade-contact-form').length) {
		jQuery('form.ashade-contact-form').each(function() {
			let $this = jQuery(this),
				$response = $this.find('.ashade-contact-form__response'),
				formData;
			
			$this.submit(function(e) {
				e.preventDefault();
				formData = jQuery(this).serialize();
				jQuery.ajax({
					type: 'POST',
					url: $this.attr('action'),
					data: formData
				})
				.done(function(response) {
					$response.empty().removeClass('alert-danger').addClass('alert-success');
					$response.html('<span>' + response + '</span>');
					setTimeout(function () {
						//$response.find('span').fadeOut();
					}, 2000);
        			$this.find('input:not([type="submit"]), textarea').val('');
				})
				.fail(function(data) {
					$response.empty().removeClass('alert-success').addClass('alert-danger');
					$response.html('<span>' + data.responseText) + '</span>';
					setTimeout(function () {
						//$response.find('span').fadeOut();
					}, 2000);
				});
			});
		});
	}
	
	// Spacer
	jQuery('.ashade-spacer').each(function() {
		jQuery(this).height(jQuery(this).data('size'));
	});
	
    ashade.layout();
    ashade.loading();
}

ashade.layout = function() {
	// Close Mobile Menu (if it don't use)
	if ($ashade_window.width() > 760) {
		$ashade_body.removeClass('ashade-mobile-menu-shown');
	}
	
	// Header Space Holder
	if (typeof $ashade_header_holder !== 'undefined') {
		$ashade_header_holder.height($ashade_header.height());
	}
	
	// Header Padding to Home Template
	if (jQuery('#ashade-home-works').length) {
		jQuery('#ashade-home-works').css('padding-top', $ashade_header.height()+'px');
		 jQuery(".aos-init").removeClass("aos-animate");
		 setTimeout(function(){
       jQuery(".add-aos-new").addClass("aos-animate");
        }, 3000);
		setTimeout(function(){
       jQuery(".add-aos-new-1").addClass("aos-animate");
        }, 3500);
		setTimeout(function(){
       jQuery(".add-aos-new-2").addClass("aos-animate");
        }, 4000);
		setTimeout(function(){
       jQuery(".add-aos-new-3").addClass("aos-animate");
        }, 4500);
		setTimeout(function(){
       jQuery(".add-aos-new-4").addClass("aos-animate");
        }, 5000);
		setTimeout(function(){
       jQuery(".add-aos-new-5").addClass("aos-animate");
        }, 5500);
		setTimeout(function(){
       jQuery(".add-aos-new-6").addClass("aos-animate");
        }, 6000);
		setTimeout(function(){
       jQuery(".add-aos-new-7").addClass("aos-animate");
        }, 6500);
		setTimeout(function(){
       jQuery(".add-aos-new-8").addClass("aos-animate");
        }, 7000);
		setTimeout(function(){
       jQuery(".add-aos-new-9").addClass("aos-animate");
        }, 7500);
		setTimeout(function(){
       jQuery(".add-aos-new-10").addClass("aos-animate");
        }, 8000);
	}
	if (jQuery('#Technology-home-works').length) {
		jQuery('#Technology-home-works').css('padding-top', $ashade_header.height()+'px');
		jQuery(".titleArea-01").removeClass("aos-animate");
		jQuery(".titleArea-02").removeClass("aos-animate");
		setTimeout(function(){
			jQuery(".titleArea-01").addClass("aos-animate");
			 }, 3000);
			 setTimeout(function(){
			jQuery(".titleArea-02").addClass("aos-animate");
			 }, 3500);
	}
	if (jQuery('#Manpower-home-works').length) {
		jQuery('#Manpower-home-works').css('padding-top', $ashade_header.height()+'px');
		jQuery(".st17,.st18,.st21").removeClass("upinTop");
		jQuery(".st17,.st18").removeClass("upinTopRt");
		jQuery(".st23,.st20,.st19").removeClass("upinDown");
		jQuery(".st23,.st19").removeClass("upinDownRt");
		jQuery(".st20,.st21").removeClass("zoomUpOut");
		setTimeout(function(){
			jQuery(".st17").addClass("upinTop");
		}, 5000);
		setTimeout(function(){
				 jQuery(".st17").addClass("upinTopRt");
		}, 6000);
		
		setTimeout(function(){
			jQuery(".st18").addClass("upinTop");
		}, 6000);
		setTimeout(function(){
				 jQuery(".st18").addClass("upinTopRt");
		}, 7000);

		setTimeout(function(){
			jQuery(".st21").addClass("upinTop");
		}, 7000);
		setTimeout(function(){
				 jQuery(".st21").addClass("zoomUpOut");
		}, 8000);

		setTimeout(function(){
			jQuery(".st23").addClass("upinDown");
		}, 8000);
		setTimeout(function(){
				 jQuery(".st23").addClass("upinDownRt");
		}, 9000);

		setTimeout(function(){
			jQuery(".st19").addClass("upinDown");
		}, 9000);
		setTimeout(function(){
				 jQuery(".st19").addClass("upinDownRt");
		}, 10000);

		setTimeout(function(){
			jQuery(".st20").addClass("upinDown");
		}, 10000);
		setTimeout(function(){
				 jQuery(".st20").addClass("zoomUpOut");
		}, 11000);
			 
	    }
       





	if (jQuery('#TrainingArea-home-works').length) {
		jQuery('#TrainingArea-home-works').css('padding-top', $ashade_header.height()+'px');
	}
	if (jQuery('#ashade-home-contacts').length) {
		jQuery('#ashade-home-contacts').css('padding-top', $ashade_header.height()+'px');
	}
	
	// Relayout Masonry items
	if (jQuery('.is-masonry').length) {
		jQuery('.is-masonry').each(function() {
			jQuery(this).masonry('layout');
		});
	}

	// Services List Layout
	if (jQuery('.ashade-service-item').length) {
		jQuery('.ashade-service-item').each(function() {
			let $this = jQuery(this),
				$prev = $this.prev('.ashade-service-item');			
			if ($ashade_window.width() > 1200) {
				if ($prev.length) {
					var set_y = -1*($prev.height() - $prev.find('.ashade-service-item__content').height())/2;
					$this.css('margin-top', set_y +'px');
				}				
			} else {
				$this.css('margin-top', '0px');
			}
		});
	}
		
	// Fullheight Row
	if (jQuery('.ashade-row-fullheight').length) {
		jQuery('.ashade-row-fullheight').each(function() {
			var $this = jQuery(this),
				minHeight = $ashade_window.height();
			
			if ($this.hasClass('exclude-header')) {
				minHeight = minHeight - $ashade_header.height();
			}
			if ($this.hasClass('exclude-footer')) {
				minHeight = minHeight - $ashade_footer.height();
			}
			$this.css('min-height', minHeight+'px');
		});
	}
	
    // Dropdown Menu Position
    $ashade_header.find('.ashade-menu-offset').removeClass('ashade-menu-offset');
    
    $ashade_header.find('.sub-menu').each(function() {
        var $this = jQuery(this),
            this_left = $this.offset().left,
            this_left_full = $this.offset().left + $this.width() + parseInt($this.css('padding-left'), 10) + parseInt($this.css('padding-right'), 10);
		
		if ( this_left_full > $ashade_window.width() ) {
			$this.addClass('ashade-menu-offset');
		}
    });

	// Circle Progress Bar
	if (jQuery('.ashade-progress-item').length) {
		jQuery('.ashade-progress-item.is-done').each(function() {
			ashade.progress.layout(this);
		});
	}
	
	// Smooth Scroll Functions
	ashade.old_scroll_top = $ashade_window.scrollTop();
	ashade.sScroll.layout();	
}

ashade.loading = function() {
	// Load Page Title and Guides
	if (jQuery('.ashade-page-title-wrap:not(.is-inactive)').length) {
		gsap.to('.ashade-page-title-wrap:not(.is-inactive)', 0.5, {
			css: {
				top: '100%',
			},
			onComplete: function() {
				jQuery('.ashade-page-title-wrap:not(.is-inactive)').addClass('is-loaded');
			}
		});
	}
	if (jQuery('.ashade-back-wrap:not(.is-inactive)').length) {
		gsap.to('.ashade-back-wrap:not(.is-inactive)', 0.5, {
			css: {
				top: '100%',
			},
			onComplete: function() {
				jQuery('.ashade-back-wrap:not(.is-inactive)').addClass('is-loaded');
			}
		});
	}
	if ($ashade_body.hasClass('ashade-home-template')) {
		gsap.to('.openBtnMarketSurvey:not(.is-inactive)', 0.5, {
			css: {
				top: '100%',
			},
			onComplete: function() {
				jQuery('.openBtnMarketSurvey:not(.is-inactive)').addClass('is-loaded');
			}
		});
		gsap.to('.openBtnTechnology:not(.is-inactive)', 0.5, {
			css: {
				top: '100%',
			},
			onComplete: function() {
				jQuery('.openBtnTechnology:not(.is-inactive)').addClass('is-loaded');
			}
		});
		
		gsap.to('.openBtnManpower:not(.is-inactive)', 0.5, {
			css: {
				top: '100%',
			},
			onComplete: function() {
				jQuery('.openBtnManpower:not(.is-inactive)').addClass('is-loaded');
			}
		});
		
		gsap.to('.openBtnTrainingArea:not(.is-inactive)', 0.5, {
			css: {
				top: '100%',
			},
			onComplete: function() {
				jQuery('.openBtnTrainingArea:not(.is-inactive)').addClass('is-loaded');
			}
		});
		
		
		gsap.to('.ashade-home-link--contacts:not(.is-inactive)', 0.5, {
			css: {
				top: '100%',
			},
			onComplete: function() {
				jQuery('.ashade-home-link--contacts:not(.is-inactive)').addClass('is-loaded');
			}
		});
	}
	
	let logoDelay = ashade.config.content_load_delay;
	if ($ashade_window.width() < 760) {
		logoDelay = 0.1;
	}
	// Load Logo
	gsap.from('.ashade-logo', {
		x: '-50%',
		opacity: 0,
		duration: 0.5,
		delay: logoDelay
	});
	
	// Load Mobile Menu
	gsap.from('.ashade-mobile-header > a', 
		{
			x: 10,
			y: -10,
			opacity: 0,		
			duration: 0.2,
			delay: 0.1,
			stagger: 0.1
		},
	);

	// Load Menu
	gsap.from('.ashade-nav ul.main-menu > li', 
		{
			x: -10,
			y: -10,
			opacity: 0,		
			duration: 0.2,
			delay: ashade.config.content_load_delay,
			stagger: 0.1
		},
	);
	
	// Footer Socials
	if (jQuery('.ashade-footer__socials').length) {
		if ($ashade_window.width() < 760) {
			gsap.from('.ashade-footer__socials li', 
				{
					x: 0,
					y: 20,
					opacity: 0,		
					duration: 0.2,
					delay: ashade.config.content_load_delay,
					stagger: 0.1
				},
			);			
		} else {
			gsap.from('.ashade-footer__socials li', 
				{
					x: -10,
					y: -10,
					opacity: 0,		
					duration: 0.2,
					delay: ashade.config.content_load_delay,
					stagger: 0.1
				},
			);			
		}
	}
	
	// Fotoer Copyright
	if (jQuery('.ashade-footer__copyright').length) {
		if ($ashade_window.width() < 760) {
			gsap.from('.ashade-footer__copyright', {
				y: 20,
				opacity: 0,
				duration: 0.5,
				delay: ashade.config.content_load_delay
			});
		} else {
			gsap.from('.ashade-footer__copyright', {
				x: '50%',
				opacity: 0,
				duration: 0.5,
				delay: ashade.config.content_load_delay
			});					
		}
	}
	
	// Page Background
	if (jQuery('.ashade-page-background').length) {
		gsap.from('.ashade-page-background', {
			scale: 1.05,
			opacity: 0,
			duration: 1,
			delay: ashade.config.content_load_delay,
		});
	}
	
	// Show Content
	if (jQuery('.ashade-content').length) {
		let contentDelay = ashade.config.content_load_delay*1.7;
		if ($ashade_window.width() < 760) {
			contentDelay = 0.5;
		}
		gsap.from('.ashade-content', {
			opacity: 0,
			y: 100,
			duration: 1,
			delay: contentDelay,
			onStart: function() {
				ashade.content_loaded();
			}
		});
	}
	
	// Show Albums Ribbon Content
	if (jQuery('.ashade-albums-carousel').length) {
		if (jQuery('.ashade-albums-carousel').hasClass('is-vertical')) {
			gsap.from('.ashade-album-item__inner', {
				opacity: 0,
				y: 100,
				duration: 1,
				stagger: 0.1,
				delay: ashade.config.content_load_delay*1.7
			});
		} else {
			gsap.from('.ashade-album-item__inner', {
				opacity: 0,
				x: 100,
				duration: 1,
				stagger: 0.1,
				delay: ashade.config.content_load_delay*1.7
			});			
		}
		if (ashade_ribbon.$bar) {
			gsap.from(ashade_ribbon.$bar[0], {
				opacity: 0,
				y: 20,
				duration: 1,
				delay: ashade.config.content_load_delay*1.7
			});			
		}
	}
	
	// Show Albums Slider Content
	if (jQuery('.ashade-albums-slider').length) {
		if (jQuery('.ashade-album-item__title').length) {
			gsap.to('.ashade-album-item__title', {
				css: {
					top: '100%',
				},
				delay: 0.5,
				duration: 1,
				onComplete: function() {
					jQuery('.ashade-album-item__title').addClass('is-loaded');
				}
			});			
		}
		if (jQuery('.ashade-album-item__explore').length) {
			gsap.to('.ashade-album-item__explore', {
				css: {
					top: '100%',
				},
				delay: 0.5,
				duration: 1,
				onComplete: function() {
					jQuery('.ashade-album-item__explore').addClass('is-loaded');
				}
			});
		}
		gsap.fromTo('.ashade-slider-prev', {
			x: -50,
		},{
			x: 0,
			delay: ashade.config.content_load_delay*1.7,
			duration: 0.5,
			onStart: function() {
				jQuery('.ashade-slider-prev').addClass('is-loaded');
			}
		});
		gsap.fromTo('.ashade-slider-next', {
			x: 50,
		},{
			x: 0,
			delay: ashade.config.content_load_delay*1.7,
			duration: 0.5,
			onStart: function() {
				jQuery('.ashade-slider-next').addClass('is-loaded');
			}
		});
		gsap.from('.ashade-album-item__image', {
			scale: 1.05,
			opacity: 0,
			duration: 1,
			delay: ashade.config.content_load_delay*1.7,
		});		
	}
	
	setTimeout("$ashade_body.addClass('is-loaded')", 1500);
}

ashade.change_location = function(this_href) {
	ashade.cursor.$el.addClass('is-unloading');
	$ashade_body.addClass('is-locked');
	if ($ashade_window.width() < 760 && $ashade_body.hasClass('ashade-mobile-menu-shown')) {
		let setDelay = 0;
		$ashade_body.addClass('is-locked');
		if (jQuery('.ashade-mobile-menu').find('.is-open').length) {
			jQuery('.ashade-mobile-menu').find('ul.sub-menu').slideUp(300);
			setDelay = 0.3;
		}
		gsap.fromTo('.ashade-mobile-menu ul.main-menu > li', 
			{
				x: 0,
				y: 0,
				opacity: 1
			},
			{
				x: 0,
				y: -40,
				opacity: 0,
				duration: 0.2,
				delay: setDelay,
				stagger: 0.1,
				onComplete: function() {
					window.location = this_href;
				}
			},
		);
		return false;
	}
	$ashade_body.removeClass('is-loaded');
	if ($ashade_body.hasClass('ashade-aside-shown')) {
		$ashade_body.removeClass('ashade-aside-shown');
	}
	if ($ashade_body.hasClass('ashade-mobile-menu-shown')) {
		$ashade_body.removeClass('ashade-mobile-menu-shown');
	}
	
	if (jQuery('.ashade-content').length) {
		gsap.to('.ashade-content', {
			css: {
				opacity: 0,
				y: -100,				
			},
			duration: 0.6,
		});
	}
	// Unload Albums Carousel Content
	if (jQuery('.ashade-albums-carousel').length) {
		if (ashade_ribbon.type == 'vertical') {
			gsap.to('.ashade-album-item__inner.is-inview', {
				css: {
					opacity: 0,
					y: -100,
				},
				stagger: 0.1,
				delay: 0.5,
				duration: 0.6,
			});
		} else {
			gsap.to('.ashade-album-item__inner.is-inview', {
				css: {
					opacity: 0,
					x: -100,				
				},
				stagger: 0.1,
				delay: 0.5,
				duration: 0.6,
			});			
		}
		if (ashade_ribbon.$bar) {
			gsap.to(ashade_ribbon.$bar[0], {
				opacity: 0,
				y: 20,
				duration: 1,
			});			
		}
	}

	// Unload Albums Slider Content
	if (jQuery('.ashade-albums-slider').length) {
		if (jQuery('.ashade-album-item__title').length) {
			setTimeout("jQuery('.ashade-album-item__title').removeClass('is-loaded')", 300);
			gsap.to('.ashade-album-item__title', {
				css: {
					top: '0%',
				},
				delay: 1.2,
				duration: 1,
			});
		}
		if (jQuery('.ashade-album-item__explore').length) {
			setTimeout("jQuery('.ashade-album-item__explore').removeClass('is-loaded')", 300);
			gsap.to('.ashade-album-item__explore', {
				css: {
					top: '200%',
				},
				delay: 1.2,
				duration: 1,
			});
		}
		gsap.fromTo('.ashade-slider-prev', {
			x: 0,
		},{
			x: -50,
			duration: 0.5,
			onStart: function() {
				jQuery('.ashade-slider-prev').removeClass('is-loaded');
			}
		});
		gsap.fromTo('.ashade-slider-next', {
			x: 0,
		},{
			x: 50,
			duration: 0.5,
			onStart: function() {
				jQuery('.ashade-slider-next').removeClass('is-loaded');
			}
		});
		gsap.to('.ashade-album-item__image', {
			css: {
				scale: 1.05,
				opacity: 0,				
			},
			duration: 1,
			delay: ashade.config.content_load_delay*1.7,
		});		
	}

	// Remove Logo
	gsap.to('.ashade-logo', {
		css: {
			x: '-50%',
			opacity: 0,			
		},
		duration: 0.5,
		delay: 0.5
	});

	// Remove Menu
	gsap.to('.ashade-nav ul.main-menu > li', 
		{
			css: {
				x: -10,
				y: -10,
				opacity: 0,				
			},
			duration: 0.2,
			delay: 0.5,
			stagger: 0.1
		},
	);	
	
	// Unload Mobile Menu
	gsap.to('.ashade-mobile-header > a', 
		{
			x: -10,
			y: -10,
			opacity: 0,		
			duration: 0.2,
			delay: 0.5,
			stagger: 0.1
		},
	);

	// Footer Socials
	if (jQuery('.ashade-footer__socials').length) {
		gsap.to('.ashade-footer__socials li', 
			{
				css: {
					x: -10,
					y: -10,
					opacity: 0,				
				},
				duration: 0.2,
				delay: 0.5,
				stagger: 0.1
			},
		);
	}
	
	// Fotoer Copyright
	if (jQuery('.ashade-footer__copyright').length) {
		gsap.to('.ashade-footer__copyright', {
			css: {
				x: '50%',
				opacity: 0,			
			},
			duration: 0.5,
			delay: 0.5
		});
	}

	// Remove Page Title and Guides
	if (jQuery('.ashade-page-title-wrap').length) {
		setTimeout("jQuery('.ashade-page-title-wrap:not(.is-inactive)').removeClass('is-loaded')", 600);
		gsap.to('.ashade-page-title-wrap', 0.5, {
			css: {
				top: 0,
			},
			delay: 1.1,
		});
	}
	if (jQuery('.ashade-back-wrap').length) {
		setTimeout("jQuery('.ashade-back-wrap:not(.is-inactive)').removeClass('is-loaded')", 600);
		gsap.to('.ashade-back-wrap', 0.5, {
			css: {
				top: '200%',
			},
			delay: 1.1,
		});
	}
	
	// Home Template Unloading
	if ($ashade_body.hasClass('ashade-home-template')) {
		if (!$ashade_body.hasClass('ashade-home-state--contacts') && !$ashade_body.hasClass('ashade-home-state--works')) {
			var links_delay = 0.5,
				links_timeout = 0;
		} else {
			var links_delay = 1.1,
				links_timeout = 600;
		}
		setTimeout("jQuery('.openBtnMarketSurvey:not(.is-inactive)').removeClass('is-loaded')", links_timeout);
		gsap.to('.openBtnMarketSurvey:not(.is-inactive)', 0.5, {
			css: {
				top: 0,
			},
			delay: links_delay,
		});
		setTimeout("jQuery('.openBtnTechnology:not(.is-inactive)').removeClass('is-loaded')", links_timeout);
		gsap.to('.openBtnTechnology:not(.is-inactive)', 0.5, {
			css: {
				top: 0,
			},
			delay: links_delay,
		});
		setTimeout("jQuery('.openBtnManpower:not(.is-inactive)').removeClass('is-loaded')", links_timeout);
		gsap.to('.openBtnManpower:not(.is-inactive)', 0.5, {
			css: {
				top: 0,
			},
			delay: links_delay,
		});
		setTimeout("jQuery('.openBtnTrainingArea:not(.is-inactive)').removeClass('is-loaded')", links_timeout);
		gsap.to('.openBtnTrainingArea:not(.is-inactive)', 0.5, {
			css: {
				top: 0,
			},
			delay: links_delay,
		});
		setTimeout("jQuery('.ashade-home-link--contacts:not(.is-inactive)').removeClass('is-loaded')", links_timeout);
		gsap.to('.ashade-home-link--contacts:not(.is-inactive)', 0.5, {
			css: {
				top: '200%',
			},
			delay: links_delay,
		});
	}
	
	// Remove Page Background
	if (jQuery('.ashade-page-background').length) {
		gsap.to('.ashade-page-background', {
			css: {
				scale: 1.05,
				opacity: 0,				
			},
			duration: 1,
			delay: ashade.config.content_load_delay*1.7,
		});
	}

	setTimeout( function() {
		$ashade_body.addClass('is-unloaded');
		window.location = this_href;
	}, 2100, this_href);
}

// DOM Ready. Init Template Core.
jQuery(document).ready( function() {
    ashade.init();
});

$ashade_window.on('resize', function() {
	// Window Resize Actions
    ashade.layout();
	setTimeout(ashade.layout(), 500);
}).on('load', function() {
	// Window Load Actions
    ashade.layout();
}).on('scroll', function() {
	if ($ashade_body.hasClass('ashade-aside-shown')) {
		$ashade_window.scrollTop(ashade.old_scroll_top);
	}
	if ($ashade_body.hasClass('ashade-mobile-menu-shown')) {
		$ashade_window.scrollTop(ashade.old_scroll_top);
	}
	ashade.sScroll.target = $ashade_window.scrollTop();
	if (ashade.sScroll.target > ($ashade_scroll.height() - $ashade_window.height())) {
		ashade.sScroll.layout();
	}
	
	//Window Scroll Actions
	if (jQuery('.ashade-back.is-to-top:not(.in-action)').length) {
		if ($ashade_window.scrollTop() > $ashade_window.height()/2) {
			$ashade_body.addClass('has-to-top');
		} else {
			$ashade_body.removeClass('has-to-top');
		}
	}
}).on('focus', function() {
	if ($ashade_body.hasClass('is-unloaded')) {
		window.location.reload();
	}
});


