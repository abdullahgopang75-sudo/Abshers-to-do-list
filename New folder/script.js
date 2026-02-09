let taskId = 0;

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();
  if (text === "") return;

  let task = createTask(text);
  document.getElementById("todo").appendChild(task);

  input.value = "";
  saveTasks();
}

function createTask(text) {
  let task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.id = "task" + taskId++;

  let span = document.createElement("span");
  span.innerText = text;

  let del = document.createElement("button");
  del.innerText = "X";
  del.className = "delete";
  del.onclick = () => {
    task.remove();
    saveTasks();
  };

  task.appendChild(span);
  task.appendChild(del);

  task.ondragstart = drag;

  return task;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  saveTasks();
}

// SAVE TASKS
function saveTasks() {
  let data = {
    todo: document.getElementById("todo").innerHTML,
    progress: document.getElementById("progress").innerHTML,
    done: document.getElementById("done").innerHTML
  };
  localStorage.setItem("lifeBoard", JSON.stringify(data));
}

// LOAD TASKS
function loadTasks() {
  let data = JSON.parse(localStorage.getItem("lifeBoard"));
  if (!data) return;

  document.getElementById("todo").innerHTML = data.todo;
  document.getElementById("progress").innerHTML = data.progress;
  document.getElementById("done").innerHTML = data.done;

  document.querySelectorAll(".task").forEach(task => {
    task.draggable = true;
    task.ondragstart = drag;
  });
}

loadTasks();