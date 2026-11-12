# Automação de Testes E2E — Page Object Model (POM)

## Descrição do Projeto

Este projeto tem como objetivo aplicar o padrão de projeto **Page Object Model (POM)** aos testes automatizados End-to-End (E2E) desenvolvidos anteriormente para a aplicação QA Practice, utilizando Playwright e TypeScript.

Nesta atividade, a refatoração foi direcionada à área de pagamento, buscando melhorar a organização, reutilização e manutenção do código por meio da separação entre os cenários de teste e os elementos de interação com a interface.

## Objetivo da Atividade

Refatorar os testes existentes utilizando o padrão Page Object Model, centralizando os seletores e métodos de interação com a página de pagamento em uma classe específica.

Os cenários desenvolvidos anteriormente foram preservados e adaptados para utilizar os métodos disponibilizados pela classe Page Object.

## Tecnologias Utilizadas

- **Playwright:** automação de testes End-to-End.
- **TypeScript:** linguagem utilizada no desenvolvimento dos testes.
- **Node.js:** ambiente de execução.
- **Git e GitHub:** controle de versão e hospedagem do projeto.

## Estrutura do Projeto

```text
site-de-voos-com-playwright/
│
├── pages/
│   ├── base.page.ts
│   ├── finalizacao.page.ts
│   ├── pagamento.page.ts
│   ├── passageiros.page.ts
│   ├── procura.page.ts
│   └── selecao.page.ts
│
├── tests/
│   ├── _1_E2ETestes.spec.ts
│   ├── _2_ProcuraVoos.spec.ts
│   ├── _3_SelecaoVoos.spec.ts
│   ├── _4_Passageiros.spec.ts
│   ├── _5_Pagamento.spec.ts
│   └── _6_Finalizacao.spec.ts
│
```
## Instalação das Dependências

É necessário ter o Node.js instalado para executar o projeto.

Clone o repositório:

```
git clone URL_DO_REPOSITORIO
```

Acesse a pasta do projeto:

```bash
cd site-de-voos-com-playwright
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

## Execução dos Testes

Para executar todos os testes:

```bash
npx playwright test
```

Para abrir o relatório HTML:

```bash
npx playwright show-report
```

## Considerações Finais

A aplicação do padrão Page Object Model na área de pagamento permitiu separar as responsabilidades dos cenários de teste e das interações com a interface.

Com a centralização dos seletores e métodos na classe Page Object, o código se torna mais organizado, reutilizável e fácil de manter, facilitando futuras alterações e a evolução da automação.
