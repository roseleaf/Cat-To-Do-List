$(document).ready(function() {

    var todo_input = $('#to-do');
    var add_button = $('#add-to-do');
    var todo_space = $('#to-dos');

    todo_input.keypress(function(e){
        if (e.keyCode == 13) {
            addTodo();
        }
    });

    add_button.click(addTodo);

    function addTodo() {
        if(todo_input.val() == ""){
            alert("Enter a to-do item MEOW"); 
            return;
        }

        var todo = $('<div/>', {class: 'to-do clearfix'});

        var checkbox = $('<div/>', {class: "checkbox"});
        checkbox.click(function() {
            todo.toggleClass("checked");
        });

        var title = $('<div/>', {class: "title", text: todo_input.val()});

        var remover = $('<input/>', {type: "button", class: "removerbutton"});

        var editline = $('<input/>', {type:"text", value: title.text(), class: "editline"});
        editline.hide();

        editline.keypress (function(e){
            if (e.keyCode == 13){
                title.text(editline.val());
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
                todo.remove();  
            }
        })

        todo.append(checkbox);
        todo.append(title);
        todo.append(editline);
        todo.append(remover);
        todo_space.append(todo);
        todo_input.val("");
    }
});
