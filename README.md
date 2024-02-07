## Instruções para Clonar e Iniciar o Projeto

### Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:

Git

Node.js

MySQL

### Clonar o Repositório
Para começar, clone o repositório do GitHub para a sua máquina local usando o seguinte comando no terminal:

```git clone https://github.com/EduardoColissi/technical-test.git```

```cd seuPathParaOndeClonou/technical-test ```

### Configurar e Iniciar o Backend
- Navegar para a Pasta do Backend

```cd seuPathParaOndeClonou/technical-test/backend```

- Instalar Dependências
  
```npm install```

- Criar arquivo .env dentro da pasta backend e colar a seguinte linha dentro:
  
```DATABASE_URL="mysql://seuUsuario:suaSenha@127.0.0.1:suaPorta/technical-test-eduardo?schema=public"```

Meu exemplo:
```DATABASE_URL="mysql://root:root12345@127.0.0.1:3306/technical-test-eduardo?schema=public"```

- Configurar o Prisma

```npx prisma init```
```npx prisma migrate dev```

- Iniciar o Servidor Backend

```npm run dev```

O servidor backend agora estará rodando e acessível em http://localhost:6060.

### Configurar e Iniciar o Frontend

- Navegar para a Pasta do Frontend e baixar as dependências (abra um novo terminal):

```cd frontend```

```npm install```

- Basta rodar o frontend agora, com o comando:

```npm run dev```

No próprio terminal, irá indicar o link de acesso, mas por padrão está localizado em http://localhost:5173/.

### Pronto!

### Feito por Eduardo Colissi!
