
const worksDom = document.querySelector(".works__content");
const aboutUsDom = document.querySelector(".aboutus__content");
const WhyUsDom = document.querySelector(".whyus__content");
 
// this script for fecth data form content.josn
class contentData {
    async getContent() {
        try {
            let result = await fetch("../script/content.json");
            let data = await result.json();
            let workContent = data.ourworks;
            let whyUs = data.whyus;
            let about = data.about;
           
            workContent = workContent.map(item => {
                const title = item.fields.title;
                const id = item.sys.id;
                const image = item.fields.image.fields.file.url;
                return {title, id, image};
            });

            
            whyUs = whyUs.map(item => {
                const title = item.title;
                const description = item.desc;
                
                return {title, description};
            });
            about = about.map(item => {
                const title = item.title;
                const description = item.desc;

                return {title, description};
            });

            return {workContent, whyUs, about};

        } catch (e) {
            console.log(e);
        }
    }
} 

class displayWorksUI { 
    displayWorks(data) {
        let resultWork = '';

        data.workContent.forEach(element => {
            resultWork += `
            <div class="works work-${element.id}">
                <a href="">
                    <img src=${element.image} alt="image">
                    <h3>${element.title}</h3>
                </a>
            </div>`;
        });
        worksDom.innerHTML = resultWork;
    }
    displayWhyUs(data) {
        let resultWhyUs = '';

        data.whyUs.forEach(element => {
            resultWhyUs += `  
                <h3>${element.title}</h3>
                <p>
                   ${element.description}
                </p> `;
        });
        WhyUsDom.innerHTML += resultWhyUs; 
    }
    displayAboutUs(data) {
        let resultAboutUs = '';

        data.about.forEach(element => {
            resultAboutUs += `  
                <h3>${element.title}</h3>
                <p>
                   ${element.description}
                </p> `;
        });
        aboutUsDom.innerHTML += resultAboutUs; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let UI = new displayWorksUI();
    let Content = new contentData();
   
    
    Content.getContent().then(data => {
        if(document.title === "ourWork") {
             UI.displayWorks(data); 
         }
        else if (document.title === "why us"){
             UI.displayWhyUs(data);  
            
        }else if (document.title === "about us") {
            UI.displayAboutUs(data);  
        }
    });
});