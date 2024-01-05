const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${taskText}</span>
      <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);

    const deleteButton = li.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
      taskList.removeChild(li);
    });

    taskInput.value = "";
  }
}
