// 🔐 Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYPI5tsYJOmiJtkBSZvjuai7Qm8pKa-QQ",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "vendamarmitex",
  appId: "SEU_APP_ID",
  messagingSenderId: "SENDER_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login com Email e Senha
document.getElementById("email-login").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  auth.signInWithEmailAndPassword(email, senha)
    .then(user => {
      document.getElementById("mensagem").innerText = "Login com email realizado com sucesso!";
    })
    .catch(error => {
      document.getElementById("mensagem").innerText = "Erro: " + error.message;
    });
});

// Recaptcha para telefone
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  'size': 'normal',
  'callback': function(response) {
    console.log("reCAPTCHA resolvido");
  }
});

// Enviar código por SMS
let confirmationResult;

document.getElementById("telefone-login").addEventListener("submit", function(e) {
  e.preventDefault();
  const telefone = document.getElementById("telefone").value;

  firebase.auth().signInWithPhoneNumber(telefone, window.recaptchaVerifier)
    .then(function(result) {
      confirmationResult = result;
      document.getElementById("mensagem").innerText = "Código enviado via SMS!";
      document.getElementById("codigo-form").style.display = "block";
    })
    .catch(function(error) {
      document.getElementById("mensagem").innerText = "Erro: " + error.message;
    });
});

// Verificar código
document.getElementById("codigo-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const codigo = document.getElementById("codigo").value;

  confirmationResult.confirm(codigo)
    .then(function(result) {
      document.getElementById("mensagem").innerText = "Login com telefone realizado com sucesso!";
    })
    .catch(function(error) {
      document.getElementById("mensagem").innerText = "Erro ao verificar código: " + error.message;
    });
});
