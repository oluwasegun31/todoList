const openBtn = document.querySelector(".add-box");
const addBox = document.querySelector(".create");
const closeBox = document.querySelector(".close");
const inputText = document.getElementById("text-input");
const addTodoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

openBtn.addEventListener('click', function(){
    addBox.classList.add('add')
    inputText.value = ''
});

closeBox.addEventListener('click', function(){
    addBox.classList.remove('add')
});

addTodoBtn.addEventListener('click', function(e){ ///adding odo
    e.preventDefault()
    if(inputText.value){
        const todoContain = document.createElement('div') /// creating the todo container div
        todoContain.classList.add('todo') ///adding the class

        const todoItem = document.createElement('div') /// creating the todo item
        todoItem.classList.add('todo-item')
        todoItem.innerText = inputText.value
        todoContain.appendChild(todoItem)

        saveTodoItem(inputText.value)

        const completedBtn = document.createElement('button') //// creating the button
        completedBtn.classList.add('completed-btn')
        completedBtn.innerHTML = `<i class="fa-solid fa-check-double"></i>`
        todoContain.appendChild(completedBtn)
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-arrow-up"></i>`
        todoContain.appendChild(deleteBtn)

        todoList.appendChild(todoContain)
        closeBox.click()
        window.location.reload()
    }
});


todoList.addEventListener('click', function(e){ /// deleting todo and completing todo
    e.preventDefault()
    const item = e.target
    const todo = item.parentElement
    if(item.classList.contains('completed-btn')){
        todo.classList.toggle('completed')
    } else if(item.classList.contains('delete-btn')){
        todo.classList.add('delete')
        deleteTodoStorage(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
    }
});


filterOptions.addEventListener('click', function(e){
    const todosItem = todoList.childNodes;
    todosItem.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex'
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none'
                }
                break
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none'
                }
                break
            
        }
    })
});


function saveTodoItem (todo){ /// to save to local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    } else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}


function showTodoItem(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos')) /// to get the todos from local storage
    }
    todos.forEach(function(todo){
        const todoContain = document.createElement('div')
        todoContain.classList.add('todo')
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')
        todoItem.innerText = todo
        todoContain.appendChild(todoItem)

        const completedBtn = document.createElement('button')
        completedBtn.classList.add('completed-btn')
        completedBtn.innerHTML = `<i class="fa-solid fa-check-double"></i>`
        todoContain.appendChild(completedBtn)
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-arrow-up"></i>`
        todoContain.appendChild(deleteBtn)

        todoList.appendChild(todoContain)

        const preview = document.querySelector(".preview")
        if(todos.length === 0){
            preview.style.display = 'block'
        } else{
            preview.style.display = 'none'
        }
        
    })
}
showTodoItem()


function deleteTodoStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos')) /// to get the todos from local storage
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
    const preview = document.querySelector(".preview")
    if(todos.length === 0){
        preview.style.display = 'block'
    } else{
        preview.style.display = 'none'
    }
    
}

////dark mode
const body = document.querySelector('body')
const mode = document.querySelector('.mode')
const form = document.querySelector('form')
let darkMode = localStorage.getItem('darkMode')

const enableDarkMode = function(){
    body.classList.add('dark')
    mode.classList.add('dark')
    form.classList.add('dark')
    openBtn.classList.add('dark')
    todoList.classList.add('dark')
    localStorage.setItem('darkMode', 'enabled')
} 

const disableDarkMode = function(){
    body.classList.remove('dark')
    mode.classList.remove('dark')
    form.classList.remove('dark')
    openBtn.classList.remove('dark')
    todoList.classList.remove('dark')
    localStorage.setItem('darkMode', null)
}

if(darkMode === 'enabled'){
    enableDarkMode()
}else{
    disableDarkMode()
}

mode.addEventListener('click', function(){
    darkMode = localStorage.getItem('darkMode')
    if(darkMode !== 'enabled' ){
        enableDarkMode()
    } else{
        disableDarkMode()
    }
})

