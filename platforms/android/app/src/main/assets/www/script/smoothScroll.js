$(document).ready(function () {

    $("a").click(function () {
        var topPos = $($(this).attr("href")).offset().top;

        $('html, body').animate({
            scrollTop: topPos
        }, 800);


    });

});


