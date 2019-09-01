# payprev-test-backend

## Instalação 
- Execute o comando **[yarn](https://yarnpkg.com/lang/en/) install** para instalar as dependência.
- Altere a URL de conexão com o banco de dados no arquivo em "bd_string" localizado no arquivo **src/config/config.js**, e coloque a url para o seu banco de dados **Mongodb**
- escolha a porta que vai rodar a sua apliação no arquivo **src/index.js** na variavel **port**
- rode o comando **yarn run dev**

## Usando a aplicação

- vamos tomar como base que você colocou a sua porta na variavel <PORT> e está utilizando o [Insominia](https://insomnia.rest/)
- Todos os dados serão enviados em formato JSON
  
As rotas estão divididas em 3 niveis.
1. Rotas publicas: todos tem acesso.
  - http://localhost:<PORT>/register
    1. Utilizando o metodo POST, entre com seus no formato JSON para cadastrar um novo usuario.
    2. Os dados para cadastrar um novo usuario são CPF(String), email(String), password(String) e admin(Boolean) por padrão o          campo admin vem como falso, para criar um usuario com super poderem, altereo para true.
  - http://localhost:<PORT>/login
  
    1. Utilizando o metodo POST, entre com seus no formato JSON para cadastrar um novo usuario.
    2. Os dados para login são email(String) e password(String). 
    
    - **OBS: tanto na criação, quanto na autenticação de usuario(login) será gerado um token JWT de autenticação**
    
2. Rotas para usuarios comuns: **acessada por usuarios previamente cadastrados, porem sem permissões de administrador**
 
 **OBS: AQUI TODAS AS ROTAS SÂO AUTENTICADAS E VOCÊ PRECISA ESTAR LOGADO, logo você precisa de autenticar para acessalas. No Insominia na aba "Header" entre com o os valores auth(um token valido que é gerado ao fazer login ou cadastrar novo usuario) e id(id gerado pelo Mongodb, de um usuario cadastrado)**
  
  1. http://localhost:<PORT>/devs.
    - Metodo GET, lista todos os devs do GitHub salvos pelo admin.
  
  2. http://localhost:<PORT>/adddev
    - Metodo POST, cria uma pasta(se ela não existir) e adiciona o dev dentro dela, os parametros requeridos são: folderName,     idDev(id do dev que voce quer adicionar), tags(Separe as tags por virgulas, não é obrigatorio enviar as tags).

  3. http://localhost:<PORT>/folders
    - Metodo GET, mostra todas as pastas criadas pelo usuario comum e os devs dentro.
  
  4. http://localhost:<PORT>/renamefolder
    - Metodo PUT, altera o nome da pasta criada pelo usuario, seus parametros são: folderName(nome atual), newFolderName,           id(id da pasta).
  
  5. http://localhost:<PORT>/delete
    - Metodo DELETE, deleta uma pasta criada pelo usuario, tem como parametro o id da pasta que deseja deletar
  
    
3. Rotas de admin: **rotas liberadas apenas para usuarios com super poderes(admin)**

  **OBS: AQUI TODAS AS ROTAS SÂO AUTENTICADAS E VOCÊ PRECISA ESTAR LOGADO COMO ADMIN, logo você precisa de autenticar para acessalas. No Insominia na aba "Header" entre com o os valores auth(um token valido que é gerado ao fazer login ou cadastrar novo usuario) e id(id gerado pelo Mongodb, de um usuario ADMIN cadastrado)**
   
   <NOME> (NOME DO USUARIO PESQUISADO OU A SER PESQUISADO NO GITHUB)
       
   1. http://localhost:<PORT>/user/<NOME>
    - Metodo GET, pesquisa por usuarios do GitHub utilizando usa API publica
  
   2. http://localhost:<PORT>/user/<NOME>/add
    - Metodo POST, salva um usuario do GitHub no banco de dados
  
   3. http://localhost:<PORT>/list
    - Metodo GET, Lista todos os usuarios que foram cadastrados na API(não os usuarios do github)
  
   4. http://localhost:<PORT>/deleteuser
    - Metodo DELETE, deleta um usuario cadastrado(Não os usuarios salvos do github) , precisa ser passado o id do usuario.
  
  5. http://localhost:<PORT>/edit
    - Metodo PUT, edita as informações de um usuario cadastrado(não edita informações de usuarios salvos do GitHub). Os parametros são id(id do user que quer alterar uma informação), cpf, email, password, admin(Boolean).
