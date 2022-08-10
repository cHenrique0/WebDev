# Módulos externos

Os modulos externos são pacotes de _classes_, _tipos*_, _interfaces*_ e _funções_ desenvolvidos por terceiros. 
São baixados via `npm` ou `yarn`.

**Criar um projeto:**
```sh
npm init
# ou
yarn init
# adicionar a flag -y para não ter que preencher algumas perguntas
```
**Baixar os módulos:**
```sh
npm install <package_name>
# ou
yarn add <package_name>
```

* Após iniciar um projeto, um arquivo `package.json` é adicionado na pasta raiz do projeto. Este arquivo contém as configurações do projeto.
* Quando instalamos um módulo a pasta `node_modules` é criada, nela estão os módulos baixados e suas dependências.
* Os módulos instalados são adicionado no arquivo `package.json`