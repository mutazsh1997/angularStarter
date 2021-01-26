 
 (function() {
    const DomItem = {
     manuNav: document.getElementById('navMenu'), 
     showServiceBtn: document.getElementById('arrow'),
     showMoreBtn: document.getElementById('showMore'),
     }
 
    /*smooth scrool */ 
    /*menu nav */
    DomItem.manuNav.addEventListener('click',function(e){
  
    const menu = document.querySelector('nav')
    const i = document.querySelector('.menu span i');
  
     if(i.classList.contains('fa-bars')){
        i.classList.remove('fa-bars');
        i.classList.add('fa-times');
     }else{
        i.classList.remove('fa-times');
        i.classList.add('fa-bars');
     }
     menu.classList.toggle('hidden');
 });
 
/*show more btn */
    DomItem.showMoreBtn.addEventListener('click', function(){
       const hiddenWorks = document.getElementById('hiddenWorks');
       hiddenWorks.classList.toggle('hidden');
       if(this.innerHTML === 'show more'){
      this.innerHTML = 'show less';
    }else{
       this.innerHTML = 'show more';
    }
    });

   
 })();
