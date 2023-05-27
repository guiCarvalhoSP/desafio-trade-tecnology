# Teste técnico Trade Technology

## Descrição 
Este projeto é o teste técnico para candidatura a vaga de emprego oferecida pela empresa Trade Technology. O projeto se baseia em consumir um API externa que possui dados de campeonatos de futebol e detalhes sobre times e jogadores. A aplicação mostra de forma gráfica diversos dados oferecidos pela API, pesquisando dados de diversos times em um campeonato de uma temporada específica, ao se selecionar o pais de origem, a liga desejada, a temporada, e por fim, um dos times que participou no campeonato naquela temporada.

 ## 📁 Acesso ao projeto

Você pode ter acesso aos arquivos do projeto clicando [aqui](https://github.com/guiCarvalhoSP/desafio-trade-tecnology). 

## 🛠️ Como rodar o projeto

- É necessário ter previamente instalado em sua máquina o [Git](https://git-scm.com/), [NPM](https://www.npmjs.com/) e [NodeJs](https://nodejs.org/en), em suas versões LTS, também necessário o uso do [Angular CLI](https://v15.angular.io/docs), em sua versão 15. Após instala-los e configura-los, poderá seguir para os próximos passos.

- Execute seguinte comando em um terminal para clonar o projeto no diretório desejado:
```sh
git clone https://github.com/guiCarvalhoSP/desafio-trade-tecnology.git
```

- Após clonar, abra o diretório no projeto em um terminal, e execute:
```sh
npm install --legacy-peer-deps
```
É necessário o uso da flag "--legacy-peer-deps", pois as dependências 'chart.js' e 'ng2-charts' (Responsáveis por criar gráficos) apesar de em suas respectivas documentações relatarem serem compatíveis com o Angular 15, o npm dá um erro de incompatibilidade de versões; vale lembrar que apesar de qualquer erro na tentativa de instalação sem a flag, as dependências funcionam perfeitamente na versão do angular atual nesse projeto.

- Ao finalizar a instalação, você pode executar o programa com o seguinte comando:
```sh
ng serve
```
Após a inicialização no terminal, poderá ser acessado a aplicação através de um navegador, acessado a rota ``http://localhost:4200/``

- Caso deseje realizar os testes unitários, execute o comando:
```sh
ng test
```

## ✔️ Tecnologias utilizadas
- ``Angular 15``
- ``RxJs``
- ``Chart.js``
- ``Scss``
