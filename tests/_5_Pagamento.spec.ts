import { test, expect } from '@playwright/test';
import { vaiParaPagamento } from '../config/funcoes';
import { PagamentoPage } from '../pages/pagamento.page';


let pagamento: PagamentoPage;


test.beforeEach(async ({ page }) => {
    await vaiParaPagamento(page);

    pagamento = new PagamentoPage(page);

});

test('Verificar resumo e confirmação dos dados da passagem', async ({ page }) => {

    await pagamento.verificarResumoPassagem();

});

test('Verificar campos de pagamento', async ({ page }) => {

    await pagamento.verificarCampos();   

});
    
test('Verificar número de cartão inválido', async ({ page }) => {

    await pagamento.preencherCartao('411111');
    await pagamento.preencherValidade('12/30');
    await pagamento.preencherCVV('123');

    await pagamento.clicarPagar();

});

test('Verificar data de expiração inválida', async ({ page }) => {

    await pagamento.preencherCartao('4111111111111111');
    await pagamento.preencherValidade('13/30');
    await pagamento.preencherCVV('123');

    await pagamento.clicarPagar();

});

test('Verificar CVV inválido', async ({ page }) => {

    await pagamento.preencherCartao('4111111111111111');
    await pagamento.preencherValidade('12/30');
    await pagamento.preencherCVV('1');

    await pagamento.clicarPagar();

});

test('Impedir pagamento com campos vazios', async ({ page }) => {

    await pagamento.clicarPagar();

    await pagamento.verificarCampos();

});