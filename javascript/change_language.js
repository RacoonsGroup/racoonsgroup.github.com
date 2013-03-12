jQuery(function($) {
    LangSwitcher =  {
        init: function() {
            this.bindEvents()
            this.loadTemplates()

            if (localStorage.getItem('lang') == null) {
                this.saveLang('ru')
            }
        },

        loadTemplates: function() {
            $.get('/index_en.html', function(data) {
                LangSwitcher.template_en = data
                if (localStorage.getItem('lang') == 'en') {
                    $('.langSwitchWrap').html(LangSwitcher.template_en)
                    LangSwitcher.template = LangSwitcher.template_en
                }
            })

            $.get('/index_ru.html', function(data) {
                LangSwitcher.template_ru = data
                if (localStorage.getItem('lang') == 'ru') {
                    $('.langSwitchWrap').html(LangSwitcher.template_ru)
                    LangSwitcher.template = LangSwitcher.template_ru
                }
            })

        },

        bindEvents: function() {
            $(document).on('click', '.switch-lang', this.changeLang)
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
                    $('.langSwitchWrap').html(LangSwitcher.template_ru)
                } else {
                    $('.langSwitchWrap').html(LangSwitcher.template_en)
                }

                App.reinit()

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