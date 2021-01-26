$(document).ready(function() {
    
    /*set nice Scroll */
    $("a").click(function(){
        var pos = $($(this).attr('href')).offset().top;

        $('html,body').animate({
           scrollTop : pos  },1000);
       
    });

/* check the arrows*/
function chackTestimonelsArrow(){
var Rarrow = $('.Right'),
    Larrow = $('.Left');
 
    var sc = 100;

    if($(".person:first").hasClass('active')){
        Larrow.fadeOut(sc);
    }else{
        Larrow.fadeIn(sc);
    }
    if ($(".person:last").hasClass('active')){
       Rarrow.fadeOut(sc);
    }else{
        Rarrow.fadeIn(sc);
    }
}
chackTestimonelsArrow();


$(".testimoniels i").click(function(){
   var person = $(".testimoniels .active");
    if($(this).hasClass('Right')){
      
        person.fadeOut(100,function(){
         $(this).removeClass('active').next('.person').addClass('active').fadeIn();
         chackTestimonelsArrow();
    });
   }else if($(this).hasClass("Left")){
       
    person.fadeOut(100,function(){
           $(this).removeClass('active').prev('.person').addClass('active').fadeIn();
           chackTestimonelsArrow();
       });
   }
});

/* testimoniels */
 
    /*slick our team */
   
    var slick = $(".slick");
    $(slick).slick({
        dots: true,
        vertical: false,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1
      });
 });