
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoPriority = document.getElementById("todo-priority");
const todoList = document.getElementById("todo-list");

const currentDate = document.getElementById("current-date");
const currentTime = document.getElementById("current-time");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Simpan tugas ke localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Tampilkan tanggal dan jam secara otomatis
function updateDateTime() {
  const now = new Date();

  if (currentDate) {
    currentDate.textContent = now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  if (currentTime) {
    currentTime.textContent = now.toLocaleTimeString("id-ID");
  }
}

// Tampilkan semua tugas
function renderTasks() {
  todoList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const listItem = document.createElement("li");
    listItem.style.marginBottom = "15px";

    // Nama tugas
    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    if (task.completed) {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "gray";
    }

    // Label prioritas
    const taskPriorityLabel = document.createElement("span");
    const priority = task.priority || "Medium";

    taskPriorityLabel.textContent = " [" + priority + "]";
    taskPriorityLabel.style.fontWeight = "bold";
    taskPriorityLabel.style.marginLeft = "8px";

    if (priority === "High") {
      taskPriorityLabel.style.color = "#d93025";
    } else if (priority === "Medium") {
      taskPriorityLabel.style.color = "#b7791f";
    } else {
      taskPriorityLabel.style.color = "#188038";
    }

    // Tombol selesai
    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Completed" : "Done";
    completeButton.disabled = task.completed;

    completeButton.addEventListener("click", function () {
      tasks[index].completed = true;
      saveTasks();
      renderTasks();
    });

    // Tombol hapus
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    listItem.appendChild(taskText);
    listItem.appendChild(taskPriorityLabel);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);
  });
}

// Tambahkan tugas baru
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = todoInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    text: taskText,
    priority: todoPriority ? todoPriority.value : "Medium",
    completed: false
  });

  saveTasks();
  renderTasks();

  todoInput.value = "";
  todoInput.focus();
});

// Jalankan fitur saat halaman dibuka
updateDateTime();
setInterval(updateDateTime, 1000);

renderTasks();
