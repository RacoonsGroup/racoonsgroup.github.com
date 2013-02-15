jQuery(function($) {
    $(window).load(function() {

        $('.mobile-nav-contacts-label').on('click', function() {
            $('.mobile-nav-contacts-inner').slideToggle()
        })

        App = {
            init: function() {
                this.bindElements()
                this.bindEvents()
            },

            bindElements: function() {
                //Pages wraper
                this.$pageWraper = $('.all-pages-wrap')
                //Navigation
                this.$navigation = $('#navigation a')
                //Main Page
                this.$mainPage = $('.main-page')
                //About Us
                this.$aboutUs = $('.about-us')
                //Portfolio
                this.$portfolio = $('.portfolio')
                //Team
                this.$team = $('.team')
            },

            bindEvents: function() {
                $(window).on('orientationchange', function() {
                    $('body').hide()
                    location.reload()
                })

                if (!App.mobileDevice() || App.iPad()) {

                    if (App.landscapeOrientation()) {
                        this.setParams()
                        this.hidePreload()

                        $(window).resize(function() {
                            App.setParams()
                        });

                        $(window).swipe({
                            swipeDown: function() {
                                $(window).swipe('disable')
                                App.scrollPage(event, 0, 0, '1')
                            },
                            swipeUp: function() {
                                $(window).swipe('disable')
                                App.scrollPage(event, 0, 0, '-1')
                            }
                        })

                        $(window).one('mousewheel', App.scrollPage)

                        this.$navigation.on('click, touchstart',function(event) {
                            App.scrollToMe($(this).attr('data-scroll-id'))
                        })
                    }
                }
            },

            setParams: function() {
                this.setOurHeight(this.$aboutUs, this.$portfolio, this.$team)
                this.setOurMargin(this.$aboutUs, this.$portfolio, this.$team)
            },

            setOurHeight: function() {
                $.each(arguments, function() {
                    $(this).css('height', $(window).height());
                });
            },

            setOurMargin: function() {
                var padding = ($(window).height() - 550)/2
                $.each(arguments, function() {
                    $(this).find('.container').css({
                        paddingTop: padding,
                    })
                })
            },

            scrollPage: function (event, delta, deltaX, deltaY) {
                var now = parseInt(App.$pageWraper.css('marginTop'))

                App.$pageWraper.stop(true, true)

                if (deltaY < 0) {
                    if (now != -2*$(window).height()) {
                        var scrollTo = now - $(window).height() + 'px'
                    }
                } else {
                    if (now != 0) {
                        var scrollTo = now + $(window).height() + 'px'
                    }
                }
                App.scrollAnimation(scrollTo)
            },

            scrollToMe: function(index) {
                var scrollTo = '-' + $(window).height()*index
                App.scrollAnimation(scrollTo)
            },

            scrollAnimation: function(destination) {
                var index = -1 * parseInt(destination) / $(window).height()

                App.$pageWraper.animate({marginTop: destination}, 'slow', function() {
                    $(window).one('mousewheel', App.scrollPage)
                    $(window).swipe('enable')
                })

                App.activeMenuItem(index)
            },

            activeMenuItem: function(index) {
                if (!isNaN(index)) {
                    App.$navigation.removeClass('active')
                    $(App.$navigation[index]).addClass('active')
                }
            },

            hidePreload: function() {
                this.$mainPage.slideUp()
            },

            mobileDevice: function() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i.test(navigator.userAgent)
            },

            iPad: function() {
                return /iPad/i.test(navigator.userAgent)
            },

            landscapeOrientation: function() {
                if ($(window).width() > $(window).height()) {
                    return true
                } else {
                    return false
                }
            }

        }

        App.init()

    });
});
