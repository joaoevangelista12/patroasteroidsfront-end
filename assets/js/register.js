function register() {
  let msgSuccess = document.querySelector("#msgSuccess");
  let msgError = document.querySelector("#msgError");
  let nome = document.querySelector("#nome");
  let usuario = document.querySelector("#usuario");
  let email = document.querySelector("#email");
  let senha = document.querySelector("#senha");

  let listerUser = JSON.parse(localStorage.getItem("listeruser") || "[]");

  // Verifica se o nome de usuário já existe
  let usuarioExistente = listerUser.some(
    (user) => user.usuarioCad === usuario.value
  );

  // Expressão regular para validar nome de usuário sem espaços e acentos
  let regex = /^[a-zA-Z0-9]+$/;

  if (!regex.test(usuario.value)) {
    msgError.setAttribute("style", "display: block; color: red");
    msgError.innerHTML =
      "<strong>Nome de usuário não pode conter acentos ou espaços!</strong>";
    return;
  }

  if (usuarioExistente) {
    msgError.setAttribute("style", "display: block; color: red");
    msgError.innerHTML = "<strong>Nome de usuário já cadastrado!</strong>";
    return;
  }

  // Se estiver tudo certo, prossegue com o registro
  listerUser.push({
    nomeCad: nome.value,
    usuarioCad: usuario.value,
    emailCad: email.value,
    senhaCad: senha.value,
  });

  localStorage.setItem("listeruser", JSON.stringify(listerUser));

  msgSuccess.setAttribute("style", "display: block; color: green");
  msgSuccess.innerHTML = "<strong>Cadastrando Usuário...</strong>";

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2500);
}

function onChangeEmail() {
  toggleBotoesDesabilitados();
  toggleErrosEmail();
}

function onChangePassword() {
  toggleBotoesDesabilitados();
  togglePasswordErro();
}

function onChangeNome() {
  toggleBotoesDesabilitados();
}

function onChangeConfirmPassword() {
  toggleBotoesDesabilitados();
  toggleConfirmPasswordErro();
}

function loginUser() {
  window.location.href = "home.html";
}

function registerUser() {
  window.location.href = "register.html";
}

function isEmailValido() {
  const email = form.email().value;
  return validarEmail(email);
}

function isNomeValido() {
  const nome = form.nome().value;
  return nome.length > 0; // Verifica se o nome foi preenchido
}

function isPasswordValido() {
  const password = form.passwordRegister().value; // Usando o ID correto 'senha'
  return password.length > 0;
}

function isConfirmPasswordValido() {
  const password = form.passwordRegister().value; // Usando o ID correto 'senha'
  const confirmPassword = form.confirmPassword().value;
  return password === confirmPassword && confirmPassword.length > 0; // Verifica se as senhas coincidem
}

function toggleErrosEmail() {
  const email = form.email().value;
  if (!email) {
    form.emailObrigatorioErro().style.display = "block";
  } else {
    form.emailObrigatorioErro().style.display = "none";
  }

  if (validarEmail(email)) {
    form.emailInvalidoErro().style.display = "none";
  } else {
    form.emailInvalidoErro().style.display = "block";
  }
}

function togglePasswordErro() {
  const password = form.passwordRegister().value; // Usando o ID correto 'senha'
  if (!password) {
    form.passwordObrigatoria().style.display = "block";
  } else {
    form.passwordObrigatoria().style.display = "none";
  }
}

function toggleConfirmPasswordErro() {
  const confirmPasswordValido = isConfirmPasswordValido();
  if (!confirmPasswordValido) {
    form.confirmPasswordErro().style.display = "block"; // Exibe erro se as senhas não coincidirem
  } else {
    form.confirmPasswordErro().style.display = "none";
  }
}

function validarEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function toggleBotoesDesabilitados() {
  const emailValido = isEmailValido();
  const passwordValido = isPasswordValido();
  const confirmPasswordValido = isConfirmPasswordValido();
  const nomeValido = isNomeValido();

  form.buttonRegister().disabled = !(
    emailValido &&
    passwordValido &&
    confirmPasswordValido &&
    nomeValido
  );
}

const form = {
  nome: () => document.getElementById("nome"),
  email: () => document.getElementById("email"),
  emailObrigatorioErro: () => document.getElementById("email-obrigatorio-erro"),
  emailInvalidoErro: () => document.getElementById("email-invalido-erro"),
  passwordRegister: () => document.getElementById("senha"), // Usando o ID correto 'senha'
  passwordObrigatoria: () => document.getElementById("senha-obrigatoria-erro"),
  confirmPassword: () => document.getElementById("confirmpassword"),
  confirmPasswordErro: () => document.getElementById("confirm-password-erro"),
  buttonRegister: () => document.getElementById("registrar"),
};

function createStars() {
  const starsContainer = document.querySelector(".stars");
  const numberOfStars = 100; // Defina quantas estrelas você quer

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Tamanho aleatório da estrela
    const size = Math.random() * 3 + 1 + "px";
    star.style.width = size;
    star.style.height = size;

    // Posição aleatória inicial
    const posX = Math.random() * 100 + "vw";
    const posY = Math.random() * 100 + "vh";
    star.style.top = posY;
    star.style.left = posX;

    // Adiciona a estrela ao container
    starsContainer.appendChild(star);

    // Adiciona um movimento aleatório para cada estrela
    star.style.animationDelay = `${Math.random() * 5}s`;
  }
}
// Chame a função quando o conteúdo da página for carregado
window.onload = createStars;

function redirectToLogin() {
  window.location.href = "../index.html"; // Redireciona para a página de login
}
