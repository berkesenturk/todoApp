// select form
const todoForm = document.querySelector('.task-form')
// select the input box
const todoInput = document.querySelector('.create-task-input')
// select the dropdown menu
const todoDropdown = document.getElementById('category')
// select list item
const todoItemsList = document.getElementById('todo-all')

// tasks will be storad as an array
let tasks = []

// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when the form being submitted
  event.preventDefault()
  // add new value
  addTodo(todoInput.value) 

});

// add task function
function addTodo(item) {
  
  if (item !== '') {
    // make a todo object with its properties
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
      category: todoDropdown.value
    };

    // then add it to tasks array
    tasks.push(todo);
    addToLocalStorage(tasks); // then store it in localStorage

    // finally clear the input box value
    todoInput.value = '';
  }
}

// function to render given tasks to screen
function renderTasks(tasks) {
  todoItemsList.innerHTML = '';


  tasks.forEach(function(item) {
    // check if the item is completed
    const checked = item.completed ? 'checked': null;

    const li = document.createElement('li');
    
    // set li to: <li class="item"> </li>
    li.setAttribute('class', 'item');

    // set li to: <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    
    // item completed: ->class += 'checked'
    // how to make duo read algorithm

    li.innerHTML = `
      <div class="left-side">
        <i class="fa fa-list-alt category" style="color:${item.category};" aria-hidden="true"></i>
        <input type="checkbox" class="checkbox" ${checked}>
      </div>
      <div class='task-text'>${item.name}</div>
      
      <div class="right-side">
        <a target="_blank" style="color:#343a40" href="https://www.google.com/calendar/render?action=TEMPLATE&amp;"> Add to Calendar</a>
        |
        <span id='date-text'>No Date</span>     
        |       
        <input id='date' type='date' class='date-picker' aria-hidden="true" data-date-format="yyyy/mm/dd" data-date="2012-02-20"></input>
      
      <button type="button" class="delete-button btn btn-dark fa fa-trash" aria-hidden="true"></button>
      </div>
      `;
    if (item.completed === true) {
      // console.log(li.children[1]);
      li.children[1].classList.add('checked');
    }
    // finally add the <li> to the <ul>
    todoItemsList.append(li);
  });
}

// add tasks to local storage
function addToLocalStorage(tasks) {
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // render them to screen
  renderTasks(tasks);
}

// get all tasks from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('tasks');
  // if reference exists
  if (reference) {
    // converts back to array and store it in tasks array
    tasks = JSON.parse(reference);
    renderTasks(tasks);
  }
}

// toggle the value to completed and not completed
function toggle(id) {
  tasks.forEach(function(item) {
    // use == not ===, because here types are different. 
    // one is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(tasks);
}

// delete task function
  // remove from tasks array
  // update localStorage
  // render updated list to the screen
function deleteTask(id) {

  // filters out the <li> with the id and updates the tasks array
  tasks = tasks.filter(function(item) {
    return item.id != id;
  });

  addToLocalStorage(tasks);
}

function onSubmit() {
  const alertDiv = document.getElementById('alert')
  
  alertDiv.innerHTML = `
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Holy guacamole!</strong> Climb steps one by one by dividing them into smaller pieces.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
}

// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener('click', function(event) {
  // check if the event is on checkbox
  console.log(event.target.type);
  console.log(event.target.parentElement.parentElement);
  if (event.target.type === 'checkbox') {
    // toggle the state
    toggle(event.target.parentElement.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('delete-button')) {

    // get the id from data-key and delete the task
    deleteTask(event.target.parentElement.parentElement.getAttribute('data-key'));
  }

  if (event.target.type === 'date') {

    let datepicker = document.querySelector('input[type="date"]');

    let dateTask = document.getElementById('date-text')

    dateTask.innerText = datepicker.value

  }
});

