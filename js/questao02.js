const inputs = ["name", "punctuation"];
const errors = ["erroName", "erroPunctuation"];
let listAlunos = [];
let cleanList = false;

function send() {
  const checkName = document.getElementById("name").value === "";
  const checkPunctuation = document.getElementById("punctuation").value === "";

  if (checkName) {
    setValue("erroName", "Infome o campo");
  }

  if (checkPunctuation) {
    setValue("erroPunctuation", "Infome o campo");
  }

  if (!checkName && !checkPunctuation) {
    listAlunos.push({
      aluno: document.getElementById("name").value,
      nota: document.getElementById("punctuation").value,
    });
    document.getElementById("name").value = "";
    document.getElementById("punctuation").value = null;
  }
}

function setValue(variable, text) {
  document.getElementById(variable).innerHTML = text;
}

function showList() {
  cleanList = true;
  console.log(listAlunos);
  listAlunos.map((item) => {
    const { aluno, nota, status } = calculaNota({
      aluno: item.aluno,
      nota: item.nota,
    });
    var li = document.createElement("li");
    var text = document.createTextNode(
      `aluno: ${aluno} - nota: ${nota} stituação ${status}`
    );
    li.appendChild(text);
    var listaUl = document.getElementsByTagName("ul")[0];
    var itens = document.getElementsByTagName("li");
    listaUl.insertBefore(li, itens[listAlunos.length]);
  });
}

function calculaNota({ aluno, nota }) {
  const pessoa = aluno;
  let count = 0;
  let notaFinal = parseInt(nota);
  let proxMultiplo = parseInt(nota);
  let status = "aprovado";

  for (let i = 0; i < 5; i++) {
    if (proxMultiplo % 5 !== 0 && nota >= 38) {
      proxMultiplo += 1;
      console.log(proxMultiplo);
      count += 1;
    }
  }
  console.log(count);
  if (count < 3) {
    notaFinal = proxMultiplo;
  }

  if (notaFinal < 40) status = "reprovado";

  return {
    aluno: pessoa,
    nota: notaFinal,
    status: status,
  };
}

if (cleanList === true) {
  var button = document.createElement("button");
  var texto = document.createTextNode(`limpar lista`);
  button.appendChild(texto);
  var lista = document.getElementsByTagName("li");
  lista.insertBefore(button, itens[listAlunos.length]);
}
