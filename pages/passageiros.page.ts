import { Page, Locator, expect } from '@playwright/test';

export class PassageirosPage {
    // readonly: a propriedade não pode receber outro valor depois de criada.
    // Locator: representa um elemento da página que o Playwright sabe encontrar.
    readonly page: Page;
    readonly nome: Locator;
    readonly email: Locator;
    readonly telefone: Locator;
    readonly botaoContinuar: Locator;
    readonly numeroCartao: Locator; // campo da próxima etapa (pagamento)

    constructor(page: Page) {
        this.page = page;

        this.nome = page.getByTestId('flight-passenger-name');
        this.email = page.getByTestId('flight-passenger-email');
        this.telefone = page.getByTestId('flight-passenger-phone');
        this.botaoContinuar = page.getByTestId('flight-continue-to-payment');
        this.numeroCartao = page.getByTestId('flight-card-number');
    }

    // Teste 1: os três campos e o botão aparecem na tela
    async verificarCamposPassageiro() {
        await expect(this.nome).toBeVisible();
        await expect(this.email).toBeVisible();
        await expect(this.telefone).toBeVisible();
        await expect(this.botaoContinuar).toBeVisible();
        await expect(this.botaoContinuar).toBeEnabled();
    }

    // Preenche os três campos (usado nos testes 2 e 3)
    async preencherDadosPassageiro(nome: string, email: string, telefone: string) {
        await this.nome.fill(nome);
        await this.email.fill(email);
        await this.telefone.fill(telefone);
    }

    // Teste 2: confirma que o texto digitado ficou nos campos
    async verificarDadosPreenchidos(nome: string, email: string, telefone: string) {
        await expect(this.nome).toHaveValue(nome);
        await expect(this.email).toHaveValue(email);
        await expect(this.telefone).toHaveValue(telefone);
    }

    // Clica em "Continuar para pagamento"
    async clicarContinuar() {
        await this.botaoContinuar.click();
    }

    // Teste 2: a etapa de pagamento apareceu
    async verificarAvancoParaPagamento() {
        await expect(this.numeroCartao).toBeVisible();
    }

    // Testes 3 e 4: continuamos na etapa de passageiros (não avançou)
    async verificarQueNaoAvancou() {
        await expect(this.nome).toBeVisible();
        await expect(this.email).toBeVisible();
        await expect(this.telefone).toBeVisible();
        await expect(this.numeroCartao).toBeHidden();
    }
}
