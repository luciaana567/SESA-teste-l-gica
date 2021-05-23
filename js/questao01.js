const inputs = ["name", "lastName", "date", "fone", "email", "password"];
const errors = [
  "erroName",
  "erroLastName",
  "erroDate",
  "erroFone",
  "erroEmail",
  "erroPassword",
];

function send() {
  inputs.map((item, index) => {
    if (document.getElementById(item).value === "") {
      setValue(errors[index], "Infome o campo");
    } else {
      setValue(errors[index], "");
      if (item === "password") checkPassword();
    }
  });
}

function setValue(variable, text) {
  document.getElementById(variable).innerHTML = text;
}

function checkPassword() {
  setValue("fraco", "");
  setValue("medio", "");
  setValue("forte", "");
  const password = document.getElementById("password").value;
  let hasErroEqualCamps = this.checkCamps(password);
  const { count, menssage } = checkStrongPass(password);

  if (!hasErroEqualCamps) {
    setValue("erroPassword", "");

    if (count === 3) {
      setValue("fraco", `senha fraca, adicione ${menssage}`);
    } else if (count > 0 && count < 3) {
      setValue("medio", `senha media, adicione ${menssage}`);
    } else {
      setValue("forte", `senha forte`);
    }
  }
}

function checkCamps(password) {
  let hasErro = false;
  const splitPass = password.split("");

  if (splitPass.length < 8) {
    setValue("erroPassword", "A senha deve ter mais de 8 caracteres");
    hasErro = true;
  }

  if (document.getElementById("name").value !== "") {
    const checkName = password.includes(document.getElementById("name").value);

    if (checkName) {
      setValue("erroPassword", "A senha não pode possuir seu nome");
      hasErro = true;
    }
  }

  if (document.getElementById("lastName").value !== "") {
    const checkLastName = password.includes(
      document.getElementById("lastName").value
    );

    if (checkLastName) {
      setValue("erroPassword", "A senha não pode possuir seu sobreNome");
      hasErro = true;
    }
  }

  if (document.getElementById("date").value !== "") {
    //vou considerar o ano ou a data inteira pq não deixar pegar o dia pode ai
    //a pesso não vai conseguir usar na senha os numeros
    const date = document.getElementById("date").value;
    const year = date.split("-");
    const allDate = date
      .split("")
      .filter((n) => Number(n) || n == 0)
      .join("");
    const checkDate = password.includes(allDate);
    const checkYear = password.includes(year[0]);

    if (checkDate || checkYear) {
      setValue(
        "erroPassword",
        "A senha não pode possuir sua data de nascimento"
      );
      hasErro = true;
    }
  }

  if (document.getElementById("fone").value) {
    const fone = document.getElementById("fone").value;
    const splitFone = fone
      .split("")
      .filter((n) => Number(n) || n == 0)
      .join("");
    if (password.includes(splitFone)) {
      setValue("erroPassword", "A senha não pode possuir seu telefone");
      hasErro = true;
    }
  }

  //irei considerar o username do email
  if (document.getElementById("email").value) {
    const email = document.getElementById("email").value;
    const splitEmail = email.split("@");
    const checkUsername = password.includes(splitEmail[0]);
    if (checkUsername) {
      setValue("erroPassword", "A senha não pode possuir seu email");
      hasErro = true;
    }
  }
  return hasErro;
}

function checkStrongPass(password) {
  var count = 0;
  var menssage = "";
  var haveNumer = /(?=.*?[0-9]).{1,}$/; //no mínimo um número
  var hasMinChar = /(?=.*?[a-z]).{1,}$/; //uma letra minuscula
  var hasMaxChar = /(?=.*?[A-Z]).{1,}$/; //uma letra minuscula
  const caracteres = [
    "!",
    "+",
    "@",
    "$",
    "#",
    "%",
    "^",
    "&",
    "(",
    ")",
    "_",
    "-",
    "+",
  ];
  const findCaracter = caracteres.filter((item) => password.includes(item));

  console.log(findCaracter);

  if (findCaracter.length === 0) {
    count += 1;
    menssage = menssage + ", um caractere especial";
  }

  if (!haveNumer.exec(password)) {
    count += 1;
    menssage = menssage + ", um número";
  }

  if (!hasMinChar.exec(password)) {
    count += 1;
    menssage = menssage + ", uma letra minúscula";
  }

  if (!hasMaxChar.exec(password)) {
    count += 1;
    menssage = menssage + ", uma letra maiúscula";
  }

  return { count, menssage };
}
