// Elementos do formulário, encapsulados em um objeto para facilitar o acesso
const form = {
    nomeUsuario: () => document.getElementById('nomeUsuario'),
    usuarioNome: () => document.getElementById('usuarioNome'),
    emailUsuario: () => document.getElementById('emailUsuario'),
    btnSalvar: () => document.getElementById('btnSalvar'),
    msgSuccess: () => document.getElementById('msgSuccess'),
    msgError: () => document.getElementById('msgError'),
    profilePic: () => document.getElementById('profilePic'),
    newProfilePic: () => document.getElementById('newProfilePic')
};

// Função executada ao carregar a página
window.onload = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        form.profilePic().src = currentUser.fotoPerfil || "https://ppgquimica.propg.ufabc.edu.br/wp-content/uploads/2016/05/sem-imagem-avatar.png";
        form.nomeUsuario().textContent = currentUser.nomeCad;
        form.usuarioNome().textContent = currentUser.usuarioCad;
        form.emailUsuario().textContent = currentUser.emailCad;

        // Cria estrelas após carregar as informações do usuário
        createStars();
    } else {
        window.location.href = 'index.html'; // Redireciona se não houver usuário
    }

    // Evento de seleção de nova foto de perfil
    form.profilePic().addEventListener('click', () => form.newProfilePic().click());

    form.newProfilePic().addEventListener('change', function() {
        const newProfilePic = this.files[0];
        const msgSuccess = form.msgSuccess();
        const msgError = form.msgError();

        if (newProfilePic) {
            const reader = new FileReader();
            reader.readAsDataURL(newProfilePic);

            reader.onload = function() {
                form.profilePic().src = reader.result;
                currentUser.fotoPerfil = reader.result; // Atualiza a foto de perfil também no objeto

                // Salva a nova foto no localStorage
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

    // Adiciona o evento de clique para o botão de salvar
    form.btnSalvar().addEventListener('click', salvarPerfil);
};

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

// Variáveis globais para armazenar os campos de entrada
let editNome, editUsuario, editEmail;

// Função para habilitar o modo de edição do perfil
function editarPerfil() {
    const nomeField = form.nomeUsuario();
    const usuarioField = form.usuarioNome();
    const emailField = form.emailUsuario();

    // Transformar campos de exibição em campos de entrada
    nomeField.innerHTML = `<input type="text" id="editNome" value="${nomeField.textContent}" />`;
    usuarioField.innerHTML = `<input type="text" id="editUsuario" value="${usuarioField.textContent}" />`;
    emailField.innerHTML = `<input type="email" id="editEmail" value="${emailField.textContent}" />`;

    // Armazenar referências aos campos de entrada
    editNome = document.getElementById('editNome');
    editUsuario = document.getElementById('editUsuario');
    editEmail = document.getElementById('editEmail');

    // Exibir o botão de salvar
    form.btnSalvar().style.display = 'block';

    // Log para verificar se os campos foram criados
    console.log('Campos de entrada criados:', {
        editNome,
        editUsuario,
        editEmail
    });
}

// Função para salvar as alterações no perfil
function salvarPerfil() {
    // Verifique se os campos de entrada existem
    if (!editNome || !editUsuario || !editEmail) {
        console.error('Um ou mais campos de entrada não foram encontrados.');
        return; // Saia da função se algum campo não existir
    }

    const nomeValue = editNome.value;
    const usuarioValue = editUsuario.value;
    const emailValue = editEmail.value;

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // Atualiza as informações do usuário
        currentUser.nomeCad = nomeValue;
        currentUser.usuarioCad = usuarioValue;
        currentUser.emailCad = emailValue;

        // Salva as informações atualizadas no localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Atualiza a exibição do perfil com os novos valores
        form.nomeUsuario().textContent = currentUser.nomeCad;
        form.usuarioNome().textContent = currentUser.usuarioCad;
        form.emailUsuario().textContent = currentUser.emailCad;

        // Esconde o botão de salvar
        form.btnSalvar().style.display = 'none';

        // Exibir mensagem de sucesso
        const msgSuccess = form.msgSuccess();
        msgSuccess.style.display = 'block';
        msgSuccess.style.color = 'green';
        msgSuccess.innerHTML = '<strong>Perfil atualizado com sucesso!</strong>';

        setTimeout(() => {
            msgSuccess.style.display = 'none';
        }, 1500);
    } else {
        console.error('Usuário não encontrado no localStorage.');
    }
}

function goHome(){
    window.location.href= "home.html";
}
