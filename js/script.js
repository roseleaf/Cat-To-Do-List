$(document).ready(function() {

    var todo_input = $('#to-do');
    var add_button = $('#add-to-do');
    var todo_space = $('#to-dos');

    todo_input.keypress(function(e){
        if (e.keyCode == 13) {
            createTodoAction();
        }
    });

    add_button.click(createTodoAction);

    function createTodoAction(){
        var todo = {title: todo_input.val(), checked: false};
        var key = saveTodo(todo);
        addTodo(key, todo);
    }

    for (i=0; i<=localStorage.length-1; i++) {
        key = localStorage.key(i);
        addTodo(key, JSON.parse(localStorage.getItem(key)));
    }

    function saveTodo(todo){
        var key = localStorage.length;
        localStorage.setItem(key, JSON.stringify(todo));
        return key;
    }

    function addTodo(key, todo_obj) {
        if(todo_obj.title == ""){
            alert("Enter a to-do item MEOW"); 
            return;
        }

        var todo_el = $('<div/>', {class: 'to-do clearfix'});

        var checkbox = $('<div/>', {class: "checkbox"});
        if(todo_obj.checked) {
            todo_el.addClass("checked");
        }
        checkbox.click(function() {
            todo_el.toggleClass("checked");
            todo_obj.checked = !todo_obj.checked;
            localStorage.setItem(key, JSON.stringify(todo_obj));
        });

        var title = $('<div/>', {class: "title", text: todo_obj.title});

        var remover = $('<input/>', {type: "button", class: "removerbutton"});

        var editline = $('<input/>', {type:"text", value: title.text(), class: "editline"});
        editline.hide();

        editline.keypress (function(e){
            if (e.keyCode == 13){
                todo_obj.title = editline.val();
                localStorage.setItem(key, JSON.stringify(todo_obj));
                title.text(todo_obj.title);
                $(this).hide();
                title.show();
            }
        });

        title.click (function(){
            $(this).hide();
            editline.show();
        });

        remover.click (function(){
            if (confirm("Are you sure you want to delete this item?")){
                localStorage.removeItem(key);
                todo_el.remove();  
            }
        });

        todo_el.append(checkbox);
        todo_el.append(title);
        todo_el.append(editline);
        todo_el.append(remover);
        todo_space.append(todo_el);
        todo_input.val("");
    }
});
