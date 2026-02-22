function handleCredentialResponse(response) {
      // O token JWT vem aqui
      console.log("Token de ID: " + response.credential);

      // Decodificar para pegar o nome, email, etc. (pode usar uma biblioteca JWT ou enviar para backend)
      const data = parseJwt(response.credential);
      alert("Bem-vindo, " + data.name);
      console.log(data);
    }

    function parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }