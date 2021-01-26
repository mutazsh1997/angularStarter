
const createGridBtn = document.getElementById('createCanves');
const pixelGrids = document.getElementById('girdCanves');
const EraserBtn = document.getElementById('eraser');
const pincelBtn = document.getElementById('pincel');
const downloadBtn = document.getElementById('download');
let paintCell = false;
let canDraw = true; 

function makeGrid(){
const gridWidth = document.getElementById('gridWidth').value;
const gridHeight = document.getElementById('gridHeight').value;
let gridRow;
let gridCell;

 while(pixelGrids.firstChild){
          pixelGrids.firstChild.remove();
  }

    for (let r = 1; r <= gridHeight; r++) {
         gridRow = document.createElement('tr');
         pixelGrids.appendChild(gridRow);

         for (let c = 1; c <= gridWidth; c++) {
            gridCell = document.createElement('td');
            gridRow.appendChild(gridCell);

            gridCell.addEventListener('mousedown',function(){
                const color = document.getElementById('colorPiker').value;
                this.style.backgroundColor = color;
                this.nodeValue = 'download'
            });
         }    
    }
}
makeGrid();

function paintOnCanves(){
createGridBtn.addEventListener('click' , function(e){
 e.preventDefault();
 makeGrid();
});

pixelGrids.addEventListener('mousedown',function(){
 paintCell = true;
   pixelGrids.addEventListener('mouseup',function(){
    paintCell = false;
   });
   pixelGrids.addEventListener('mouseleave',function(){
       paintCell = false;
   });

  
   pixelGrids.addEventListener('mouseover',function(ev){
      if (paintCell === true) {
        if(ev.target.tagName === 'TD'){
            if(canDraw){
            const color = document.getElementById('colorPiker').value;  
            ev.target.style.backgroundColor = color;
        }else{
            ev.target.style.backgroundColor = null;
        }
    }
    }  
   });
});
}

paintOnCanves();

pincelBtn.addEventListener('click',function(){
    paintOnCanves();
    canDraw = true;
    
    this.classList.add('active');
    EraserBtn.classList.remove('active');

    pixelGrids.addEventListener('mousedown',function(ev){

        const color = document.getElementById('colorPiker').value;

        if(ev.target.tagName === 'TD')         
        ev.target.style.backgroundColor = color;
    });
});

EraserBtn.addEventListener('click',function(){
    paintOnCanves();
    canDraw = false;
    
    this.classList.add('active');
    pincelBtn.classList.remove('active');
    
    pixelGrids.addEventListener('mousedown',function(ev){
        if(ev.target.tagName === 'TD')
        ev.target.style.backgroundColor = null;
    });
});


