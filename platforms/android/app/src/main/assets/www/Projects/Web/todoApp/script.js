///submit btn 
var submitItem = document.getElementById("submitBtn");
//the input filed  
var inputItem = document.getElementById("todo-input");
//get list items ul
var listItems = document.getElementById("todo-list");  
//search bar filter 
var filter = document.getElementById("filterSearch");
var clear = document.getElementById("clear");
//get the count of todo list items
var listCount = document.getElementById("todo-number");
 
submitItem.addEventListener("click", addItem);

//this for edit the text or remove li from dom
listItems.addEventListener('click', itemChanges);

// filter box 
filter.addEventListener('keyup', filterItems);
clear.addEventListener('click', clearFilter);

listCount.innerText = 0;


function addItem(e) {
    

    e.preventDefault();
    //create a node elements

    //create a new li element
    var liElement = document.createElement("li");
    //give the li element a class
    liElement.className = "todo__item clearFix";

     //create span and put the value of input on it
     var todoValue = document.createElement("span");
     todoValue.classList = "todo__item-description";
     todoValue.innerText = inputItem.value;
    //create a delete btn 
    var deleteBtn = document.createElement("button");
    //give the delete btn class
    deleteBtn.className = "todo__item-delete";
    deleteBtn.innerText = "X";
    //create edit icon
    var edit = document.createElement("li");
    edit.className = "todo__item-edit fas fa-edit";
    edit.innerText = "  ";
    
    //add edit btn to li element
    liElement.appendChild(edit);
    //add todovalue to list item
    liElement.appendChild(todoValue);
   //add delete btn to li element
    liElement.appendChild(deleteBtn);
  
    //check if input filed is not null
  
        itemsAppend(liElement);

}; 

function itemsAppend(item){
    if(inputItem.value !== ""){

        listItems.appendChild(item);
        inputItem.value = ""; 
        listCount.innerText = listItems.childElementCount;
       

    }else {
            alert("add something");
    }
}

function itemChanges(e) {
 
    //remove button in todo item
    if(e.target.classList.contains("todo__item-delete")) {
        if(confirm("are you sure?")) {
            var li = e.target.parentElement; //li is the todo__item
            listItems.removeChild(li);

            //update the count of to-do item 
            listCount.innerText = listItems.childElementCount;
            
        }
    }
    console.log(e.target.classList.contains("todo__item-edit"));
    if (e.target.classList.contains("todo__item-edit")) {
       
        var textToEdit = e.target.nextSibling;

        var textEdit = prompt("please enter your text", textToEdit.innerText);  
        if(textEdit !== null)
            textToEdit.innerText = textEdit;
    }
}
function clearFilter(e) { 

    if(filter.value !== "") {
      filter.value = "";
      checkFilter();
      
    }else {
        console.log("it is null");
    }
 }
function filterItems(e) {

    checkFilter(e);
     
}

function checkFilter(e) {

     //convert the text input to lower case 
     var text = filter.value.toLowerCase();
     //get li element from list 
     var item = document.getElementsByClassName("todo__item");

   // convert item from htmlCollection to array;
   Array.from(item).forEach(function(item){
    //get the text from li element
        var itemSearch = item.childNodes[1].textContent;
    
     if(itemSearch.toLowerCase().indexOf(text) !== -1) {
        item.classList.remove("hide");
     }else {
        item.classList.add("hide");
    }
});
}
