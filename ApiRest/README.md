# O que é uma API?

Uma **API** - _Application Programming Interface_ é uma conjunto de regras que determinam como aplicações interagem. Um API permite que uma aplicação solicite dados de outro sistema.  

Uma API permite que uma aplicação use recursos de outros sistemas, isso significa que, ao criar um aplicativo de e-commerce, podemos nos concentrar apenas em criar o produto. E então usar a API de diferentes aplicações para realizar pagamentos, cobranças, autenticações, etc.  

## 1. Request, Response e Resource

Os três **principais** componentes de uma API são: _Resquest_, _Response_ e _Resource_.  
Você faz uma solicitação(request) a um servidor, ele retorna uma resposta(response) com os dados referentes a uma recurso(resource).

### 1.1 Anatomia da Resquest
Nome | Descrição
:---: | :---: |
Endpoint | a **url** que será feita a _request_
Method | o **tipo** da _request_
Headers | informações adicionais do cliente ou do servidor
Body | informações enviadas ao servidor

### 1.2 Anatomia do Response
Nome | Descrição
:---: | :---: |
Headers | informações adicionais do cliente ou do servidor
Body | **dados** relacionados ao _resource_ solicitado na _request_

## 2. O que é HTTP?

_Hypertext Transfer Protocol_ é um protoloco geralmente usado por serviços da web para servir documentos _HTML_.

### 2.1 Metodos HTTP
O HTTP possui um número fixo de métodos que um cliente pode usar para indicar o tipo de operação que deseja realizar por meio da _request_. Os métodos de _request_ também são conhecidos como **Verbos HTTP**.  
  
Existem 9 métodos HTTP:
`GET`, `POST`, `DELETE`, `PATCH`, `PUT`, `HEAD`, `TRACE`, `CONNECT` e `OPTIONS`.  

Os mais usadados são:

1. #### `GET`
   O método GET é usado para fazer uma solicitação(request) de dados a um servidor.
2. #### `POST`
   O método POST é usado para enviar dados ao servidor
3. #### `DELETE`
   O método DELETE é usado para excluir o recurso(resource) especificado
4. #### `PATCH` & `PUT`
   Os métodos PATCH e PUT são usado para fazer uma atualização num recurso no servidor.
   A principal diferença entre os dois é que o PATCH é usado para modificar **parcialmente** um recurso, enquanto PUT é usado para atualizar **todo** o recurso no servidor.

## 3. Status Code

Quando o servidor devolve uma resposta, um número de 3 digítos tambem é enviado como parte dessa resposta. Esse número é chamado de _"status code"_.
O status code ajuda a indetificar o tipo de resposta do servidor:

Nome | Faixa do status code
:---: | :---: 
Informational | 100-199
Successful | 200-299
Redirection | 300-399
Client error | 400-499
Server error | 500-599

Por exemplo, um GET request retorna o status code **200** indincando sucesso.


###### Veja também: [restAPI.md](./restAPI.md)