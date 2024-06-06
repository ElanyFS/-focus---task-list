// Definição de constantes
const btnAddTask = document.querySelector(".btn_task_add"); // btn abrir formulario
const formAddTask = document.querySelector(".form_task_add"); // formulario de add task
const textareaTask = document.querySelector(".textarea_add_task"); // tarefa informada para addconst ulElemento = document.querySelector('.dropdown_list'); // elemento ul
const ulElemento = document.querySelector(".dropdown_list"); //elemento ul

const taskList = JSON.parse(localStorage.getItem("tarefas")) || []; // Array de tarefas

// Criar elemento Li para exibir as tarefas na pagina
function criarElementoLi(task) {
  const li = document.createElement("li");
  li.classList.add("task_list_li");

  const paragrafo = document.createElement("p");
  paragrafo.classList.add("task_list_li_paragrafo");

  paragrafo.textContent = task.descricao;

  const botao = document.createElement("button");
  botao.classList.add("task_list_li_btn");

  const icon = document.createElement("i");

  botao.append(icon);

  li.append(paragrafo);
  li.append(botao);

  return li;
}

// Exibir/esconder formulario
btnAddTask.addEventListener("click", () => {
  formAddTask.classList.toggle("invisible");
});

// Criar tarefa
formAddTask.addEventListener("submit", (event) => {
  event.preventDefault();
  if (textareaTask.value) {
    const task = {
      descricao: textareaTask.value,
    };

    taskList.push(task);
    ulElemento.append(criarElementoLi(task));
    localStorage.setItem("tarefas", JSON.stringify(taskList)); // salvar no armazenamento local
    textareaTask.value = ""; //limpar formulario
    formAddTask.classList.add("invisible"); // esconde formulario
  }
});

// Exibe as tarefas na pagina
taskList.forEach((task) => {
  ulElemento.append(criarElementoLi(task));
});
