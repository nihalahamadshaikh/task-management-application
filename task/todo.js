
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ 
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}


function addTodo(e){
    var newTodo = todoInput.value.trim();
    if(newTodo === ""){
        showAlert("error", "Sorry!", "Your Task Is Not Added");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Done", "Your Task is Added");
    }
    e.preventDefault();
}

function addTodoToUI(newTodo){ 
    
    const listItem = document.createElement("li");
    
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value = "";
}
function getTodosFromStorage(){ 
    let todos;

    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function deleteTodo(e) {
    var parent = e.target.parentElement.parentElement;
    if (e.target.className === "fa fa-remove"){
        parent.remove();
        deleteTodoFromStorage(parent.textContent);
        showAlert("warning", "Warninig", "Are you sure to remove this task")
    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){
        if(todo == deleteTodo){
            todos.splice(index, 1);
        }
    });        

    localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }
    });
}

function clearAllTodos() {
    if(confirm("Are you sure to Delete All Tasks")) {
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
    }
    localStorage.removeItem("todos");
}

function showAlert(type, title, message){
    swal({
        title: title,
        text: message,
        icon: type,
        button: "Ok",
    });
}