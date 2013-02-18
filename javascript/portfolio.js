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
        if (!App.mobileDevice() || App.iPad() ) {
            event.preventDefault()
            data = {
                image: $(this).parents('.portfolio-item-image').find('img').attr('src'),
                title: $(this).find('h5').text(),
                labels: $(this).find('.labels').html(),
                description:  $(this).find('.description').html(),
                link: $(this).parent().attr('href')
            }
            $('.modal-image img').attr('src', data.image)
            $('.modal-title').text(data.title)
            $('.modal-labels').html(data.labels)
            $('.modal-description p').html(data.description)
            $('.modal-link').attr('href', data.link)
            $('#portfolio-modal').modal('show')
        }
    })

	$('.more-info').toggle(function() {
		$overlay = $(this).parent().find('.modal-item-overlay')
		$overlay.stop()
		$overlay.animate({
			opacity: 1
		}, 'slow');
	}, function() {
        $overlay = $(this).parent().find('.modal-item-overlay')
        $overlay.stop()
        $overlay.animate({
            opacity: 0
        }, 'slow');
    });

});