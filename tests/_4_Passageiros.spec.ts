import { test, expect } from '@playwright/test';
import { vaiParaSelecaoPassageiros } from '../config/funcoes';

test.beforeEach(async ({ page }) => {
    await vaiParaSelecaoPassageiros(page);

});

test('Verificar campos de passageiro', async ({ page }) => {
    await expect(page.getByTestId('flight-passenger-name')).toBeVisible();
    await expect(page.getByTestId('flight-passenger-email')).toBeVisible();
    await expect(page.getByTestId('flight-passenger-phone')).toBeVisible();

    const botaoContinuar = page.getByTestId('flight-continue-to-payment');

    await expect(botaoContinuar).toBeVisible();
    await expect(botaoContinuar).toBeEnabled();

});

test('Preencher dados do passageiro e avançar para o pagamento', async ({ page }) => {
    // 1. Preenchimento dos dados do passageiro
    const nome = page.getByTestId('flight-passenger-name');
    const email = page.getByTestId('flight-passenger-email');
    const telefone = page.getByTestId('flight-passenger-phone');

    await nome.fill('Ada Lovelace');
    await email.fill('ada@example.com');
    await telefone.fill('+15550100');

    // 2. Confirma que os valores ficaram nos campos
    await expect(nome).toHaveValue('Ada Lovelace');
    await expect(email).toHaveValue('ada@example.com');
    await expect(telefone).toHaveValue('+15550100');

    // 3. Avança para a próxima etapa e valida que os campos de pagamento apareceram
    await page.getByTestId('flight-continue-to-payment').click();
    await expect(page.getByTestId('flight-card-number')).toBeVisible();
});

test('Verificar e-mail inválido', async ({ page }) => {
    await page.getByTestId('flight-passenger-name').fill('Ada Lovelace');

    const email = page.getByTestId('flight-passenger-email');
    await email.fill('ada.example.com');

    await page.getByTestId('flight-passenger-phone').fill('+15550100');

    await page.getByTestId('flight-continue-to-payment').click();

    // Com e-mail inválido não deve avançar para o pagamento
    await expect(email).toBeVisible();
    await expect(page.getByTestId('flight-card-number')).toBeHidden();
});

test('Impedir avanço com campos vazios', async ({ page }) => {
    const nome = page.getByTestId('flight-passenger-name');
    const email = page.getByTestId('flight-passenger-email');
    const telefone = page.getByTestId('flight-passenger-phone');

    const botaoContinuar = page.getByTestId('flight-continue-to-payment');

    await botaoContinuar.click();

    await expect(nome).toBeVisible();
    await expect(email).toBeVisible();
    await expect(telefone).toBeVisible();

    await expect(page.getByTestId('flight-card-number')).toBeHidden();

});
