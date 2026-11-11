import { Page, Locator, expect} from "@playwright/test";

export class PagamentoPage{
    readonly page: Page;

    // Seletores
    readonly CARD_NUMBER = 'flight-card-number';
    readonly EXPIRY = 'flight-expiry';
    readonly CVV = 'flight-cvv';
    readonly BOOK_BUTTON = 'flight-book';

    // Localizadores
    readonly numeroCartao: Locator;
    readonly dataExpiracao: Locator;
    readonly cvv: Locator;
    readonly botaoPagamento: Locator;
    readonly resumoPassagem: Locator;

    constructor(page: Page) {
        this.page = page;

        this.numeroCartao = page.getByTestId(this.CARD_NUMBER);
        this.dataExpiracao = page.getByTestId(this.EXPIRY);
        this.cvv = page.getByTestId(this.CVV);
        this.botaoPagamento = page.getByTestId(this.BOOK_BUTTON);
        this.resumoPassagem = page.getByText('Global Wings (GW100)$210× 1');
    };

     // Verificações
    async verificarResumoPassagem() {
        await expect(this.resumoPassagem).toBeVisible();
    }

     async verificarCampos() {
        await expect(this.numeroCartao).toBeVisible();
        await expect(this.dataExpiracao).toBeVisible();
        await expect(this.cvv).toBeVisible();
        await expect(this.botaoPagamento).toBeVisible();
        await expect(this.botaoPagamento).toBeEnabled();
    }
    
    // Preenchimento dos campos
     async preencherCartao(numero: string) {
        await this.numeroCartao.fill(numero);
    }

     async preencherValidade(validade: string) {
        await this.dataExpiracao.fill(validade);
    }

    async preencherCVV(codigo: string) {
        await this.cvv.fill(codigo);
    }

    // Ação do botão
    async clicarPagar() {
        await this.botaoPagamento.click();
    }

};