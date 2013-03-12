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

    $(document).on('click', '.portfolio-item-overlay', function(event) {
        if (!App.mobileDevice() || App.iPad() ) {
            event.preventDefault()

            data = {
                image: $(this).parents('.portfolio-item-image').find('img').attr('src'),
                title: $(this).find('h5').text(),
                labels: $(this).find('.labels').html(),
                description:  $(this).find('.description').html(),
                link: $(this).parent().attr('href'),
                additionalImages: $(this).find('.additional-images').text().split(',')
            }

            $('.modal-image').html('<img class="active item" src="' + data.image  + '" style="width: 100%;">')
            $('.modal-title').text(data.title)
            $('.modal-labels').html(data.labels)
            $('.modal-description p').html(data.description)
            $('.modal-link').attr('href', data.link)
            $('#portfolio-modal').modal('show')

            if (data.additionalImages[0] != '') {
                $.each(data.additionalImages, function(index, value) {
                    $('.modal-image').append('<img class="item" src="' + value + '" style="width: 100%;">')
                })
                $('#carousel').prepend('<a class="carousel-control left" href="#carousel" data-slide="prev">&lsaquo;</a><a class="carousel-control right" href="#carousel" data-slide="next">&rsaquo;</a>')
            } else {
                $('.carousel-control').remove()
            }
        }
    })

    $(document).on('click', '.more-info', function() {
        console.log($('.modal-item-overlay').css('opacity'))
        if ($('.modal-item-overlay').css('opacity') == 1) {
            descriptionShowHide(0)
        } else {
            descriptionShowHide(1)
        }

    })

    function descriptionShowHide(opacityValue) {
        $overlay = $('.modal-item-overlay')
        $overlay.stop()
        $overlay.animate({
            opacity: opacityValue
        }, 'slow');
    }

});