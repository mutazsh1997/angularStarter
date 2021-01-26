
const Main_Doms = {
    showNav: "fas",
    navItems: "items",
}

document.getElementById('year').innerText = new Date().getFullYear();


//check if nav invisible or not and when click on any link hide it :)
var isVisible = false;

(function sectionSelect() {

    if (window.innerWidth <= 900) {
        var navItems = document.querySelectorAll(".items");
        console.log(navItems.length);
        for (let i = 0; i < navItems.length; i++) {
            navItems[i].addEventListener("click", () => {
                isVisible = true;
                setNavToDisplayNone();
            });
        }
    }
})();

function showNav() {
    setNavToDisplayNone();
}

function setNavToDisplayNone() {
    var barIcon = document.querySelector("." + Main_Doms.showNav);
    var navElement = document.querySelector(".navigation__nav");
    var ElStyle = navElement.style;


    if (isVisible == false) {

        ElStyle.animation = "opacityFadeIn .5s ease-in-out";
        ElStyle.opacity = "1";
        ElStyle.display = "block";
        isVisible = true;
        barIcon.classList.add("fa-times");
        barIcon.classList.remove("fa-bars");


    }
    else if (isVisible == true) {
        ElStyle.animation = "opacityFadeOut .5s ease-in-out";
        ElStyle.opacity = "0";
        isVisible = false;

        setTimeout(() => {
            ElStyle.display = "none";
            barIcon.classList.add("fa-bars");
            barIcon.classList.remove("fa-times");
        }, 500);
    }
}

/* code for counter on scroll */

$(window).scroll(scrollCounter);
var viewed = false;

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function scrollCounter() {
    if (isScrolledIntoView($("#skills")) && !viewed) {
        viewed = true;
        $('.skill__persantage').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 1500,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
}

/*code for map*/

function GetMap() {

    //var bingMap = new Microsoft.Maps;

    var map = new Microsoft.Maps.Map('#map', {
        credentials: 'AtRdAtFQi24b264YTk4fsBirRwNHx2KlmAo4fL96tXQVANP49-36KpQnrvzcIGKJ',
        center: new Microsoft.Maps.Location(31.54610588518154, 35.1000485946201),
    });

    var center = map.getCenter();

    var mark = new Microsoft.Maps.Pushpin(center, {
        title: "work",
        subTitle: "my place",
        text: 1,
    });

    map.entities.push(mark);
}


/*====nav position fixed on scroll====*/

//var nav = $("#nav-fixed");
var nav = document.getElementById("nav-fixed");

document.addEventListener('scroll', function () {

    if ($(window).scrollTop() > 450) {

        nav.classList.add('nav-position');

    } else {

        nav.classList.remove('nav-position');

    }
});

const portifolioContainer = document.getElementById('portifolio-container');

class portifolioData {
      async getportifolio() {
        let getData = await fetch("./data");
        let cardData = await getData.json();
        return cardData;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let portifoliosData = new portifolioData();
    let card = '';

    portifoliosData.getportifolio().then(Alldata => {

        Alldata.forEach(data => {

            card += `
           <div class="col-1-of-3" data-category="${data.category}">
               <div class="card-container">
                   <div class="card-header">
                       <div class="card-header__image">
                           <img src="images/${data.image}" alt="${data.title}">
                       </div>
                       <div class="card-header__overlay"></div>
                       <ul class="card-header__tech" id="tech_${data.title}" ${data.tech.forEach(er => {
                setTimeout(() => {
                    document.getElementById(`tech_${data.title}`).
                        insertAdjacentHTML('beforeend', `<li>${er}</li>`);
                }, 100);
            })}>
                       </ul >
                   </div >
                <div class="card-title">
                    <h3>${data.title}</h3>
                </div>
                <div class="card-desc">
                 <p> ${data.desc} </p>
                </div>
                <div class="card-buttons">
                ${  data.codeLink ? `<a href="${data.codeLink}">git code</a>` : ''}  
                ${  data.prjectLink ? `<a href="${data.prjectLink}">open project</a>` : ''}   
                ${  data.designID ? `<a id="${data.designID}1" href="#${data.designID}">preview desing</a>` : ''}   
                 </div>
               </div>
           </div >
                `;
        })
        portifolioContainer.insertAdjacentHTML('afterbegin', card);

    }).then(() => {
        let ui = document.getElementById('uiux1');
        let uier = document.getElementById('popup');
        let closepopup = document.getElementById('popup_close');
        let url = window.location.hash;

        ui.addEventListener('click', er => {
            url = window.location.hash
            setTimeout(() => {
                if (window.location.hash == uier.dataset.uiuxid) {
                    uier.classList.add('popup__active');
                }
            }, 100);

        });
        closepopup.addEventListener('click', e => {
            uier.classList.remove('popup__active');
            window.location.hash = 'portifolio';
        })
    });
})

/*====this for filter portifolio=====*/
var portifoloElements = document.getElementsByClassName("col-1-of-3");
var categories = document.querySelector(".portifolio__category");


function showElements(e) {

    //this for hide change tabs style
    for (let i = 0; i < categories.children.length; i++) {
        const categoryElement = categories.children[i];
        if (categoryElement.dataset.category == e) {
            categoryElement.classList.add('portifolio__category__active')

        } else {
            categoryElement.classList.remove('portifolio__category__active')
        }

    }

    //this for hide and display portifoloElements
    for (let i = 0; i < portifoloElements.length; i++) {
        let portifoloElement = portifoloElements[i];

        if (e == 'all') {
            portifoloElement.classList.remove('hide');
            setTimeout(() => {
                portifoloElement.style.display = 'block';
            }, 200);
        }
        else if (portifoloElement.dataset.category == e) {
            portifoloElement.classList.remove('hide');
            setTimeout(() => {
                portifoloElement.style.display = 'block';
            }, 200);
        } else if (portifoloElement.dataset.category != e) {
            portifoloElement.classList.add('hide');
            setTimeout(() => {
                portifoloElement.style.display = 'none';
            }, 200);

        }
    }

}
