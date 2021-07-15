# API Instagram

## O que o usuário pode fazer
- Fazer login
- Fazer cadastro
- Ver os dados do seu perfil
- Editar os dados do seu perfil
- Ver postagens de outras pessoas
    - Ver quantidade de curtidas numa postagem
    - Ver os comentarios de uma postagem
- Curtir postagens de outras pessoas
- Ver quantidade de curtidas de uma postagem
- Ver os comentários em uma postagem
- Comentar em postagens

## Oque o usuário não pode fazer
- Ver a localização em uma postagem
- Ver pessoas que curtiram uma postagem
- Curtir um comentário
- Comentar em outros comentários

## Endpoints

### POST - Login

#### Dados enviados
- username
- senha

#### Dados retornados
- sucesso
- token
- erro

#### Objetivos gerais
- Validade username e senha
- Buscar o usuário no banco de dados
- Verificar se a senha informada está correta
- Gerar token de autenticação
- Retornar os dados do usuário e o token

---

### POST - Cadastro

#### Dados enviados
- username
- senha

#### Dados retornados
- sucesso
- erro

#### Objetivos gerais
- Validade username e senha
- Verificar se o username já existe no banco de dados
- Criptografar a senha
- Cadastrar o usuário no banco de dados
- Retornar sucesso ou erro

---

### GET - Perfil

#### Dados enviados
- token (que terá id ou username)

#### Dados retornados
- URL da foto
- Nome
- Username
- Site
- Bio
- Email
- Telefone
- Genero

#### Objetivos gerais
- Validar o token do usuário
- Buscar o cadastro do usuário com a informação do token
- Retornar os dados do usuário

---

### PUT - Perfil

#### Dados enviados
- token (que terá id ou username)
- URL da foto
- Nome
- Username
- Site
- Bio
- Email
- Telefone
- Genero

#### Dados retornados
- sucesso
- erro

#### Objetivos gerais
- Validade o token do usuário
- Buscar o cadastro do usuário com a informação do token
- Exigir, ao menos, um campo para atualizar
- Criptografar a senha se for informada
- Verificar se o email e username já existe no banco de dados se for informado
- Atualizar o registro do usuário no bando de dados
- Retornar sucesso ou erro


---

### GET - Postagens

#### Dados enviados
- token (que terá id ou username)
- offset

#### Dados retornados
- Postagens [] 
    - id
    - foi curtido por mim
    - Usuários
        - URL da foto
        - username
        - é perfil oficial
    - Fotos [] 
    - quantidade de curtidas
    - Comentarios [] 
        - username
        - texto
    - Data

#### Objetivos gerais
- Validar o token do usuário
- Buscar o cadastro do usuário com a informação do token
- Retornar postagens de outras pessoas

---

### POST - Postagens

#### Dados enviados
- token
- texto
- array com fotos

#### Dados retornados
- sucesso
- erro

#### Objetivos gerais
- Validar o token do usuário
- Buscar o cadastro do usuário com a informação do token
- Exigir que seja informado ao menos uma foto no array
- Cadastrar postagem para o usuário logado
- Cadastro das fotos da postagem
- Retornar sucesso ou erro

---

### POST - Curtir

#### Dados enviados
- token (contem username ou id do usuario)
- id da postagem

#### Dados retornados
- sucesso
- erro

#### Objetivos gerais
- Validar o token do usuário
- Buscar o cadastro do usuário com a informação do token
- Buscar o cadastro da postagem com o id informado
- Verificar se o usuário já curtiu a postagem
- Cadastrar curtida da postagem no banco de dados
- Retornar sucesso ou erro

---

### POST - Comentar

#### Dados enviados
- token (contem username ou id do usuario)
- id da postagem
- texto do comentário

#### Dados retornados
- sucesso
- erro

#### Objetivos gerais
- Validar o token do usuário
- Buscar o cadastro do usuário com a informação do token
- Validar texto
- Buscar a postagem pelo id informado
- Cadastrar comentário
- Retornar sucesso ou erro