var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Get number of completed todos.
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        this.todos.forEach(function(todo) {
            // Case 1: If everything’s true, make everything false.
            if (completedTodos === totalTodos) {
                todo.completed = false;
            // Case 2: Otherwise, make everything true.
            } else {
                todo.completed = true;
            }
        })
    }
};

var handlers = {
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function(position, todoText) {
//         var changeTodoTextInput = document.getElementsByClassName('changeInput');
//         // var changedTodoPosition = document.getElementsByClassName('changeInput');
//         // var addChangedText = document.getElementById('changeInput');

// // button needs to be accessible on click
// // button needs to change input in input field to new input.

        
        
//         // changeTodoPositionInput.value = '';
        
//         view.displayTodos();
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function(position) {
        // var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(position);
        // toggleCompletedPositionInput.value = '';
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';

        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement('li');
            var todoTextWithCompletion = '';

            if (todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }

            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todoLi.appendChild(this.createChangeButton());
            todoLi.appendChild(this.createChangeInput());
            todoLi.appendChild(this.createToggleButton());            
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        deleteButton.textContent = 'Delete';
        return deleteButton;
    },
    createToggleButton: function() {
        var toggleButton = document.createElement('button');
        toggleButton.className = 'toggleButton';
        toggleButton.textContent = 'Toggle';
        return toggleButton;
    },
    createChangeButton: function() {
        var createButton = document.createElement('button');
        createButton.className = 'createButton';
        createButton.textContent = 'change';
        return createButton;
    },
    createChangeInput: function() {
        var createInput = document.createElement('input');
        createInput.className = 'changeInput';
        return createInput;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
            var elementClicked = event.target;

            if (elementClicked.className === 'toggleButton') {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            } else if (elementClicked.className === 'changeInput') {
                handlers.changeTodo(parseInt(elementClicked.parentNode.id)); 
            } else if  (elementClicked.className === 'deleteButton') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });

    }
};

view.setUpEventListeners();