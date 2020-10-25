//  Nav bar for mobile phone
$('.menu-toggle').click(function() {

    $('#gNav').toggleClass('open', 500);
    $(this).toggleClass('close');

})


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
// Anchor link smooth

$(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 100
    }, 900);
});