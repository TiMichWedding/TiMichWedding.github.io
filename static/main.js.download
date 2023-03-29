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

    $('#history, #gallery, #festivities-carousel').carousel({
		interval: false
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

	var $bridalParty = $('#bridal-party');

	$bridalParty
		.on('click', function(){
    		lazyLoad('#bridal-party');
    		bgLazyLoad('.groomsmen', '#bridal-party');
    		bgLazyLoad('.bridesmaides', '#bridal-party');
    	})
		.on('click', '.cover-left a', function(e){
			e.preventDefault();
			$('.bridesmaides', $bridalParty).show();
			$('.groomsmen', $bridalParty).hide();
			$('.icn-bridal-party', $bridalParty).animate({ bottom: '-140px' }, ANIMATION_SPEED, function(){
				$(this).animate({ bottom: '-338px' }, ANIMATION_SPEED, function(){
					$('.cover-left', $bridalParty).animate({ left: '-650px' }, ANIMATION_SPEED);
					$('.cover-right', $bridalParty).animate({ right: '-650px' }, ANIMATION_SPEED);
					$('.icn-back', $bridalParty).animate({ bottom: '-130px' }, ANIMATION_SPEED);
				});
			});
		})
		.on('mouseover', '.cover-left a', function(e){
			$(this).attr('class', 'heading-meet-the-bridesmaides-over');
		})
		.on('mouseout', '.cover-left a', function(e){
			$(this).attr('class', 'heading-meet-the-bridesmaides');
		})
		.on('mouseover', '.cover-right a', function(e){
			$(this).attr('class', 'heading-meet-the-groomsmen-over');
		})
		.on('mouseout', '.cover-right a', function(e){
			$(this).attr('class', 'heading-meet-the-groomsmen');
		})
		.on('click', '.cover-right a', function(e){
			e.preventDefault();
			$('.bridesmaides', $bridalParty).hide();
			$('.groomsmen', $bridalParty).show();
			$('.icn-bridal-party', $bridalParty).animate({ bottom: '-140px' }, ANIMATION_SPEED, function(){
				$(this).animate({ bottom: '-338px' }, ANIMATION_SPEED, function(){
					$('.cover-left', $bridalParty).animate({ left: '-650px' }, ANIMATION_SPEED);
					$('.cover-right', $bridalParty).animate({ right: '-650px' }, ANIMATION_SPEED);
					$('.icn-back', $bridalParty).animate({ bottom: '-130px' }, ANIMATION_SPEED);
				});
			});
		})
		.on('click', '.icn-back', function(e){
			e.preventDefault();
			$('.icn-back', $bridalParty).animate({ bottom: '-120px' }, ANIMATION_SPEED, function(){
				$(this).animate({ bottom: '-226px' }, ANIMATION_SPEED, function(){
					$('.cover-left', $bridalParty).animate({ left: '0px' }, ANIMATION_SPEED);
					$('.cover-right', $bridalParty).animate({ right: '0px' }, ANIMATION_SPEED);
					$('.icn-bridal-party', $bridalParty).animate({ bottom: '-150px' }, ANIMATION_SPEED, function(){
						$('.bridesmaides, .groomsmen', $bridalParty).hide();
					});
				});
			});
		})
		.on('click', '.control-prev', function(e){
			e.preventDefault();
			$(this)
				.addClass('disabled')
				.next()
					.removeClass('disabled');

			$('.carousel', $(this).parent()).animate({ left: '0px' }, ANIMATION_SPEED, function(){
				$('a', $(this)).eq(0).click();
			});
		})
		.on('click', '.control-next', function(e){
			e.preventDefault();
			$(this)
				.addClass('disabled')
				.prev()
					.removeClass('disabled');
			$('.carousel', $(this).parent()).animate({ left: '-872px' }, ANIMATION_SPEED, function(){
				$('a', $(this)).eq(4).click();
			});
		})
		.on('click', '.carousel a', function(e){
			e.preventDefault();
			var $link = $(this),
				$panel = $link.closest('.panel'),
				$active = $('.active', $link.parent());
			$($active.attr('href')).animate({ 'margin-left': '1500px' }, ANIMATION_SPEED, function(){
				$(this).css('margin-left', '-1500px');
			});
			$active.removeClass('active');
			$link.addClass('active');
			$($link.attr('href')).animate({ 'margin-left': '-303px'}, ANIMATION_SPEED);
		});

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