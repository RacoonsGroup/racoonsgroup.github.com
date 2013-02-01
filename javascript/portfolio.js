jQuery(function($) {
	$('.portfolio-item-overlay').hover(function() {
		$(this).stop()
		$(this).animate({
			opacity: 0
		}, 'slow');
	}, function() {
		$(this).stop()
		$(this).animate({
			opacity: 1
		}, 'slow');
	});

	$('.more-info').on('click', function() {
		$overlay = $(this).parent().find('.modal-item-overlay')
		$overlay.stop()
		$overlay.animate({
			opacity: 1
		}, 'slow');
	});

	$('.modal-item-overlay').on('mouseleave', function() {
		$overlay = $(this).parent().find('.modal-item-overlay')
		$overlay.stop()
		$overlay.animate({
			opacity: 0
		}, 'slow');
	});
});