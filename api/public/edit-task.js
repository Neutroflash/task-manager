const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

// Función para mostrar la tarea
const showTask = async () => {
  try {
    const response = await axios.get(`/app/v1/tasks/${id}`);
    console.log('API Response on show task:', response); // Log para verificar la respuesta

    // Asegúrate de que estás accediendo a la estructura correcta
    const task = response.data.data; // Asegúrate de que esta sea la ruta correcta
    console.log('Task data:', task); // Log para verificar la tarea

    const { _id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID; // Muestra el ID
    taskNameDOM.value = name; // Establece el nombre
    tempName = name; // Guarda el nombre temporalmente
    taskCompletedDOM.checked = completed; // Establece el estado de completado
  } catch (error) {
    console.error('Error fetching task:', error); // Log para el error
  }
};

// Llama a la función para mostrar la tarea
showTask();

// Evento para manejar la edición de la tarea
editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...';
  e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

  try {
    const taskName = taskNameDOM.value; // Obtener el nombre de la tarea
    const taskCompleted = taskCompletedDOM.checked; // Obtener el estado de completado

    // Realiza la solicitud PATCH
    const response = await axios.patch(`/app/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });

    // Log de la respuesta completa
    console.log('API Response on edit:', response);

    // Realiza una nueva solicitud GET para obtener los valores actualizados
    const updatedTaskResponse = await axios.get(`/app/v1/tasks/${id}`);
    const updatedTask = updatedTaskResponse.data.data; // Asegúrate de que esta sea la ruta correcta

    // Log para verificar los datos actualizados
    console.log('Updated Task data:', updatedTask);

    if (updatedTask) { // Comprueba si la tarea está definida
      const { _id: taskID, completed, name } = updatedTask;

      taskIDDOM.textContent = taskID; // Muestra el ID
      taskNameDOM.value = name; // Establece el nombre
      tempName = name; // Guarda el nombre temporalmente
      taskCompletedDOM.checked = completed; // Establece el estado de completado

      // Mostrar mensaje de éxito
      formAlertDOM.style.display = 'block';
      formAlertDOM.textContent = `Success, edited task`;
      formAlertDOM.classList.add('text-success');
    } else {
      throw new Error('Failed to fetch updated task'); // Lanzar un error si no se encuentra la tarea
    }
  } catch (error) {
    console.error('Error editing task:', error); // Log para el error
    taskNameDOM.value = tempName; // Restaura el nombre si hay error
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `Error, please try again: ${error.message}`; // Mostrar mensaje de error con detalles
  } finally {
    editBtnDOM.textContent = 'Edit'; // Asegúrate de restablecer el texto del botón
    setTimeout(() => {
      formAlertDOM.style.display = 'none';
      formAlertDOM.classList.remove('text-success');
    }, 3000);
  }
});