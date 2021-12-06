const selecionaBtnEntrar = document.querySelector(".btn-entrar");
const selecionaInputEmail = document.getElementById("input-email-login");
const selecionaInputSenha = document.getElementById("input-senha");
const btnEnviar = document.getElementById("submit-btn");
const checkbox = document.getElementById("agreement");

selecionaBtnEntrar.addEventListener("click", () => {
  if (
    selecionaInputEmail.value === "tryber@teste.com" &&
    selecionaInputSenha.value === "123456"
  ) {
    alert("Olá, Tryber!");
  }
  alert("Email ou senha inválidos.");
});

// Requisito 18 Incompleto
function confirmarEnvio() {
  if (checkbox.checked) {
    btnEnviar.disabled = false;
  } else {
    btnEnviar.disabled = true;
  }
}

checkbox.addEventListener('click', confirmarEnvio);

// checkbox.addEventListener("click", () => {
//   if (checkbox.checked) {
//     btnEnviar.disabled = true;
//   } else {
//     btnEnviar.disabled = false;
//   }
// });

// Chama o JQuery
$(document).ready(function () {
  $("select").formSelect();
});
