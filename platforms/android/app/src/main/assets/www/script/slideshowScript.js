
const Slider_Doms = {
    swipe_dot: "swipe__item",
    activeSwipe: "swipe__item__active",
    textSlide: "textAnimate",
}

const swipeDot = document.querySelectorAll("." + Slider_Doms.swipe_dot);
const mainHeaders = document.querySelectorAll("." + Slider_Doms.textSlide);

var slideCount = 1;

slideShown(slideCount);

function currentSlide(num) {
    slideShown(slideCount = num);

}

function slideShown(num) {

    if (num > mainHeaders.length) {
        slideCount = 1;
    }
    if (num < 1) {
        slideIndex = mainHeaders.length;
    }
    for (let i = 0; i < mainHeaders.length; i++) {
        var Effect = mainHeaders[i].style;
        Effect.display = "none";

    }

    for (i = 0; i < swipeDot.length; i++) {
        swipeDot[i].className = swipeDot[i].className.replace(Slider_Doms.activeSwipe, "");
    }

    mainHeaders[slideCount - 1].style.display = "block";
    swipeDot[slideCount - 1].classList.add(Slider_Doms.activeSwipe);

}


