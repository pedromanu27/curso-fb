// Inputs
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

// Displays
var displayName = document.getElementById('displayName');

// Buttons
var authEmailPassButton = document.getElementById('authEmailPassButton');
var authFacebookButton = document.getElementById('authFacebookButton');
var authTwitterButton = document.getElementById('authTwitterButton');
var authGoogleButton = document.getElementById('authGoogleButton');
var autGitHubButton = document.getElementById('authGiHubButton');
var autAnonymouslyButton = document.getElementById('authAnonymouslyButton');
var createUserButton = document.getElementById('createUserButton');
var logOutButton = document.getElementById('logOutButton');

// Cirar novo usuário
createUserButton.addEventListener('click', function() {
    firebase
    .auth()
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function() {
        alert('Bem vindo ' + emailInput.value);
    })
    .catch(function (error) {
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao cadastrar, verifique o erro no console.')
    });
});

// Autenticar com E-mail e Senha
authEmailPassButton.addEventListener('click', function () {
    firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function (result) {
        console.log(result);
        displayName.innerText = 'Bem vindo, ' + emailInput.value;
        alert('Autenticado ' + emailInput.value);
    })
    .catch(function (error) {
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao autenticar, verifique o erro no console.')
    });
});

// Logout
logOutButton.addEventListener('click', function () {
    firebase
    .auth()
    .signOut()
    .then(function () {
        displayName.innerText = 'Você não está autenticado';
        alert('Você se deslogou');
    })
    .catch(function (error) {
        console.error(error);
    });
});

// Autenticar Anonima
autAnonymouslyButton.addEventListener('click', function () {
    firebase
    .auth()
    .signInAnonymously()
    .then(function (result) {
        console.log(result);
        displayName.innerText = 'Bem vindo, Usuário Anonimo!';
        alert('Autenticado como usuário anonimo');
    })
    .catch(function (error) {
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao autenticar, verifique o erro no console.')
    });
});

// Autenticação pelo GitHub
authGitHubButton.addEventListener('click', function () {
    // Providers
    var provider = new firebase.auth.GithubAuthProvider();
    signIn(provider);
});

// Autenticação pelo Google
authGoogleButton.addEventListener('click', function () {
    // Providers
    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});

// Autenticação pelo Facebook
authFacebookButton.addEventListener('click', function () {
    // Providers
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
});

// Autenticação pelo Twitter
authTwitterButton.addEventListener('click', function () {
    // Providers
    var provider = new firebase.auth.TwitterAuthProvider();
    signIn(provider);
});

function signIn(provider) {
    firebase.auth()
    .signInWithPopup(provider)
    .then(function (result) {
        console.log(result);
        var token = result.credential.accessToken;
        displayName.innerText = 'Bem vindo, ' + result.user.displayName;
    }).catch(function (error) {
        console.log(error);
        alert('Falha na autenticação');
    })
}