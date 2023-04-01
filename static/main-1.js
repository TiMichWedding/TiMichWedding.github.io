ANIMATION_SPEED = 400;

$.easing.def = "easeInOutCubic";

$(function(){

	if(!Modernizr.touch) {
		var skrl = skrollr.init({
	        easing: 'sqrt'
	    });
	}

    $('.image', '#home').progressiveBG();

    $('a[href^="#"]', '#navigation').on('click',function (e) {
		e.preventDefault();
		var target = this.hash,
			$target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
			}, 1000, function () {
			window.location.hash = target;
		});
	});

	$("#navigation li").on('activate', function() {
		bgLazyLoad('#' + $($(this).find('a').attr('href')).next().next().attr('id'));
		bgLazyLoad('#' + $($(this).find('a').attr('href')).next().attr('id'));
		bgLazyLoad($(this).find('a').attr('href'));
	});

    $('#history, #gallery').carousel({
		interval: false
    });
	
	$('#festivities-carousel').carousel({
		interval: 10000
    });

    $('#gallery')
    	.on('click', function(){
    		lazyLoad('#gallery');
    	});

    $('#our-story')
    	.on('click', function(){
    		lazyLoad('#our-story');
    	})
		.on('click', '.icn-history-more', function(e){
			e.preventDefault();
			$(e.target).next().animate({bottom: '0px'}, ANIMATION_SPEED);
		})
		.on('click', '.icn-history-close', function(e){
			e.preventDefault();
			$(e.target).parent().animate({bottom: '-770px'}, ANIMATION_SPEED);
		});

	$('#festivities')
		.on('click', function(){
    		lazyLoad('#festivities');
    	})
		.on('click', '.icn-live-map', function(e){
			e.preventDefault();
			$('#festivities').children().not('iframe, .icn-history-close').fadeOut();
		})
		.on('click', '.icn-history-close', function(e){
			e.preventDefault();
			$('#festivities').children().not('iframe, .icn-history-close').fadeIn();
		});
	
	$('#languageSelector').show();
	$('#languageSelector a')
		.on('click', function(e){
			e.preventDefault();
			var selection = $(e.target);
			if(!selection.hasClass('active')) {
				var prevActive = $('#languageSelector a.active');
				prevActive.removeClass('active');
				selection.addClass('active');
				$('.'+prevActive.attr('toggle')).fadeOut('slow');
				setTimeout(function() {
					$('.'+selection.attr('toggle')).fadeIn('slow');
				}, 1000);
			}
		});

	(function($) {
		$.QueryString = (function(a) {
			if (a == "") return {};
			var b = {};
			for (var i = 0; i < a.length; ++i)
			{
				var p=a[i].split('=');
				if (p.length != 2) continue;
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
			}
			return b;
		})(window.location.search.substr(1).split('&'))
	})(jQuery);
	 
	// Usage
	var param = jQuery.QueryString["lg"];
	if(param === "chinese") {
		$('#languageSelector a[toggle=chinese]').click();
	}

	$("img[data-original]").lazyload();
});

function lazyLoad(parent) {
    $('[data-original]', $(parent)).each(function(){
        var $img = $(this);
        $img.attr('src', $img.attr('data-original'));
        $img.removeAttr('data-original');
    });
}

function bgLazyLoad(el){
    var $div = $(el).filter('[data-bg]');
    if($div.length) {
    	$div.css('background', 'url(' + $div.attr('data-bg') + ') no-repeat left top');
		var $temp = $('<img>');
		$temp
			.css({
				position: 'absolute',
				left: '-9999px',
				top: 0
			})
			.attr('src', $div.attr('data-bg'))
			.load(function(){
				$div.removeAttr('data-bg');
			});
    }
}