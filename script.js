const taskList = document.getElementById('taskList');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const addTaskButton = document.getElementById('addTask');

let tasks = [];

// Function to render tasks
function renderTasks(filter) {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.title}: ${task.description}</span>
            <div>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a task
addTaskButton.addEventListener('click', () => {
    const title = taskTitle.value;
    const description = taskDescription.value;
    if (title) {
        tasks.push({ title, description, completed: false });
        taskTitle.value = '';
        taskDescription.value = '';
        renderTasks();
    }
});

// Function to toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Filtering tasks
document.getElementById('allTasks').addEventListener('click', () => renderTasks('all'));
document.getElementById('completedTasks').addEventListener('click', () => renderTasks('completed'));
document.getElementById('incompleteTasks').addEventListener('click', () => renderTasks('incomplete'));
