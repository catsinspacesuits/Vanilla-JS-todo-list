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

            todoTextWithCompletion = todo.todoText;

            if (todo.completed === true) {
                todoLi.classList.toggle('toggle');
            } else {         
            }

            todoLi.id = position;
            
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createToggleButton()); 
            todoLi.appendChild(this.createDeleteButton());
            // todoLi.appendChild(this.createChangeButton());
            // todoLi.appendChild(this.createChangeInput());          
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('i');
        deleteButton.className = 'deleteButton far fa-trash-alt';
        return deleteButton;
    },
    createToggleButton: function() {
        var toggleButton = document.createElement('button');
        toggleButton.className = 'toggleButton btn';
        toggleButton.textContent = 'done';
        return toggleButton;
    },
    createChangeButton: function() {
        var createButton = document.createElement('button');
        createButton.className = 'createButton btn';
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

            if (elementClicked.className === 'toggleButton btn') {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            } else if (elementClicked.className === 'changeInput btn') {
                handlers.changeTodo(parseInt(elementClicked.parentNode.id)); 
            } else if  (elementClicked.className === 'deleteButton far fa-trash-alt') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });

    }
};

view.setUpEventListeners();