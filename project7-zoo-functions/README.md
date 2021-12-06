<h1>Bem vindo ao repositório do projeto Javascript Zoo Functions</h1>

<h3>English Version Avaiable soon</h3>

<h2>Introdução</h2>

Esse projeto foi o meu Número #7 dos meus projetos realizados no Curso de Desenvolvimento Web da Trybe.

Será implementado funções utilizando `Javascript ES6`.

As competências avaliadas nesse projeto foram:
1- Implementar Funções em Javascript
2- Implementar Testes Unitários utilizando o Jest

<h2>Requisitos</h2>

### 1. Implemente a função `getSpeciesByIds`

Esta função é responsável pela busca das espécies de animais por id. Ela retorna um array contendo as espécies referentes aos ids passados como parâmetro, podendo receber um ou mais ids.

**Observações técnicas**

- O parâmetro desta função pode ser alterado para atender ao requisito proposto.

---

### 2. Implemente a função `getAnimalsOlderThan`

Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais daquela espécie possuem a idade mínima especificada.

**Observações técnicas**

- Deve retornar um valor booleano.

---

### 3. Implemente a função `getEmployeeByName`

Esta função é responsável pela busca das pessoas colaboradoras através do primeiro ou do último nome delas

---

### 4. Implemente a função `getRelatedEmployees`

Considerando a boa prática de dividir o código em partes menores, apresentamos a função `getRelatedEmployees` em que você deverá dividí-la em duas funções:

1 - `isManager` - que será responsável por verificar se uma pessoa colaboradora é gerente ou não. O retorno dessa função deve ser um booleano: `true` ou `false`;

2 - `getRelatedEmployees` - que utiliza a primeira função para apresentar as seguintes saídas:

- se for uma pessoa colaboradora gerente, deve retornar um array contendo os nomes das pessoas colaboradoras que ela é responsável;
- se **não** for uma pessoa colaboradora gerente, deverá ser lançado um erro gerado com a função construtora **Error** da biblioteca padrão do JavaScript com a mensagem **"O id inserido não é de uma pessoa colaboradora gerente!"**.

Exemplo:

```javascript
throw new Error("O id inserido não é de uma pessoa colaboradora gerente!");
```

Você pode ler mais sobre a [função construtora **Error**, neste link.](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Error)

**Observações técnicas**

- Retorna um array contendo nome e sobrenome das pessoas colaboradoras gerenciadas por determinada pessoa com cargo de gerência.

Exemplo de output:

```javascript
["Burl Bethea", "Ola Orloff", "Emery Elser"];
```

- Dispara um erro com a mensagem: "O id inserido não é de uma pessoa colaboradora gerente!".

---

### 5. Implemente a função `countAnimals`

Esta função é responsável por contabilizar a quantidade de animais de cada espécie.

**Observações técnicas**

- Se nenhum argumento for passado, retorna um objeto cujo o nome de cada espécie é uma chave desse objeto, e o total de animais dessa espécie é o seu valor;
- Com o argumento `{ specie: 'penguins' }`, retorna um número, a quantidade de pinguins no zoológico;
- Com o argumento `{ specie: 'giraffes', sex: 'female' }`, retorna um número, a quantidade de girafas do sexo feminino.

---

### 6. Implemente a função `calculateEntry`

Esta função irá receber um array de visitantes no seguinte formato:

```javascript
const entrants = [
  { name: "Lara Carvalho", age: 5 },
  { name: "Frederico Moreira", age: 5 },
  { name: "Pedro Henrique Carvalho", age: 5 },
  { name: "Maria Costa", age: 18 },
  { name: "Núbia Souza", age: 18 },
  { name: "Carlos Nogueira", age: 50 },
];
```

Você deve isolar a parte da lógica na função `countEntrants` que se encontra no mesmo arquivo da função `calculateEntry`. Ela deverá receber o array de visitantes e retornar um objeto com a contagem de acordo com os seguintes critérios de classificação:

- Pessoas com idade menor que 18 anos são classificadas como crianças (child);
- Pessoas com idade maior ou igual a 18 anos e menor que 50 são classicadas como adultas (adult);
- Pessoas com idade maior ou igual 50 anos são classificadas como pessoas com mais idade (senior).

O retorno da função deverá ser um objeto no seguinte formato: `{ child: 3, adult: 2, senior: 1 }`.

**Exemplo de uso da função `countEntrants`:**

```javascript
<h1>Bem vindo ao repositório do projeto Javascript Testes Unitários</h1>

<h3>English Version Avaiable soon</h3>

<h2>Introdução</h2>

Esse projeto foi o meu Número #6 dos meus projetos realizados no Curso de Desenvolvimento Web da Trybe.

Será implementado Testes Unitários utilizando a ferramenta `Jest` e funções utilizando `Javascript`.

As competências avaliadas nesse projeto foram:
1- Implementar Funções em Javascript
2- Implementar Testes Unitários utilizando o Jest

<h2>Requisitos</h2>countEntrants(entrants);
```

**Saída:**

```json
{ "child": 3, "adult": 2, "senior": 1 }
```

Após terminar a implementação da função `countEntrants` você deverá utilizá-la para implementar a função `calculateEntry`. Esta deverá receber um array de visitantes e a partir da quantidade de visitantes e faixa etária de cada um, deverá retornar o valor total a ser cobrado.

**Exemplo de uso da função `calculateEntry`:**

```javascript
calculateEntry(entrants);
```

**Saída:**

```javascript
187.94;
```

**Observações técnicas**

- Ambas funções recebem como parâmetro um array contendo objetos que representam pessoas.

---

### 7. Implemente a função `getAnimalMap`

A função é responsável pelo mapeamento geográfico das espécies e seus animais, podendo ainda filtrá-los por ordem alfabética e sexo.

**Observações técnicas**

- Analise o teste unitário para entender os retornos que são esperados para esta função.

---

### 8. Implemente a função `getSchedule`

A função é responsável por disponibilizar as informações de horário dos animais em uma consulta para o usuário, que pode querer ter acesso ao cronograma da semana, de um dia ou de um animal em específico.

**Observações técnicas**

- Analise os testes unitários para entender os retornos que são esperados para esta função;
- Quebre o problema em funções menores para que fique mais simples de administrar a responsabilidade de cada uma delas.

---

### 9. Implemente a função `getOldestFromFirstSpecies`

A função busca por informações do animal mais velho da primeira espécie gerenciada pela pessoa colaboradora do parâmetro.

---

### 10. Implemente a função `getEmployeesCoverage`

Esta função será responsável por associar informações de cobertura das pessoas funcionárias.

A cobertura deverá ser representada por um objeto com as seguintes propriedades:

```javascript
{
  "id": "4b40a139-d4dc-4f09-822d-ec25e819a5ad", // id da pessoa
  "fullName": "Sharonda Spry", // nome completo: firstName + lastName
  "species": [ "otters", "frogs" ], // espécies as quais a pessoa é responsável
  "locations": [ "SE", "SW" ], // Um array contendo todas as localizações das espécies
}
```

A função deve receber um objeto de opções que determinará seu comportamento, sendo:

- **name**: O nome ou sobrenome da pessoa a ser buscada
- **id**: O id da pessoa a ser buscada

**Exemplos de uso da função `getEmployeesCoverage`:**

```javascript
getEmployeesCoverage({ name: "Sharonda" });
getEmployeesCoverage({ name: "Spry" });
getEmployeesCoverage({ id: "4b40a139-d4dc-4f09-822d-ec25e819a5ad" });
```

**Saída:**

```json
{
  "id": "4b40a139-d4dc-4f09-822d-ec25e819a5ad",
  "fullName": "Sharonda Spry",
  "species": ["otters", "frogs"],
  "locations": ["SE", "SW"]
}
```

Ao ser chamada sem argumentos, deverá retornar um array com a cobertura de todas as pessoas funcionárias:

**Exemplo:**

```javascript
getEmployeesCoverage();
```

**Saída:**

```javascript
[
  {
    id: "c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1",
    fullName: "Nigel Nelson",
    species: ["lions", "tigers"],
    locations: ["NE", "NW"],
  },
  {
    id: "0e7b460e-acf4-4e17-bcb3-ee472265db83",
    fullName: "Burl Bethea",
    species: ["lions", "tigers", "bears", "penguins"],
    locations: ["NE", "NW", "NW", "SE"],
  },
  {
    id: "fdb2543b-5662-46a7-badc-93d960fdc0a8",
    fullName: "Ola Orloff",
    species: ["otters", "frogs", "snakes", "elephants"],
    locations: ["SE", "SW", "SW", "NW"],
  },
  //[...]
];
```

Caso nenhuma pessoa seja encontrada com o nome, sobrenome ou id, deverá ser lançado um erro gerado com a função construtora **Error** da biblioteca padrão do JavaScript com a mensagem **"Informações inválidas"**. Exemplo:

```javascript
throw new Error("Informações inválidas");
```

Você pode ler mais sobre a [função construtora **Error**, neste link.](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Error)

**Dica**: Crie funções que dividam a tarefa em partes menores, por exemplo, você poderia criar uma função `getSpecies` encarregada somente por buscar o nome das espécies que a pessoa é responsável.

**Observações técnicas**

- Ao receber o objeto de opções com a propriedade name, procura a pessoa funcionária correspondente;
- A opção name deverá aceitar nome e sobrenome para realizar a busca;
- Ao chamar a função sem argumentos ela deve retornar um array com a cobertura de todas as pessoas funcionárias.
