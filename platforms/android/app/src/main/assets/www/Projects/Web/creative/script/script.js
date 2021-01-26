
//jQuery script
$(document).ready(function() {

    /* check the arrows*/
    function chackTestimonelsArrow(){
        var Rarrow = $('.slider__next'),
            Larrow = $('.slider__previes');
         
            var sc = 100;
        
            if($(".silder__item:first").hasClass('active')){
                Larrow.fadeOut(sc);
            }else{
                Larrow.fadeIn(sc);
            }
            if ($(".silder__item:last").hasClass('active')){
               Rarrow.fadeOut(sc);
            }else{
                Rarrow.fadeIn(sc);
            }
        }
        chackTestimonelsArrow();
        
    //this script for image slider    
   $(".slider__icon i").click(function(){
    var acitveImage = $(".slider__box .active");
    
        if($(this).hasClass('slider__next')){
           
            acitveImage.fadeOut(100,function(){
              $(this).removeClass('active').next('.silder__item').addClass('active').fadeIn();
              chackTestimonelsArrow();
            });
            console.log($(this));
        }else if($(this).hasClass("slider__previes")){
            
            acitveImage.fadeOut(100,function(){
                $(this).removeClass('active').prev('.silder__item').addClass('active').fadeIn();
                chackTestimonelsArrow();
            });
            console.log($(this));
        }  
        
      });   
      
      //this for make the iframe height 100% of the content of page that reload
      $('#frame').on( 'load', function() {
      
        //What some time for older browser
        setTimeout(() => {
            
            this.style.height =  this.contentWindow.document.body.offsetHeight + 20 + 'px';
        }, 100);
         
    });
    // this script to change contents 
    var target = $(".nav__link"),
        content = $(".content__pages iframe");
    
   target.click(function (e) { 
        e.preventDefault();
        
            target = $(this).data('target');
            content.attr("src", "pages/" + target + ".html");
         
    });
});