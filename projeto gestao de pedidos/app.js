alert("Bem-vindo, " + data.name);
localStorage.setItem("user", JSON.stringify(data)); // salva dados localmente
window.location.href = "cardapio.html"; // redireciona
