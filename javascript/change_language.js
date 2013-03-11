jQuery(function($) {
    var LangSwitcher =  {
        init: function() {
            this.bindEvents()

            if (localStorage.getItem('lang') == null)
                this.saveLang('ru')
            if (localStorage.getItem('lang') == 'en')
                $('body').load('/index_en.html')
            if (localStorage.getItem('lang') == 'ru')
                $('body').load('/index_ru.html')
        },

        bindEvents: function() {
            $('.switch-lang').live('click', this.changeLang)
        },

        changeLang: function() {
            if (!$(this).hasClass('active-lang')) {
                var lang = $(this).text()
                $(this)
                    .addClass('active-lang')
                    .parent()
                    .siblings()
                    .find('.switch-lang')
                    .removeClass('active-lang')

                if (lang == 'ru') {
                    $('body').load('/index_ru.html')
                } else {
                    $('body').load('/index_en.html')
                }

                LangSwitcher.saveLang(lang)
            }

            return false
        },

        saveLang: function(lang) {
            localStorage.setItem('lang', lang)
        }

    }

    LangSwitcher.init()
})