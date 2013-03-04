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
                //All pages
                this.$allPages = $('.page')
                //About Us
                this.$aboutUs = $('.about-us')
                //Portfolio
                this.$portfolio = $('.portfolio')
                //Team
                this.$team = $('.team')
                //Feedback
                this.$feedback = $('.feedback')
            },

            bindEvents: function() {
                $(window).on('orientationchange', function() {
                    $('body').hide()
                    location.reload()
                })

                $(window).resize(function() {
                    $(window).off('mousewheel click touchstrat')
                    App.init()
                })

                this.$navigation.on('click touchstart',function(event) {
                    App.scrollToMe($(this).attr('data-scroll-id'))
                })

                if (App.iPad() && App.landscapeOrientation()) {
                    this.setParams()
                    this.hidePreload()

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
                }

                if (!App.mobileDevice() && ($(window).width() > 959)) {
                    this.hidePreload()
                    this.setParams()
                    $(window).one('mousewheel', App.scrollPage)
                } else {
                    $(window).unbind('mousewheel')
                }
            },

            setParams: function() {
                this.$pageWraper.css('marginTop', 0)
                App.activeMenuItem(0)

                if ($(window).width() > 959) {
                    //App.setOurHeightAndPadding(this.$aboutUs, this.$portfolio, this.$team)
                    App.setOurHeightAndPadding(this.$allPages)
                } else {
                    App.unsetOurHeightAndPadding(this.$allPages)
                    //App.unsetOurHeightAndPadding(this.$aboutUs, this.$portfolio, this.$team)
                }
            },

            setOurHeightAndPadding: function() {
                var scaleValue = $(window).height()/750
                var padding = ($(window).height() - 550*scaleValue)/2

                $.each(arguments, function() {
                    $(this).css('height', $(window).height());
                    $(this).find('.container').css({
                        paddingTop: padding,
                        zoom: scaleValue,
                        '-moz-transform': 'scale('+ scaleValue +')',
                        '-moz-transform-origin': 'top',
                        '-o-transform': 'scale('+ scaleValue +')',
                        '-o-transform-origin': 'top'
                    })
                });
            },

            unsetOurHeightAndPadding: function() {
                $.each(arguments, function() {
                    $(this).css('height', 'auto')
                    $(this).find('.container').css({
                        paddingTop: 0,
                        zoom: 1
                    })
                })

            },

            scrollPage: function (event, delta, deltaX, deltaY) {
                var now = parseInt(App.$pageWraper.css('marginTop'))

                App.$pageWraper.stop(true, true)

                if (deltaY < 0) {
                    if (now != -3*$(window).height()) {
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
                var scrollTo = ('-' + $(window).height())*index

                $(window).unbind('mousewheel')

                App.$pageWraper.stop(true)
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
