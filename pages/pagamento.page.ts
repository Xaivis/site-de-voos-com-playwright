import { Page, Locator} from "@playwright/test";

export class PagamentoPage{
    readonly page: Page;
    readonly numeroCartao: string = 'flight-card-number';
    readonly dataExpiracao: string = 'flight-expiry';
    readonly cvv: string = 'flight-cvv';

    constructor(page: Page) {
        this.page = page;
    };

    // async verificarCampoPagamento () {
    //     await this.numeroCartao.
    //     await 
    // }

    async preenchendoCampos (cartao: string, data: string, cvv: string) {
        await this.page.fill(this.numeroCartao, cartao);
        await this.page.fill(this.dataExpiracao, data);
        await this.page.fill(this.cvv, cvv);
    }

    //sync verificandoCartaoInvalido ()


}