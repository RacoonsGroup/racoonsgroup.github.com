jQuery(function($) {
    $(window).load(function() {

        App = {
            init: function() {
                this.bindElements()
                this.bindEvents()
                this.setParams()
            },

            bindElements: function() {
                //Titles
                this.$allTitles = $('.page-main-title')
                //Links
                this.$allLinks = $('.menu a')
                //Mobile Menu Links
                this.$allMobileLinks = $('.mobile-bottom a')
                //Menu
                this.$menuWrap = $('.menu-wraper')
                this.$menu = $('.menu')
                //Main Page
                this.$mainPage = $('.main-page')
                this.$logo = $('.logo')
                //About Us
                this.$aboutUs = $('.about-us')
                this.$aboutUsTop = $('.about-us-top')
                this.$aboutUsWrap = $('.about-us-wrap')
                //Portfolio
                this.$portfolio = $('.portfolio')
                this.$portfolioTop = $('.portfolio-top')
                this.$portfolioWrap = $('.portfolio-wrap')
                //Team
                this.$team = $('.team')
                this.$teamTop = $('.team-top')
                this.$teamWrap = $('.team-wrap')
                //Contacts
                this.$contacts = $('.contacts')
                this.$contactsTop = $('.contacts-top')
                this.$contactsWrap = $('.contacts-wrap')
                //Titles
                this.aboutUsTitle = $('#about-us-title')
                this.portfolioTitle = $('#portfolio-title')
                this.teamTitle = $('#team-title')
                this.contactsTitle = $('#contacts-title')
            },

            bindEvents: function() {
                $(window).scroll(function() {
                    if (App.itsMobile()) {
                        if (App.iPad()) {
                            //Menu show/Hide
                            App.menuShowHide()
                            //Check active page
                            App.checkActive()
                        }
                    } else {
                        App.scroll()
                    }
                });
                $(window).resize(function() {
                    App.setParams()
                });
                this.$allTitles.on('click', App.scrollMeBack)
                this.$allLinks.on('click', App.scrollToMe)
            },

            setParams: function() {
                this.$mainPage.css('height', $(window).height());
                this.$logo.css('margin-top', ( $(window).height() - this.$logo.height() - 50 ) / 2 );
                //Freez All Wraps
                this.freezWrapHeight(this.$aboutUsWrap)
                this.freezWrapHeight(this.$portfolioWrap)
                this.freezWrapHeight(this.$teamWrap)
                //Freez fixed blocks width
                this.freezOurWidth(this.$aboutUsTop, this.$aboutUs, this.$portfolio, this.$portfolioTop, this.$team, this.$teamTop)
                //Scroll
                if (App.itsMobile() == false) {
                    App.scroll()
                }
            },

            scroll: function() {
                //Show/Hide menu
                this.menuShowHide()
                //Change logo opacity
                this.setLogoOpacity()
                //Fixing Blocks
                this.fixThisBlock(this.$aboutUsWrap, this.$aboutUsTop, this.$aboutUs)
                this.fixThisBlock(this.$portfolioWrap, this.$portfolioTop, this.$portfolio)
                this.fixThisBlock(this.$teamWrap, this.$teamTop, this.$team)
                //Check active page
                this.checkActive()
            },

            itsMobile: function() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i.test(navigator.userAgent)
            },

            iPad: function() {
                return /iPad/i.test(navigator.userAgent)
            },

            freezWrapHeight: function(wrap) {
                wrap.css('height', wrap.height())
            },

            freezOurWidth: function() {
                $.each(arguments, function() {
                    $(this).css('width', $(window).width());
                });
            },

            calculateLogoOpacity: function() {
                var opacity = 1 - $(window).scrollTop() / $(window).height() * 2
                return opacity
            },

            setLogoOpacity: function() {
                this.$logo.css('opacity', this.calculateLogoOpacity());
            },

            checkActive: function() {
                var $pages = [App.$aboutUsWrap, App.$portfolioWrap, App.$teamWrap, App.$contactsWrap]
                var active = App.$aboutUsWrap

                $.each($pages, function(index, item) {
                    if ($(window).scrollTop() + $(window).height() - 70 > $(item).offset().top) {
                        active = item
                    }
                });

                App.$allLinks.parent().removeClass('active')

                var activeId = $(active).find('.page-main-title').attr('id')
                this.$menu.find('a[href="#' + activeId + '"]').parent().addClass('active')

            },

            fixThisBlock: function(wrap, top, main) {
                if ( wrap.offset().top - $(window).height() + main.outerHeight(true) <= $(window).scrollTop() ) {
                    top.css({
                        position: 'fixed',
                        top: $(window).height() - main.outerHeight(true) - top.outerHeight(true)
                    });
                    main.css({
                        position: 'fixed',
                        top: $(window).height() - main.outerHeight(true)
                    });
                } else {
                    var items = [top, main]
                    $.each(items, function() {
                        $(this).css({
                            position: 'relative',
                            top: 0
                        });
                    });
                }
            },

            menuShowHide: function() {
                if (App.calculateLogoOpacity() <= 0) {
                    App.$menuWrap.slideDown(function() {
                        App.$menu.fadeIn();
                    })
                } else {
                    App.$menu.fadeOut(function() {
                        App.$menuWrap.slideUp();
                    });
                }
            },

            scrollToMe: function() {
                var target = $(this).attr('href')
                var targetObjClass = $(target).parents('div[class$="-wrap"]').attr('class')

                App.scrollMe(targetObjClass)

                return false
            },

            scrollMeBack: function() {
                var targetObjClass = $(this).parents('div[class$="-wrap"]').attr('class')
                App.scrollMe(targetObjClass)
            },

            scrollMe: function(targetObjClass) {
                var $pages = [App.$aboutUsWrap, App.$portfolioWrap, App.$teamWrap, App.$contactsWrap]
                var scrollTo = 0
                $.each($pages, function(index, item) {
                    if ($(this).attr('class') == targetObjClass) {
                        scrollTo += $(this).height()
                        return false
                    } else {
                        scrollTo += $(this).height()
                    }
                });

                if (App.itsMobile()) {

                    $('body').scrollTop(scrollTo)

                } else {

                    $('html, body').animate({
                        scrollTop: scrollTo
                    }, 'slow');

                }

            }

        }

        App.init()

    });
});
