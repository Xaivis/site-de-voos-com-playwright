import { Page, expect } from '@playwright/test';

export class PassageirosPage {
    readonly page: Page;
    readonly name_passenger: string = 'flight_passenger_name';
    readonly email_passenger: string = 'flight_passenger_email';
    readonly phone_passenger: string = 'flight_passenger_phone';

    constructor(page: Page) {
        this.page = page;
    };

    async verificarCamposPassageiro() {
        await expect (this.page.getByTestId(this.name_passenger)).toBeVisible();
        await expect (this.page.getByTestId(this.email_passenger)).toBeVisible();
        await expect (this.page.getByTestId(this.phone_passenger)).toBeVisible();
    }

    async preencherDadosPassageiro(nome: string, email: string, telefone: string) {
        await this.page.fill(this.name_passenger, nome);
        await this.page.fill(this.email_passenger, email);
        await this.page.fill(this.phone_passenger, telefone);
    };

    async avancarParaPagamento() {
        await this.page.getByTestId('flight-continue-to-payment').click();
        await expect(this.page.getByTestId('flight-card-number')).toBeVisible();
    };

    async verificarEmailInvalido(nome: string, email: string, telefone: string) {
        await this.page.fill(this.name_passenger, nome);
        await this.page.fill(this.email_passenger, email);
        await this.page.fill(this.phone_passenger, telefone);
        await this.page.getByTestId('flight-continue-to-payment').click();
        await expect (this.page.getByTestId(this.email_passenger)).toBeVisible(); 
        await expect(this.page.getByTestId('flight-email-error')).toBeHidden();
    }

};



    
