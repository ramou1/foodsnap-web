# FoodSnap Mobile

Este é o repositório do projeto web FoodSnap, desenvolvido com React v19.0.0 e Next.js v15.2.4. O FoodSnap é uma aplicação que permite aos usuários explorar e compartilhar experiências gastronômicas.

## Estrutura do Projeto

- **`app/`**: Contém as telas do aplicativo.
  - **`page.tsx`**: Ponto de entrada que redireciona para a tela de login.
  - **`login/`**:
    - **`page.tsx`**: Tela de login com formulário de autenticação.
  - **`feed.tsx`**:
    - **`page.tsx`**: Tela principal exibindo o feed de postagens.
  - **`profile.tsx`**:
    - **`page.tsx`**: Tela de perfil do usuário.
  - **`settings.tsx`**:
    - **`page.tsx`**: Tela de configurações do aplicativo.
  - **`trend.tsx`**:
    - **`page.tsx`**: Tela exibindo as tendências atuais.
- **`components/`**: Contém os componentes reutilizáveis do projeto.

## Dependências Principais

- **`next`**: Framework React para desenvolvimento de aplicações web modernas, facilitando a criação de páginas e rotas.
- **`lucide-react`**: Biblioteca de ícones de código aberto para aplicações React, oferecendo uma coleção consistente e personalizável de ícones SVG.

## Como Executar o Projeto

1. **Instale as dependências**: Execute `npm install` para instalar todas as dependências necessárias.

2. **Inicie o servidor de desenvolvimento**: Utilize `npm run dev` para iniciar o servidor.

## Estrutura de Navegação

O aplicativo utiliza o sistema de roteamento do Next.js para gerenciar a navegação. A estrutura de navegação é composta por uma tela de login inicial e, após a autenticação, o usuário é direcionado para a navegação por abas que inclui as telas Home, Profile, Settings e Trend.
