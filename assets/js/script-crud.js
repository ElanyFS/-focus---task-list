// Definição de constantes
const btnAddTask = document.querySelector('.btn_task_add'); // btn abrir formulario
const formAddTask = document.querySelector('.form_task_add'); // formulario de add task
const textareaTask = document.querySelector('.textarea_add_task'); // tarefa informada para add

const taskList = []; // Array de tarefas

// Exibir/esconder formulario
btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('invisible');
});

// Criar tarefa 
btnAddTask.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
        descricao : textareaTask.value
    }

    taskList.push(task);
})
