// puxando para dom. / Pulling to DOM

const addBtn = document.querySelector('#criar-tarefa');
const addInput = document.querySelector('#texto-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const deleteTasksBtn = document.querySelector('#apaga-tudo');
const deleteCompletedBtn = document.querySelector('#remover-finalizados');

// cria um item e adiciona ouvidores para o li ficar atento caso seja clicado 1x (para nesse caso selecionar) ou 2x (para nesse caso riscar (doneTask))
function createTask() {
  const newTask = document.createElement('li');
  newTask.className = 'new-item';
  newTask.innerText = addInput.value;
  newTask.addEventListener('click', chooseTask);
  newTask.addEventListener('dblclick', doneTask);
  addInput.value = '';
  taskList.appendChild(newTask);
}

addBtn.addEventListener('click', createTask);

// funcoes chooseTask para adicionar a classe ('selected') caso seja clicado 1x. funcão removeClass como uma auxiliar abaixo para pegar todos os selecionados e remover o selected caso outro seja clicado.

function chooseTask(event) {
  removeClass();
  event.target.classList.add('selected');
}
function removeClass() {
  const selected = document.querySelectorAll('.selected');
  for (let index = 0; index < selected.length; index += 1) {
    selected[index].classList.remove('selected');
  }
}

// funcao DoneTask que é chamada no newTask e serve para dar a classe completed a um elemento clicado 2x (e riscar) e desmarcar caso clicado 2x em algo que já contem a linha de completo para "descompletar".

function doneTask(event) {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

// funcao deleteEverything que simplesmente deleta todos os LI ao ser clicado no btn

function deleteEverything() {
  taskList.innerHTML = '';
}

deleteTasksBtn.addEventListener('click', deleteEverything);

// funcao removeCompleted que remove todas as funções que estiverem com a classe .completed com o metodo removechild.

function removeCompleted() {
  const completed = document.querySelectorAll('.completed');
  for (let index = 0; index < completed.length; index += 1) {
    taskList.removeChild(completed[index]);
  }
}

deleteCompletedBtn.addEventListener('click', removeCompleted);
