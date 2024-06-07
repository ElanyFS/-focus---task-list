// Definição de constantes
const btnAddTask = document.querySelector(".btn_task_add"); // btn abrir formulario
const formAddTask = document.querySelector(".form_task_add"); // formulario de add task
const textareaTask = document.querySelector(".textarea_add_task"); // tarefa informada para addconst ulElemento = document.querySelector('.dropdown_list'); // elemento ul
const ulElemento = document.querySelector(".dropdown_list"); //elemento ul

const btnDeletarTaskConcluidas = document.querySelector(
  "#btn_deletar_concluidas_tasks"
);
const btnDeletarTodasTask = document.querySelector("#btn_deletar_todas_tasks");

const paragrafoDescricaoTask = document.querySelector(
  ".task_content_description"
); // descricao tarefa em andamento

const btnCancelar = document.querySelector("#btn_cancelar"); // botao cancelar
const btnDeletar = document.querySelector("#btn_deletar"); // botao deletar

let taskList = JSON.parse(localStorage.getItem("tarefas")) || []; // Array de tarefas

let taskSelecionada = null;
let liTaskSelecionado = null;

// Atualizar tarefas
function atualizarTask() {
  localStorage.setItem("tarefas", JSON.stringify(taskList)); // salvar no armazenamento local
}

// Criar elemento Li para exibir as tarefas na pagina
function criarElementoLi(task) {
  const li = document.createElement("li");
  li.classList.add("task_list_li");

  const paragrafo = document.createElement("p");
  paragrafo.classList.add("task_list_li_paragrafo");

  const iconCheck = document.createElement("i");
  iconCheck.innerHTML = `
  <i class="fa-solid fa-check"></i>
  `;

  paragrafo.textContent = task.descricao;

  const botao = document.createElement("button");
  botao.classList.add("task_list_li_btn");

  botao.onclick = () => {
    // debugger;
    const novaDescricao = prompt("Qual o novo nome da tarefa?");
    // console.log("tarefa", novaDescricao);
    if (novaDescricao) {
      paragrafo.textContent = novaDescricao;
      task.descricao = novaDescricao;
      atualizarTask();
    }
  };

  if (task.complete) {
    li.classList.add("task_list_li_complete");
    botao.setAttribute("disable", "disable");
  } else {
    li.onclick = () => {
      document.querySelectorAll(".task_list_li_active").forEach((elemento) => {
        elemento.classList.remove("task_list_li_active");
      });

      if (taskSelecionada == task) {
        paragrafoDescricaoTask.textContent = "";
        taskSelecionada = null;
        liTaskSelecionado = null;
        return;
      }

      taskSelecionada = task;
      liTaskSelecionado = li;

      li.classList.add("task_list_li_active");

      paragrafoDescricaoTask.textContent = task.descricao;
    };
  }

  const icon = document.createElement("i");
  icon.innerHTML = `
  <i class="fa-solid fa-pen"></i>
  `;
  botao.append(icon);

  paragrafo.append(iconCheck);
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
    atualizarTask();
    textareaTask.value = ""; //limpar formulario
    formAddTask.classList.add("invisible"); // esconde formulario
  }
});

// Exibe as tarefas na pagina
taskList.forEach((task) => {
  ulElemento.append(criarElementoLi(task));
});

btnCancelar.onclick = () => {
  textareaTask.value = "";
};

btnDeletar.onclick = () => {
  textareaTask.value = "";
  formAddTask.classList.add("invisible");
};

document.addEventListener("eventoTempoFinalizado", () => {
  if (taskSelecionada && liTaskSelecionado) {
    liTaskSelecionado.classList.remove("task_list_li_active");
    liTaskSelecionado.classList.add("task_list_li_complete");
    liTaskSelecionado
      .querySelector("button")
      .setAttribute("disable", "disable");
    paragrafoDescricaoTask.textContent = "";
    taskSelecionada.complete = true;
    atualizarTask();
  }
});

const removerTarefas = (concluidas) => {
  const seletor = concluidas ? ".task_list_li_complete" : ".task_list_li";
  document.querySelectorAll(seletor).forEach((elemento) => {
    elemento.remove();
  });

  taskList = concluidas ? taskList.filter((tarefa) => !tarefa.complete) : [];
  atualizarTask();
};

btnDeletarTaskConcluidas.onclick = () => removerTarefas(true);

btnDeletarTodasTask.onclick = () => removerTarefas();
