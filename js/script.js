// Start hero banner
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; };
}();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $window = $(window);
var $body = $('body');

var Slideshow = function() {
    function Slideshow() {
        var _this = this;

        var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Slideshow);

        var defaultOptions = {
            $el: $('.slideshow'),
            showArrows: false,
            showPagination: true,
            duration: 4000,
            autoplay: true
        };

        var options = Object.assign({}, defaultOptions, userOptions);

        this.$el = options.$el;
        this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
        this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
        this.showPagination = options.showPagination;
        this.currentSlide = 1;
        this.isAnimating = false;
        this.animationDuration = 1200;
        this.autoplaySpeed = options.duration;
        this.interval;
        this.$controls = this.$el.find('.js-slider-home-button');
        this.autoplay = this.maxSlide > 1 ? options.autoplay : false;

        this.$el.on('click', '.js-slider-home-next', function(event) {
            return _this.nextSlide();
        });
        this.$el.on('click', '.js-slider-home-prev', function(event) {
            return _this.prevSlide();
        });
        this.$el.on('click', '.js-pagination-item', function(event) {
            if (!_this.isAnimating) {
                _this.preventClick();
                _this.goToSlide(event.target.dataset.slide);
            }
        });

        this.init();
    }

    _createClass(Slideshow, [{
        key: 'init',
        value: function init() {
            this.goToSlide(1);

            if (this.autoplay) {
                this.startAutoplay();
            }

            if (this.showPagination) {
                var paginationNumber = this.maxSlide;
                var pagination = '<div class="pagination"><div class="container">';

                for (var i = 0; i < this.maxSlide; i++) {
                    var item = '<span class="pagination__item js-pagination-item ' + (i === 0 ? 'is-current' : '') + '" data-slide=' + (i + 1) + '>' + (i + 1) + '</span>';
                    pagination = pagination + item;
                }

                pagination = pagination + '</div></div>';

                this.$el.append(pagination);
            }
        }
    }, {
        key: 'preventClick',
        value: function preventClick() {
            var _this2 = this;

            this.isAnimating = true;
            this.$controls.prop('disabled', true);
            clearInterval(this.interval);

            setTimeout(function() {
                _this2.isAnimating = false;
                _this2.$controls.prop('disabled', false);
                if (_this2.autoplay) {
                    _this2.startAutoplay();
                }
            }, this.animationDuration);
        }
    }, {
        key: 'goToSlide',
        value: function goToSlide(index) {
            this.currentSlide = parseInt(index);

            if (this.currentSlide > this.maxSlide) {
                this.currentSlide = 1;
            }

            if (this.currentSlide === 0) {
                this.currentSlide = this.maxSlide;
            }

            var newCurrent = this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]');
            var newPrev = this.currentSlide === 1 ? this.$el.find('.js-slider-home-slide').last() : newCurrent.prev('.js-slider-home-slide');
            var newNext = this.currentSlide === this.maxSlide ? this.$el.find('.js-slider-home-slide').first() : newCurrent.next('.js-slider-home-slide');

            this.$el.find('.js-slider-home-slide').removeClass('is-prev is-next is-current');
            this.$el.find('.js-pagination-item').removeClass('is-current');

            if (this.maxSlide > 1) {
                newPrev.addClass('is-prev');
                newNext.addClass('is-next');
            }

            newCurrent.addClass('is-current');
            this.$el.find('.js-pagination-item[data-slide="' + this.currentSlide + '"]').addClass('is-current');
        }
    }, {
        key: 'nextSlide',
        value: function nextSlide() {
            this.preventClick();
            this.goToSlide(this.currentSlide + 1);
        }
    }, {
        key: 'prevSlide',
        value: function prevSlide() {
            this.preventClick();
            this.goToSlide(this.currentSlide - 1);
        }
    }, {
        key: 'startAutoplay',
        value: function startAutoplay() {
            var _this3 = this;

            this.interval = setInterval(function() {
                if (!_this3.isAnimating) {
                    _this3.nextSlide();
                }
            }, this.autoplaySpeed);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.$el.off();
        }
    }]);

    return Slideshow;
}();

(function() {
    var loaded = false;
    var maxLoad = 3000;

    function load() {
        var options = {
            showPagination: true
        };

        var slideShow = new Slideshow(options);
    }

    function addLoadClass() {
        $body.addClass('is-loaded');

        setTimeout(function() {
            $body.addClass('is-animated');
        }, 600);
    }

    $window.on('load', function() {
        if (!loaded) {
            loaded = true;
            load();
        }
    });

    setTimeout(function() {
        if (!loaded) {
            loaded = true;
            load();
        }
    }, maxLoad);

    addLoadClass();
})();
// END Animation Hero banner

//Skills bar

// var skillsDiv = $('#skills');
// $(window).on('scroll', function() {
//     var winT = $(window).scrollTop();
//     var winH = $(window).height();
//     var skillsT = skillsDiv.offset().top;
//     if (winT + winH > skillsT) {
//         $('.skillbar').each(function() {
//             $(this).find('.skillbar-bar').animate({
//                 width: $(this).attr('data-percent')
//             }, 2000);
//         });
//     }
// });


// Input Lock
$('textarea').blur(function() {
    $('#hire textarea').each(function() {
        $this = $(this);
        if (this.value != '') {
            $this.addClass('focused');
            $('textarea + label + span').css({ 'opacity': 1 });
        } else {
            $this.removeClass('focused');
            $('textarea + label + span').css({ 'opacity': 0 });
        }
    });
});

$('#hire .field:first-child input').blur(function() {
    $('#hire .field:first-child input').each(function() {
        $this = $(this);
        if (this.value != '') {
            $this.addClass('focused');
            $('.field:first-child input + label + span').css({ 'opacity': 1 });
        } else {
            $this.removeClass('focused');
            $('.field:first-child input + label + span').css({ 'opacity': 0 });
        }
    });
});

$('#hire .field:nth-child(2) input').blur(function() {
    $('#hire .field:nth-child(2) input').each(function() {
        $this = $(this);
        if (this.value != '') {
            $this.addClass('focused');
            $('.field:nth-child(2) input + label + span').css({ 'opacity': 1 });
        } else {
            $this.removeClass('focused');
            $('.field:nth-child(2) input + label + span').css({ 'opacity': 0 });
        }
    });
});
// timeline at about page
$(function() {
    window.sr = ScrollReveal();

    if ($(window).width() < 768) {
        if ($(".timeline-content").hasClass("js--fadeInLeft")) {
            $(".timeline-content")
                .removeClass("js--fadeInLeft")
                .addClass("js--fadeInRight");
        }

        sr.reveal(".js--fadeInRight", {
            origin: "right",
            distance: "300px",
            easing: "ease-in-out",
            duration: 800
        });
    } else {
        sr.reveal(".js--fadeInLeft", {
            origin: "left",
            distance: "300px",
            easing: "ease-in-out",
            duration: 800
        });

        sr.reveal(".js--fadeInRight", {
            origin: "right",
            distance: "300px",
            easing: "ease-in-out",
            duration: 800
        });
    }

    sr.reveal(".js--fadeInLeft", {
        origin: "left",
        distance: "300px",
        easing: "ease-in-out",
        duration: 800
    });

    sr.reveal(".js--fadeInRight", {
        origin: "right",
        distance: "300px",
        easing: "ease-in-out",
        duration: 800
    });
});



function animation() {
    $('.fadeInUp').each(function() {
        var target = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll > target - windowHeight) {
            $(this).css('opacity', '1');
            $(this).css('transform', 'translateY(0)');
        }
    });
}
animation();
$(window).scroll(function() {
    animation();
});

// scroll button:
$(function() {
    $('a[href*=#]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear');
    });
});