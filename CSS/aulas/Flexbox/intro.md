# Flexbox

Projetado como um modelo de layout unidimensional e como um método que pode ofercer distribuição de espaço entre itens em uma interface e recursos de alinhamento.  

## 1. Flex Container
É a **tag** que envolve os itens. Nessa tag será aplicada a _propriedade_ `display: flex`. Ela transforma todos os seus itens _filhos_ em **flex itens**.  
Essa propriedade pode ser aplicada a qualquer tag html.  
  
Propriedades:
- `display`: Inicializador do container.
- `flex-direction`: Direcionamento dos itens. É a propriedade que estabelece o eixo principal do container.
  - `row`: à direção do texto. Esquerda para direita. É o padrão.
  - `row-reverse`: sentido oposto ao row.
  - `column`: ordenação de cima para baixo, em coluna unica.
  - `column-reverse`: ordenação inversa à column.
- `flex-wrap`: Define se haverá ou não a quebra de linha. Por padrão não há quebra de linha. Assim os flex itens são compactado além do limite do container.
  - `nowrap`: é o padrão. Não permite a quebra de linha.
  - `wrap`: permite a quebra de linha assim que um dos flex itens não puder mais ser compactado dentrod o container.
  - `wrap reverse`: a quebra de linha funciona de forma inversa, ou seja, a nova linha é adicionada acima da linha atual.
- `flex-flow`: Abreviação para `flex-direction` e `flex-wrap`.
- `justify-content`: Alinha os itens do container de acordo com a sua direção. Caso o item esteja ocupando 100% do container, o alinhamento não se aplica.
  - `flex-start`: alinha ao início do container.
  - `flex-end`: alinha ao final do container.
  - `center`: alinha ao centro do container.
  - `space-between`: cria um espaçamento igual entre os elementos.
  - `space-around`: os espaçamentos do meio são duas vezes maiores que o inicial e final.
  - `space-evenly`: os espaçamentos são iguais.
- `align-items`: Alinha os flex itens de acordo com o eixo do container. O alinhamento em linhas ou colunas é diferente. Essa propriedade permite o alinhamento central no eixo vertical(meio da tela).
  - `center`: alinha os itens ao centro.
  - `stretch`: alinha os itens de forma igual de acordo com o tamanho do maior item. É  o padrão.
  - `flex-start`: alinha ao inicio.
  - `flex-end`: alinha ao final.
  - `baseline`: alinha de acordo com a linha base da tipografia dos itens.
- `align-content`: Alinha as linhas do container em relação ao eixo vertical do container.
  - Para isso, precisamos que:
    - O container tenha quebra de linhas.
    - A altura do container seja maior que a soma da altura das linhas dos itens.
  - `center`: alinha os itens ao centro.
  - `stretch`: é o padrão. Os flex itens crescem igualmente usando o maior elemento como referência.
  - `flex-start`: alinha ao inicio do container.
  - `flex-end`: alinha ao final.
  - `space-between`: cria um espaçamento igual entre os itens.
  - `space-around`: os espaçamentos entre os itens são duas vezes maiores que o inicial e final.

## 2. Flex Item
São os elementos filhos diretos do Flex Container. E também podem se tornar Flex Container.  
  
Propriedades:
- `flex-grow`: Define o fator de crescimento, respeitando o tamanho de seus conteúdos internos.
  - Se o flex container tiver a propriedade `justify-content` ela só funcinará quando o `flex-grow` for `0`, que é o padrão.
- `flex-basis`: Define o tamanho inicial do item.
  - `auto`: caso o item não tenha tamanho, este será proporcinal ao conteúdo do item.
  - `px`, `%`, `em`, etc: são valores exatos previamente definidos.
  - `0`: terá realção com a definição d o `flex-grow`.
- `flex-shrink`: Define a capacidade de redução do tamanho de um item.
  - Quando definido em `0`, ele não permite que o item seja reduzido.
- `flex`: Abreviação para as 3 propriedades acima.
  - Ordem de escrita: `grow`, `shrink`, `basis`.
- `order`: Ordem de distribuição e listagem dos itens.
  - O valor padrão é zero.
- `align-self`: Define o alinhamento de um item especifico do container. Possui alguns valores:
  - `auto`: é o padrão. Respeita a definição do `align-items` do container.
  - `flex-start`: alinhamento ao inicio do container
  - `flex-end`: alinhamento ao final do container
  - `center`: relativo ao centro, de acordo com o eixo(column ou row).
  - `stretch`: ocupa todos os espaços.
  - `baseline`: 