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

    $('.portfolio-item-overlay').click(function(event) {
        event.preventDefault()
        data = {
            image: $(this).parents('.portfolio-item-image').find('img').attr('src'),
            title: $(this).find('h5').text(),
            labels: $(this).find('.labels').html(),
            description:  $(this).find('.description').html(),
            link: $(this).parent().attr('href')
        }
        console.log(data)
        $('#portfolio-modal').modal('show')
    })

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