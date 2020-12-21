$(document).ready(function () {
	$('.burger').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.menu-links').toggleClass('active');
        $('body').on('click', function (e) {
            var div = $('.menu-links, .burger');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    });

    $('.lang-select').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.lang-dropdown').fadeToggle();
        $('body').on('click', function (e) {
            var div = $('.lang-select, .lang-dropdown');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.lang-select').removeClass('active');
                $('.lang-dropdown').fadeOut();
            }
        });
    });

    $('.current-shop').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.dropdown-shops').toggleClass('active');
        $('body').on('click', function (e) {
            var div = $('.current-shop, .dropdown-shops');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    });

    $('.anchor[href^="#"]').click(function () {
        if($(window).innerWidth() <= 1000) {
           $('.menu-links').removeClass('active'); 
           $('.burger').removeClass('active');
        }
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-150;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    function OpenPopup(popupId) {
        $('body').removeClass('no-scrolling');
        $('.popup').removeClass('js-popup-show');
        popupId = '#' + popupId;
        $(popupId).addClass('js-popup-show');
        $('body').addClass('no-scrolling');
    }
    $('.pop-op').click(function (e) {
        e.preventDefault();
        let data = $(this).data('popup');
        OpenPopup(data);
    });
    function closePopup() {
        $('.js-close-popup').on('click', function (e) {
            e.preventDefault();
            $('.popup').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        });
    }
    closePopup();
    function clickClosePopup(popupId) {
        popupId = '#' + popupId;
        $(popupId).removeClass('js-popup-show');
        $('body').removeClass('no-scrolling');
    }

    $('.table-wrapper').scrollbar();
    $('.faq-wrap').scrollbar();
    if(window.innerWidth < 1000) {
        $('.products-list').scrollbar();
    }
    $('.lk-items').scrollbar();
    $('.popups .winners-col-container').scrollbar();

    function maskInit() {
        $(".phone-mask").inputmask({
            mask:"+7(999)999-99-99",
            "clearIncomplete": true
        });

        $(".card-mask").inputmask({
            mask:"9999-9999-9999-9999",
            "clearIncomplete": true
        });
    }
    maskInit();

    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    if($('.select').length > 1) {
        var parent = $('select').parents('.select');
        $('select').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
    } else {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
    }

    // восстановление пароля
    $('#restore-password .btn').click(function(e){
        e.preventDefault();
        if($('#restore-password form').valid()) {
            $('#restore-password .btn').addClass('disabled');
            $('.clock-text, .after-send').show();
            $('.before-send').hide();
            let dt = new Date();
            let time = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ":" + (dt.getMinutes()+1) + ":" + dt.getSeconds();
            $('.clock').parent().show();
            $('.clock').countdown(time)
            .on('update.countdown', function(event) {
                $(this).html(event.strftime('%M:%S'));
            })
            .on('finish.countdown', function(event) {
                $(this).parent().hide();
                $('.after-send').hide();
                $('.before-send').show();
                $('#restore-password .btn').removeClass('disabled');
            });
        }
    });

    if ($('.main-hashtag-slider').length) {

        function swipperInit() {
            var wrap = $('.main-hashtag-slider');

            var swiper = new Swiper(wrap, {
                slidesPerView: 2,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },

                effect: 'coverflow',
                centeredSlides: true,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 180,
                    depth: 400,
                    modifier: 1,
                    slideShadows: false
                },

                loop: true,
                speed: 400,
                observer: true,
                observeParents: true,

                preloadImages: false,
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 3
                },
                breakpoints: {
                    1000: {
                        slidesPerView: 1,
                        effect: 'auto'
                    }
                }
            });
            swiper.init();
        }

        function swipperInitEdge() {
            var wrap = $('.main-hashtag-slider');

            new Swiper(wrap, {
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },

                centeredSlides: true,

                loop: true,
                speed: 400,
                observer: true,
                observeParents: true,

                preloadImages: false,
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 3
                }
            });
        }
        if (/Edge/.test(navigator.userAgent)) {
            swipperInitEdge();
        } else {
            swipperInit();
        }

    }

    if ($('.hashtag-page-slider').length) {
        var wrap = $('.hashtag-page-slider');

        var swiper = new Swiper(wrap, {
            slidesPerView: 4,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },

            effect: 'coverflow',
            centeredSlides: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 1,
                slideShadows: false
            },

            loop: true,
            speed: 400,
            observer: true,
            observeParents: true,

            preloadImages: false,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 3
            },
            breakpoints: {
                1000: {
                    slidesPerView: 1,
                    effect: 'auto'
                }
            }
        });
        swiper.init();

    }

    $('.btn-number').click(function(e) {
        var type = $(this).attr('data-type');
        var field = $(this).attr('data-field');
        var input = $('input[name ='+field+']');
        var min = input.attr('min');
        var max = input.attr('max');
        min = parseInt(min);
        max = parseInt(max);
        var currentVal;
        var value = input.val();
        if (type == 'minus') {
            if (value > min) {
                currentVal = parseInt(value) - 1;
                input.val(currentVal).change();
            }
        }
        if (type == 'plus') {
            if (value < max) {
                currentVal = parseInt(value) + 1;
                input.val(currentVal).change();
            }
        }
    });
    $('.input-number').change(function() {
        var min = $(this).attr('min');
        var max = $(this).attr('max');
        var val = $(this).val();
        var name = $('.input-number').attr('name');
        if (val == min) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").attr('disabled', 'true');
        } else $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
        if (val == max) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").attr('disabled', 'true');
        } else $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled');
    });
    $('.send-all').click(function(e) {
        var hearts = $('.charity-my-hearts').text();
        hearts = parseInt(hearts);
        if (hearts > 1) {
            $('.input-number').val(hearts).change();
        }
    });

    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.next();

          if (content.is(':visible')) {
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordion();

    $('.tab-trigger').click(function(){
        $('.tab-trigger').removeClass('active');
        var tab = $(this).data('tab');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-item').removeClass('active');
        $('.tab-item.' + tab).addClass('active');
    });

    $('.tab-trigger[data-tab="tab-draw"]').one('click', function() {
        if ($('.lk-draw-item-slider1').length) {
            var wrap = $('.lk-draw-item-slider1');

            var swiper = new Swiper(wrap, {
                loop: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            });
            swiper.init();
        }

        if ($('.lk-draw-item-slider2').length) {
            var wrap = $('.lk-draw-item-slider2');

            var swiper = new Swiper(wrap, {
                slidesPerView: 1,
                loop: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            });
            swiper.init();
        }

        if ($('.lk-draw-item-slider3').length) {
            var wrap = $('.lk-draw-item-slider3');

            var swiper = new Swiper(wrap, {
                slidesPerView: 1,
                loop: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            });
            swiper.init();
        }
    })

    function formatDate(date) {
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yyyy = date.getFullYear();
        if (yyyy < 10) yyyy = '0' + yyyy;

        return dd + '.' + mm + '.' + yyyy;
    }

    if($('.datepicker-here').length) {
        $('.datepicker-here').datepicker({
            minDate: new Date(2020, 1, 1)
        });
        $('.datepicker-here').val(formatDate(new Date()));
    }

    $('.popup-game-coins-wrapper').click(function(e) {
        e.preventDefault();
        $('.popup-game-coins-wrapper').removeClass('active');
        $(this).addClass('active');
        if($('.game-btn.disabled') && $('.charity-btn.disabled')){
            $('.game-btn.disabled, .charity-btn.disabled').removeClass('disabled');
        }
    });

    if ($('.tm-slider').length) {
        var wrap = $('.tm-slider');

        var swiper = new Swiper(wrap, {
            effect: 'fade',
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
        });
        swiper.init();

    }

    if ($('.products-slider-1').length) {
        var wrap = $('.products-slider-1');

        var swiper = new Swiper(wrap, {
            slidesPerView: 5,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                1000: {
                    slidesPerView: 2
                }
            }
        });
        swiper.init();
    }

    if ($('.products-slider-2').length) {
        var wrap = $('.products-slider-2');

        var swiper = new Swiper(wrap, {
            slidesPerView: 3,
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                1000: {
                    slidesPerView: 2,
                    loop: true
                }
            }
        });
        swiper.init();
    }

    if ($('.products-slider-3').length) {
        var wrap = $('.products-slider-3');

        var swiper = new Swiper(wrap, {
            slidesPerView: 5,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                1000: {
                    slidesPerView: 2
                }
            }
        });
        swiper.init();
    }

    if ($('.products-slider-4').length) {
        var wrap = $('.products-slider-4');

        var swiper = new Swiper(wrap, {
            slidesPerView: 5,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                1000: {
                    slidesPerView: 1
                }
            }
        });
        swiper.init();
    }

    if ($('.products-slider-5').length) {
        var wrap = $('.products-slider-5');

        var swiper = new Swiper(wrap, {
            slidesPerView: 3,
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                1000: {
                    slidesPerView: 1,
                    loop: true
                }
            }
        });
        swiper.init();
    }

    if ($('.products-slider-6').length) {
        var wrap = $('.products-slider-6');

        var swiper = new Swiper(wrap, {
            slidesPerView: 5,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                1000: {
                    slidesPerView: 1
                }
            }
        });
        swiper.init();
    }

    if ($('.products-slider-7').length) {
        var wrap = $('.products-slider-7');

        var swiper = new Swiper(wrap, {
            slidesPerView: 5,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                1000: {
                    slidesPerView: 1
                }
            }
        });
        swiper.init();
    }

    if ($('.products-slider-8').length) {
        var wrap = $('.products-slider-8');

        var swiper = new Swiper(wrap, {
            slidesPerView: 2,
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                1000: {
                    slidesPerView: 1,
                    loop: true
                }
            }
        });
        swiper.init();
    }

    if ($('.wishes-slider').length) {
        var wrap = $('.wishes-slider');

        var swiper = new Swiper(wrap, {
            effect: 'fade',
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
        swiper.init();
    }

    if($('.dropify').length) {
        $('.dropify').dropify({
            tpl: {
                clearButton: '<button type="button" class="dropify-clear">X</button>'
            }
        });
    }

    // choise shop
    $('#shops').on('select2:select', function(){
        $('.shops-btn').removeClass('disabled');
    });
});

$(window).on('load', function() {
    setTimeout(function(){
        $('.preloader').fadeOut();
    },500);
});