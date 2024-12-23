const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task.text, task.completed));
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((taskItem) => {
    const text = taskItem.querySelector(".task-text").textContent;
    const completed = taskItem.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a task to the DOM
function addTaskToDOM(taskText, isCompleted = false) {
  const taskItem = document.createElement("li");
  const taskTable = document.createElement("table");
  const taskRow = document.createElement("tr");

  if (isCompleted) {
    taskItem.classList.add("completed");
  }

  // Task text cell
  const taskTextCell = document.createElement("td");
  taskTextCell.textContent = taskText;
  taskTextCell.classList.add("task-text");
  taskRow.appendChild(taskTextCell);

  // Complete button cell
  const completeBtnCell = document.createElement("td");
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.classList.add("complete-btn");
  completeBtn.addEventListener("click", () => {
    taskItem.classList.toggle("completed");
    saveTasks();
  });
  completeBtnCell.appendChild(completeBtn);
  taskRow.appendChild(completeBtnCell);

  // Delete button cell
  const deleteBtnCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    taskItem.remove();
    saveTasks();
  });
  deleteBtnCell.appendChild(deleteBtn);
  taskRow.appendChild(deleteBtnCell);

  // Append row to table
  taskTable.appendChild(taskRow);
  taskItem.appendChild(taskTable);

  // Append task to list
  taskList.appendChild(taskItem);
}

// Add task button click event
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  addTaskToDOM(taskText);
  saveTasks();
  taskInput.value = "";
});

// Load tasks on page load
loadTasks();
