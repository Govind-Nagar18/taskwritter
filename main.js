        // DOM Elements
        const taskInput = document.getElementById('task-input');
        const addTaskButton = document.getElementById('add-task');
        const taskList = document.getElementById('task-list');
        const totalTasksSpan = document.getElementById('total-tasks');
        const completedTasksSpan = document.getElementById('completed-tasks');

        // Task array to store all tasks
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add task function
        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText) {
                const task = {
                    id: Date.now(),
                    text: taskText,
                    completed: false
                };
                tasks.push(task);
                renderTask(task);
                taskInput.value = '';
                updateStats();
                saveTasks();
            }
        }

        // Render a single task
        function renderTask(task) {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');
            taskElement.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="task-buttons">
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            // Event listeners for complete and delete buttons
            taskElement.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(task.id));
            taskElement.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

            taskList.appendChild(taskElement);
        }

        // Toggle task complete status
        function toggleComplete(id) {
            const task = tasks.find(t => t.id === id);
            task.completed = !task.completed;
            renderTasks();
            updateStats();
            saveTasks();
        }

        // Delete task
        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
            updateStats();
            saveTasks();
        }

        // Render all tasks
        function renderTasks() {
            taskList.innerHTML = '';
            tasks.forEach(renderTask);
        }

        // Update task statistics
        function updateStats() {
            totalTasksSpan.textContent = tasks.length;
            completedTasksSpan.textContent = tasks.filter(t => t.completed).length;
        }

        // Save tasks to localStorage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Event listeners
        addTaskButton.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });

        // Initial render
        renderTasks();
        updateStats();
