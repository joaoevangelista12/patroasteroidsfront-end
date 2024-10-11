// Eventos de mudança para os campos de email e senha
function onChangeEmail() {
    toggleBotoesDesabilitados();
    toggleErrosEmail();
}

function onChangePassword() {
    toggleBotoesDesabilitados();
    togglePasswordErro();
}

// Função de login do usuário
function loginUser() {
    const email = form.email();
    const senha = form.password();
    const loginError = document.getElementById('login-error');
    const listerUser = JSON.parse(localStorage.getItem('listeruser')) || [];

    // Inicializar o usuário válido como nulo
    let userValid = null;

    // Verificar se o usuário existe e validar credenciais
    listerUser.forEach((item) => {
        if (email.value === item.emailCad && senha.value === item.senhaCad) {
            userValid = item; // Usuário encontrado e credenciais válidas
        }
    });

    // Se usuário válido, armazenar no localStorage e redirecionar
    if (userValid) {
        localStorage.setItem('currentUser', JSON.stringify(userValid));
        window.location.href = "home.html";
    } else {
        console.log("Usuário ou senha incorretos");
        loginError.style.display = "block";
    }
}

// Redireciona para a página de registro
function registerUser() {
    window.location.href = "register.html";
}

// Função para validar o email
function isEmailValido() {
    const email = form.email().value;
    return validarEmail(email);
}

// Exibe erros relacionados ao email
function toggleErrosEmail() {
    const email = form.email().value;
    form.emailObrigatorioErro().style.display = email ? "none" : "block";
    form.emailInvalidoErro().style.display = validarEmail(email) ? "none" : "block";
}

// Regex para validar o formato do email
function validarEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// Função para validar a senha
function isPasswordValido() {
    const password = form.password().value;
    return password.length > 0;
}

// Ativa ou desativa o botão de login com base nas validações
function toggleBotoesDesabilitados() {
    form.buttonLogin().disabled = !(isEmailValido() && isPasswordValido());
}

// Exibe ou oculta erro de senha obrigatória
function togglePasswordErro() {
    form.passwordObrigatoria().style.display = form.password().value ? "none" : "block";
}

// Elementos do formulário, encapsulados em um objeto para facilitar o acesso
const form = {
    email: () => document.getElementById('email'),
    emailObrigatorioErro: () => document.getElementById('email-obrigatorio-erro'),
    emailInvalidoErro: () => document.getElementById('email-invalido-erro'),
    password: () => document.getElementById('password'),
    passwordObrigatoria: () => document.getElementById('senha-obrigatoria-erro'),
    buttonLogin: () => document.getElementById('login')
};

// Função executada ao carregar a página
// Função executada ao carregar a página
window.onload = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        document.getElementById('profilePic').src = currentUser.fotoPerfil || "https://ppgquimica.propg.ufabc.edu.br/wp-content/uploads/2016/05/sem-imagem-avatar.png";
        document.getElementById('nomeUsuario').textContent = currentUser.nomeCad;
        document.getElementById('usuarioNome').textContent = currentUser.usuarioCad;
        document.getElementById('emailUsuario').textContent = currentUser.emailCad;
    } else {
        window.location.href = 'index.html';
    }

    // Evento de seleção de nova foto de perfil
    document.getElementById('profilePic').addEventListener('click', () => document.getElementById('newProfilePic').click());

    document.getElementById('newProfilePic').addEventListener('change', function() {
        const newProfilePic = this.files[0];
        if (newProfilePic) {
            const reader = new FileReader();
            reader.readAsDataURL(newProfilePic);

            reader.onload = function() {
                document.getElementById('profilePic').src = reader.result;
                currentUser.fotoPerfil = reader.result;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Mensagem de sucesso
                msgSuccess.style.display = 'block';
                msgSuccess.style.color = 'green';
                msgSuccess.innerHTML = '<strong>Foto atualizada com sucesso!</strong>';
                
                setTimeout(() => {
                    msgSuccess.style.display = 'none';
                }, 3000);
            };
        } else {
            msgError.style.display = 'block';
            msgError.style.color = 'red';
            msgError.innerHTML = '<strong>Por favor, selecione uma foto.</strong>';

            setTimeout(() => {
                msgError.style.display = 'none';
            }, 3000);
        }
    });

    // Criação das estrelas na tela
    createStars();
}

// Função para criar estrelas animadas na tela
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100; // Defina quantas estrelas você quer

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Tamanho aleatório da estrela
        const size = Math.random() * 3 + 1 + 'px';
        star.style.width = size;
        star.style.height = size;

        // Posição aleatória inicial
        const posX = Math.random() * 100 + 'vw';
        const posY = Math.random() * 100 + 'vh';
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

// Função para redirecionar ao perfil
function viewProfile() {
    window.location.href = "profile.html";
}

// Função para redirecionar para a página de login
function redirectToLogin() {
    window.location.href = "index.html"; // Redireciona para a página de login
}



