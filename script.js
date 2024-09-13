// frontend/script.js

const apiUrl = 'http://127.0.0.1:5000/tasks';

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskName = taskInput.value.trim();
    if (taskName) {
        const newTask = { id: Date.now(), name: taskName };
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        taskInput.value = '';
        fetchTasks();
    }
}

async function deleteTask(taskId) {
    await fetch(`${apiUrl}/${taskId}`, {
        method: 'DELETE'
    });
    fetchTasks();
}

document.addEventListener('DOMContentLoaded', fetchTasks);
