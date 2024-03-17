// Função para realizar o login
async function login(email, password) {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            return data.success; // Retorna true se o login for bem-sucedido
        } else {
            const errorMessage = await response.text();
            console.error('Erro ao fazer login:', errorMessage);
            return false; // Retorna false se o login falhar
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return false; // Retorna false se houver erro ao fazer login
    }
}

