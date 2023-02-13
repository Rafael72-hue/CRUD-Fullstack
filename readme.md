Este é um projeto CRUD utilizando as seguintes tecnologias: React (front), C# (back), MySQL (banco).

para a integração do back com o banco de dados na hora de rodar a aplicação é recomendado rodar os seguintes comandos: 
*caso não tenha nenhum arquivo que inclua a palavra InitialDB
- Add-Migration InitialDB -Context ServerDBContext
- Update-Database -Context ServerDBContext

é necessário ter o sql server instalado na máquina, e verificar no arquivo "appsettings.json" se as informações da DataBase estão corretas

Depois que os comandos acima forem executados é só rodar o back que já vai estar funcionando.

A parte do front, só rodar "npm install" para as dependências e "npm start" para rodar e aplicação e estará tudo funcionando.