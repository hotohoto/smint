(function(){
	var defaultOption = {
		'scrollSpeed': 500,
		'targetSelector': 'div'
	}
	$.fn.smint = function( options ) {
		var settings = $.extend(defaultOption, options)

		var menuItems = []
		var _smint = $(this)
		var menuHeight = _smint.height()
		_smint.addClass('smint')

		if ( settings.scrollSpeed ) {
			var scrollSpeed = settings.scrollSpeed
		}

		if ( settings.targetSelector ) {
			var targetSelector = settings.targetSelector
		};

		var smintA = $('.smint a').filter( function() {
			var _item = $(this)
			var href = _item.attr('href')
			if (!href) {
				return false
			}
			var id = href.split('#')[1]

			if (!id) {
				return false
			}

			//Fill the menu
			var item = {
				sel: _item,
				targetId: id,
				pos1: $(targetSelector+"#"+id).position().top-menuHeight,
				pos2: $(targetSelector+"#"+id).height()+$(targetSelector+"#"+id).position().top
			}
			menuItems.push(item)

			///////////////////////////////////////

			_item.on('click', function(e){
				// stops hrefs making the page jump when clicked
				e.preventDefault();

				var goTo =  $(targetSelector+'#'+ item.targetId).offset().top-menuHeight;

				// Scroll the page to the desired position!
				if (scrollSpeed) {
					$("html, body").stop().animate({ scrollTop: goTo }, scrollSpeed);
				} else {
					$("html, body").scrollTop(goTo)
				}

				// if the link has the '.extLink' class it will be ignored
				if (_item.hasClass("extLink")) {
					return false;
				}
			})

			return true
		})

		// check position and make sticky if needed
		var stickyMenu = function(){
			var scrollTop = $(window).scrollTop()+menuHeight;

			menuItems.map(function (item, index) {
				if(item.pos1 <= scrollTop && scrollTop <= item.pos2){
					item.sel.addClass("active");

					$.each(menuItems, function(i){
						if(item.targetId != menuItems[i].targetId){
							menuItems[i].sel.removeClass("active");
						}
					});
				}
			})
		};

		// run functions
		stickyMenu();

		//This lets yo use links in body text to scroll. Just add the class 'intLink' to your button and it will scroll
		$('.intLink').on('click', function(e){
			e.preventDefault();

			var hash = $(this).attr('href').split('#')[1];

			if (_smint.hasClass('fxd')) {
				var goTo =  $(targetSelector+'#'+ hash).position().top-menuHeight
			} else {
				var goTo =  $(targetSelector+'#'+ hash).position().top-menuHeight*2
			}

			$("html, body").stop().animate({ scrollTop: goTo }, scrollSpeed)

			if ($(this).hasClass("extLink")) {
				return false;
			}
		})

		// run function every time you scroll
		$(window).scroll(function() {
			stickyMenu()
		})

		return $(this)
	};

	$.fn.smint.defaults = defaultOption
})(jQuery)
