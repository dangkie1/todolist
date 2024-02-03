document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const finishBtn = document.getElementById('finish-btn');

    // Load tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToList(task));

    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTodo();
    });

    addBtn.addEventListener('click', addTodo);

    function addTodo() {
        const todoText = todoInput.value.trim();

        if (todoText !== '') {
            const task = { text: todoText, finished: false };
            addTaskToList(task);
            saveTasksToLocalStorage();
            todoInput.value = '';
            todoInput.focus();
        }
    }

    function addTaskToList(task) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
            <button class="finish-btn">Finish</button>
        `;
        if (task.finished) {
            listItem.classList.add('finished');
        }

        todoList.appendChild(listItem);

        // Delete button functionality
        const deleteBtn = listItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            listItem.remove();
            saveTasksToLocalStorage();
        });

        // Finish button functionality
        const finishBtn = listItem.querySelector('.finish-btn');
        finishBtn.addEventListener('click', function () {
            task.finished = !task.finished;
            listItem.classList.toggle('finished');
            saveTasksToLocalStorage();
        });
    }

    finishBtn.addEventListener('click', function () {
        const finishedTasks = document.querySelectorAll('.finished');
        finishedTasks.forEach(task => task.remove());
        saveTasksToLocalStorage();
    });

    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskItems = document.querySelectorAll('li');
        taskItems.forEach(item => {
            const task = {
                text: item.querySelector('span').textContent,
                finished: item.classList.contains('finished')
            };
            tasks.push(task);
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
