jQuery(function($) {
    $(window).load(function() {

        App = {
            init: function() {
                this.bindElements()
                this.bindEvents()
                this.setParams()
            },

            bindElements: function() {
                //Main Page
                this.$mainPage = $('.main-page')
                this.$logo = $('.logo')
                //About Us
                this.$aboutUs = $('.about-us')
                //Portfolio
                this.$portfolio = $('.portfolio')
                //Team
                this.$team = $('.team')
                //Contacts
                this.$contacts = $('.contacts')
            },

            bindEvents: function() {
                this.setParams()

                $(window).scroll(function() {
                    //alert(1)
                })

                $(window).resize(function() {
                    App.setParams()
                });
            },

            setParams: function() {
                this.$logo.css('margin-top', ( $(window).height() - this.$logo.height() - 50 ) / 2 );
//                this.setOurHeight(this.$mainPage, this.$aboutUs, this.$portfolio, this.$team, this.$contacts)
                this.setOurHeight(this.$aboutUs, this.$portfolio, this.$team)
                this.setOurMargin(this.$aboutUs, this.$portfolio, this.$team)
            },

            setOurHeight: function() {
                $.each(arguments, function() {
                    $(this).css('height', $(window).height());
                });
            },

            setOurWidth: function() {
                $.each(arguments, function() {
                    $(this).css('width', $(window).width());
                });
            },

            setOurMargin: function() {
                var padding = ($(window).height() - 600)/2
                $.each(arguments, function() {
                    $(this).find('.container').css({
                        paddingTop: padding,
                    })
                })
            }

        }

        App.init()

    });
});
