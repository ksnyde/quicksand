(function($) {
	// Quicksand Options
	var quicksand_preferences = {
		duration: 800,
		easing: 'easeInOutQuad',
		useScaling : true,
		adjustHeight: false
	};
	var navSystemHooked = false;
	var $navOptionFiltered = null;		// the last filter option that was chosen
	
	// Handle the click events. This is added as a callback to the quicksand call.
	function take_nav_action ( $refObject ) {	
		var $list = $('#applications');
		$list.quicksand( null , quicksand_preferences );
		if ( $refObject.attr( 'info-page' ) == "true" ) {
			window.location.href =  $refObject.attr( 'action' ) + "/info";
		} else {
			window.location.href =  $refObject.attr( 'action' );
		}
		
	}
	
	function external_command_listener () {
		// NOT BEING USED AT THE MOMENT
		// Click Handling
		$( '#nav-controller' ).on( 'clickhandler' , function ( e , param ) {
			alert ("registering clicks to: " + param );
			register_qs_click_handler ( param );
		});
		// Menu Control handling
		$( '#nav-controller' ).on( 'controlframework' , function ( e , param ) {
			alert ('registering menu handling to: ' + param );
			register_qs_control_framework ( param );
		});
	}
	
	function template_file_name ( shortname ) {
		return lifegadget_config.TemplateDir + "_" + shortname + ".tmpl.html";
	}
	
	function initialise_messaging () {
		navTemplate = template_file_name ( 'messaging' );
		$.get( navTemplate , function (data) {
			$( '#page-nav-system' ).html(data);
		});
	}
	
	function initialise_navigation () {
		navTemplate = template_file_name ( 'navigation' );
		$.get( navTemplate , function (data) {
			$( '#page-nav-system' ).html(data);			
			// handle nav visibility toggle
			$( '#navigation-toggle-on' ).on ('click', function (e) {
				e.preventDefault();
				navigation_toggle();
			});
			$( '#navigation-toggle-off' ).on ('click', function (e) {
				e.preventDefault();
				navigation_toggle();
			});
		});
	}
	
	function navigation_toggle () {
		if ( $('#page-nav-system').hasClass( 'active' ) ) {
			// Hide Nav and show content
			$navOptionFiltered = $('control_area .btn.active');
			$('#nav-enabler-button').fadeIn ( 'fast' );
			$('#nav-buttons').hide();
			$('#page-main-content').addClass ( 'active' ).fadeIn ( 'fast' );
			$('#page-nav-system').removeClass ( 'active' ).fadeOut ( 'fast' );
		} else {
			// Hide content and show Navigation system
			$('#nav-enabler-button').fadeOut ('fast');
			$('#nav-buttons').fadeIn ('fast');
			$('#page-nav-system').addClass( 'active' ).fadeIn ( 'fast' );
			$('#page-main-content').removeClass ( 'active' ).fadeOut ('fast' , function () {
				if ( !navSystemHooked ) {
					register_control_framework ( 'control_area' );
					navSystemHooked = true;
				}
				$('#page-nav-system').addClass ( 'active' );
				$('#nav-buttons button.active').removeClass ('active'); // the last button pressed was cancel so remove its active status
				if ( $navOptionFiltered != null ) {
					$('control_area .btn.active').removeClass ('active');
					$navOptionFiltered.addClass ('active');
				} else {
					$('#nav-buttons button').eq(0).addClass ('active');
				}
			});
		}
	}
	
	function register_nav_listeners () {
		// REGISTER CONTROL AREAS
		$( 'control_area' ).on( 'click' , function (e) {
			var $target = $( e.target );
			var $parent = $target.closest ("li");
		});
		// REGISTER MENU ACTION ITEMS
		$('#page-nav-system').on( 'click' , function (e) {
			var $target = $( event.target );
			var $parent = $target.closest ("li");
			e.stopPropagation();
			if ( $target.is("li") ) {
				take_nav_action ( $target );
			} else {
				take_nav_action ( $parent );
			}
		});
	}
	
	// Allows other Javascript to register a DOM element
	// through the command listener which will then serve as the base for all menu options
	// click actions.
	function register_qs_click_handler ( domElementName ) {
		if ( !domElementName ) domElementName = "#application li";
		$( domElementName ).on('click' , take_nav_action() );
	}	
			
	function register_control_framework ( domElementName ) {
		// set a default value to domElementName if none exists
		if ( !domElementName ) domElementName = '.quicksand-cntrl';
		
		$.fn.sorted = function(customOptions) {
			var options = {
				reversed: false,
				by: function(a) {
					return a.text();
				}
			};
			$.extend(options, customOptions);

			$data = $(this);
			arr = $data.get();
			arr.sort(function(a, b) {
			   	var valA = options.by($(a));
			   	var valB = options.by($(b));
				if (options.reversed) {
					return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;				
				} else {		
					return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;	
				}
			});
			return $(arr);
		};
		
		// Add and process actions for the Filter menu
		// -------------------------------------------
		var read_button = function ( class_names ) {
			var r = {
				selected: false,
				type: 0
			};
			for (var i=0; i < class_names.length; i++) {
				if (class_names[i].indexOf('selected-') == 0) {
					r.selected = true;
				}
				if (class_names[i].indexOf('segment-') == 0) {
					r.segment = class_names[i].split('-')[1];
				}
			};
			return r;
		};

		var determine_sort = function($buttons) {
			var $selected = $buttons.filter('[class*="selected-"]');
			return $selected.attr('data-value');
		};

		var determine_filter = function($buttons) {
			var $selected = $buttons.filter('[class*="selected-"]');
			return $selected.attr('data-value');
		};
		
		var $controls = $( domElementName );

		$controls.each(function(i) {
			var $list = $('#applications');
			var $data = $list.clone();

			var $control = $(this);
			var $buttons = $control.find ('.nav.btn');

			$buttons.bind('click', function(e) {
				var $button = $(this);
				var button_properties = read_button($button.attr('class').split(' '));      
				var selected = button_properties.selected;
				var button_segment = button_properties.segment;
				
				// if button pressed isn't already pressed then ...
				if (!selected) {
					$button.siblings().removeClass('selected-0').removeClass('selected-1').removeClass('selected-2');
					$button.addClass('selected-' + button_segment);

					var sorting_type = determine_sort ( $controls.eq(1).find('.selected-' + button_segment ) );
					var filter_type = determine_filter ( $controls.eq(0).find('.selected-' + button_segment ) );

					if (filter_type == 'all') {
						var $filtered_data = $data.find('li');
					} else {
						var $filtered_data = $data.find('li.' + filter_type );
					}

					if (sorting_type == 'size') {
						var $sorted_data = $filtered_data.sorted({
							by: function(v) {
								return parseFloat($(v).find('span').text());
							}
						});
					} else {
						var $sorted_data = $filtered_data.sorted({
							by: function(v) {
								return $(v).find('strong').text().toLowerCase();
							}
						});
					}
					// CALL QUICKSAND
					$list.quicksand( $sorted_data, quicksand_preferences );
				}

				e.preventDefault();
			});

		});
	} // End register_control_framework()

	// ON PAGE LOAD
	// --------------	
	//initialise_navigation();
	//initialise_messaging();
	register_nav_listeners();
	register_control_framework();
	// external_command_listener();
	
})(jQuery);
