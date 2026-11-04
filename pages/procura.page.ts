import { Page, Locator } from "@playwright/test";

export class ProcuraPage {
    // readonly: propriedade não pode receber outro valor depois de inicializada.
    //Locator: indica que as propriedades representam elementos que podem ser localizados na página.
    readonly page: Page;
    readonly dataRetorno: Locator;
    readonly viagemIda: Locator;
    readonly origem: Locator;
    readonly destino: Locator;
    readonly dataPartida: Locator;
    readonly passageiros: Locator;
    readonly classe: Locator;
    readonly buscar: Locator;
    readonly resultados: Locator;

    constructor(page: Page) {
        this.page = page;

        this.dataRetorno = page.getByTestId("flight-return-date");
        this.viagemIda = page.getByTestId("flight-one-way");
        this.origem = page.getByTestId("flight-from");
        this.destino = page.getByTestId("flight-to");
        this.dataPartida = page.getByTestId("flight-departure-date");
        this.passageiros = page.getByTestId("flight-passengers");
        this.classe = page.getByTestId("flight-class");
        this.buscar = page.getByTestId("flight-search");
        this.resultados = page.getByTestId("flight-sort");

        //constructor: método especial executado ao criar um objeto.
        //page: Page: recebe a página do navegador do Playwright.
        //this.page = page: guarda essa página dentro do objeto ProcuraPage.
    }

    async acessarPagina() {
        await this.page.goto("https://www.qapractice.com/flight-booking-scenarios");
    }

    async selecionarOrigem(cidade: string) {
        await this.origem.selectOption(cidade);
    }

    async selecionarDestino(cidade: string) {
        await this.destino.selectOption(cidade);
    }

    async preencherDataPartida(data: string) {
        await this.dataPartida.fill(data);
    }

      async preencherDataRetorno(data: string) {
        await this.dataRetorno.fill(data);
    }

    async preencherPassageiros(quantidade: string) {
        await this.passageiros.fill(quantidade);
    }

    async selecionarClasse(classe: string) {
        await this.classe.selectOption(classe);
    }

    async selecionarViagemIda() {
        await this.viagemIda.check();
    }

    async buscarVoos() {
        await this.buscar.click();
    }

     async verificarResultados() {
        await this.resultados.waitFor({ state: "visible" });
    }
}