//get element using query selector
const todoBtn = document.querySelector('#todo-button');
const todoInput = document.querySelector('#todo-input');
const todos = document.querySelector('.todos');
const deleteButton = document.querySelector('.trash-button');
const todoFilter = document.querySelector('#todo-status');
const todoItem = document.querySelector('.todo-container');

//Add Event Listeners

todoBtn.addEventListener('click', addTodo);
todos.addEventListener('click', actionEvent);
todoFilter.addEventListener('click', filterTodo);


//Functions

function addTodo(e) {
    if (todoInput.value === "") {
        return;
    }
    //Prevent form from submitting and refreshing
    e.preventDefault();
    // const currentAtt = todos.getAttribute("display");
    // console.log(currentAtt);
    // todos.setAttribute("display", "flex");
    //Create an empty div
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    todos.appendChild(todoContainer)

    //Create a new list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoContainer.appendChild(newTodo);

    //Create a check button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = `<i class="fas fa-check"></>`;
    completeButton.classList.add('complete-button');
    todoContainer.appendChild(completeButton);

    //Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fas fa-trash"></>`;
    deleteButton.classList.add('trash-button');
    todoContainer.appendChild(deleteButton);
    todoInput.value = "";

}

function actionEvent(e) {
    const actionBtn = e.target;
    if(actionBtn.classList[0] === "trash-button") {
        localStorage.setItem('deleteBtn', actionBtn );
        const todo = actionBtn.parentElement;
        todo.classList.add('fall');
        setTimeout(() => {
            todo.remove();
        }, 1000);
        // todo.addEventListener('transitionend', ()=>{
        //     todo.remove(); 
        // })
    }

    if(actionBtn.classList[0] === "complete-button") {
        const todo = actionBtn.parentElement;
        console.log(todo);
        todo.classList.toggle('done');
    }
}

function filterTodo(e) {
    const filter = todos.childNodes;
    filter.forEach((item)=>{
        switch(e.target.value){
            case "all":
                item.style.display = "flex"
                break;
            
            case "done":
                if(item.classList.contains("done")){
                    item.style.display = "flex";
                }
                else {
                    item.style.display = "none";
                }
                break;

            case "pending":
                if(!item.classList.contains("done")){
                    item.style.display = "flex";
                }
                else {
                    item.style.display = "none";
                }
                break;

            default: todoItem.style.display = "none";
        }
    })
}