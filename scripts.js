//Info fecha
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

const taskContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();

    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
}

setDate();

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;

    if (!value) {
        return;
    }

    // Creación de la tarea
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState);

    // Envolver el texto de la tarea en un span
    const taskText = document.createElement('span');
    taskText.textContent = value;
    task.appendChild(taskText);

    // Creación del botón de eliminación
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el evento click en el botón dispare el cambio de estado de la tarea
        task.remove();
    });

    // Añadir el botón de eliminación a la tarea
    task.appendChild(deleteButton);

    // Añadir la tarea al contenedor
    taskContainer.prepend(task);
    event.target.reset();
}

const changeTaskState = event => {
    if (event.target.classList.contains('deleteButton')) {
        return;
    }
    const taskText = event.currentTarget.querySelector('span');
    taskText.classList.toggle('done');
}

const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el) //if else
    })
    return [...toDo, ...done];
}

const renderOrderedTasks = () => {
    order().forEach(el => taskContainer.appendChild(el));
}
