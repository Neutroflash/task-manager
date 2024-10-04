const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");
// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible';
  try {
    const response = await axios.get('/app/v1/tasks');
    console.log('API Response Status:', response.status); // Verifica el código de estado
    console.log('API Response Data:', response.data); // Verifica los datos

    // Accede correctamente al array de tareas dentro de response.data.data
    const tasks = response.data.data.data; // Aquí estamos accediendo al array de tareas

    if (!Array.isArray(tasks) || tasks.length < 1) { // Verifica si tasks es un array
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = 'hidden';
      return;
    }

    // Renderizamos las tareas si tasks es un array válido
    const allTasks = tasks.map((task) => {
      const { completed, _id: taskID, name } = task;
      return `<div class="single-task ${completed && 'task-completed'}">
        <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
        <div class="task-links">
        <a href="task.html?id=${taskID}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>
        <button type="button" class="delete-btn" data-id="${taskID}">
          <i class="fas fa-trash"></i>
        </button>
        </div>
      </div>`;
    }).join('');

    console.log('Rendered tasks HTML:', allTasks);
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    tasksDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = 'hidden';
};

showTasks();


// delete task /api/tasks/:id

tasksDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`/app/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// form

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/app/v1/tasks", { name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});