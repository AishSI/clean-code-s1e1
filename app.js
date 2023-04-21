var taskInput = document.querySelector(".todo-add__text");//Add a new task.
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder = document.querySelector(".todo-schedule__list");//ul of #incompleteTasks
var completedTasksHolder = document.querySelector(".todo-completed__list");//completed-tasks

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.className = "todo__task"
  var checkBox = document.createElement("input");//checkbx
  var label = document.createElement("label");//label
  var editInput = document.createElement("input");//text
  var editButton = document.createElement("button");//edit button
  var deleteButton = document.createElement("button");//delete button

  var deleteButtonImg = document.createElement("img");//delete button image
  deleteButtonImg.className = "button__image_delete";

  label.innerText = taskString;
  label.className = "task task__label";

  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";

  editInput.type = "text";
  editInput.className = "task task__text";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "task__button task__button_edit";

  deleteButton.className = "task__button task__button_delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function () {
  console.log("Add Task...");
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector(".task__text");
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".task__button_edit");
  var containsClass = listItem.classList.contains("todo__task_edit");
  if (containsClass) {

    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("todo__task_edit");
};

var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function () {
  console.log("Complete Task...");

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function () {
  console.log("Incomplete Task...");
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function () {
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  var checkBox = taskListItem.querySelector(".task__checkbox");
  var editButton = taskListItem.querySelector(".task__button_edit");
  var deleteButton = taskListItem.querySelector(".task__button_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}