# FoodSnap Web

Versão web do FoodSnap, feita com React 19 e Next.js 15. O app permite explorar fotos de comida, seguir tendências, conversar e publicar pratos.

## Estrutura do Projeto

- **`src/app/`**: rotas da aplicação.
  - **`page.tsx`**: redireciona para o login.
  - **`login/`**: tela de login.
  - **`register/`**: cadastro em etapas (avatar, nome, preferências e senha).
  - **`(main)/`**: área autenticada, com navegação inferior.
    - **`feed/`**: feed em colunas, com abas "for you" e "following" e busca.
    - **`trend/`**: tendências gastronômicas.
    - **`chat/`**: lista de conversas.
    - **`profile/`**: perfil do usuário logado.
  - **`chat/[id]/`**: conversa.
  - **`posts/[id]/`**: detalhe da publicação, com curtidas e comentários.
  - **`posts/create/`**: nova publicação.
  - **`users/[id]/`**: perfil de outro usuário.
  - **`restaurants/[id]/`**: perfil de restaurante.
  - **`settings/`**: edição de perfil e logout.
- **`src/components/`**: navegação, busca, grade de posts e perfil.
- **`src/data/`**: dados de exemplo usados pelas telas.
- **`public/`**: fotos, avatares e imagens padrão.

## Dependências Principais

- **`next`**: framework React, com rotas e renderização.
- **`lucide-react`**: ícones SVG.
- **`tailwindcss`**: estilos.

## Como Executar

1. Instale as dependências com `npm install`.
2. Inicie o servidor com `npm run dev`.
3. Abra `http://localhost:3000`. O login e o cadastro seguem para o feed sem um backend.

## Navegação

Depois do login, a barra inferior leva ao feed, às trends, à nova publicação, ao chat e ao perfil. A busca do feed abre locais, restaurantes e usuários.
