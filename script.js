var todo_input = document.getElementById('to-do');
var add_button = document.getElementById('add-to-do');
var todo_space = document.getElementById('to-dos');

todo_input.onkeypress = function(e){
    if (e.keyCode == 13) {
        addTodo();
    }
}

add_button.onclick = addTodo;

function addTodo() {
    if(todo_input.value == ""){
        alert("Enter a to-do item MEOW"); 
        return;
    }

    var todo = document.createElement('div');
    todo.className ="to-do clearfix";

    var checkbox = document.createElement('div');
    checkbox.className = "checkbox";
    checkbox.onclick = function() {
        if(todo.className == "to-do clearfix"){
            todo.className = "to-do clearfix checked";
        }else{
            todo.className = "to-do clearfix";
        }
    }

    var title = document.createElement('div');
    title.className = "title";
    title.innerText = todo_input.value;

    var remover = document.createElement('input');
    remover.type = "button";
    remover.className = "removerbutton";

    var editline = document.createElement('input');
    editline.type = "text";
    editline.value = title.innerText; 
    editline.className = "editline";
    editline.style.display = "none";
    editline.onkeypress = function(e){
        if (e.keyCode == 13){
            title.innerText = editline.value;
            this.style.display = "none";
            title.style.display = "";
        }
    }

    title.onclick = function(){
        this.style.display = "none";
        editline.style.display = "";
    }

    remover.onclick = function(){
        if (confirm("Are you sure you want to delete this item?")){
            todo_space.removeChild(todo);   
        }
    }

    todo.appendChild(checkbox);
    todo.appendChild(title);
    todo.appendChild(editline);
    todo.appendChild(remover);
    todo_space.appendChild(todo);
    todo_input.value = "";
}

