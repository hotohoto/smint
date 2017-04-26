(function(){
	var defaultOption = {
		'scrollSpeed': 500,
		'mySelector': 'div'
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

		if ( settings.mySelector ) {
			var mySelector = settings.mySelector
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

			if (!_item.hasClass("extLink")) {
				_item.attr('id', id)
			}

			//Fill the menu
			var item = {
				id: id,
				pos1: $(mySelector+"."+id).position().top-menuHeight,
				pos2: $(mySelector+"."+id).height()+$(mySelector+"."+id).position().top
			}
			menuItems.push(item)

			///////////////////////////////////////

			_item.on('click', function(e){
				// stops hrefs making the page jump when clicked
				e.preventDefault();

				var goTo =  $(mySelector+'.'+ item.id).offset().top-menuHeight;

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
					$("#"+item.id).addClass("active");

					$.each(menuItems, function(i){
						if(item.id != menuItems[i].id){
							$("#"+menuItems[i].id).removeClass("active");
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
				var goTo =  $(mySelector+'.'+ hash).position().top-menuHeight
			} else {
				var goTo =  $(mySelector+'.'+ hash).position().top-menuHeight*2
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
