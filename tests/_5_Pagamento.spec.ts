import { test, expect } from '@playwright/test';
import { vaiParaPagamento } from '../config/funcoes';

test('Verificar campos de pagamento', async ({ page }) => {
    await vaiParaPagamento(page);

    await expect(page.getByTestId('flight-card-number')).toBeVisible();
    await expect(page.getByTestId('flight-expiry')).toBeVisible();
    await expect(page.getByTestId('flight-cvv')).toBeVisible();

});

test('Verificar número de cartão inválido', async ({ page }) => {
    await vaiParaPagamento(page);

    const numeroCartao = page.getByTestId('flight-card-number');
    await numeroCartao.fill('411111');

    await page.getByTestId('flight-expiry').fill('12/30');
    await page.getByTestId('flight-cvv').fill('123');

    await page.getByTestId('flight-book').click();

});

test('Verificar data de expiração inválida', async ({ page }) => {
    await vaiParaPagamento(page);

    await page.getByTestId('flight-card-number').fill('4111111111111111');

    const dataExpiracao = page.getByTestId('flight-expiry');

    await dataExpiracao.fill('13/30');

    await page.getByTestId('flight-cvv').fill('123');

    await page.getByTestId('flight-book').click();
});

test('Verificar CVV inválido', async ({ page }) => {
    await vaiParaPagamento(page);

    await page.getByTestId('flight-card-number').fill('4111111111111111');
    await page.getByTestId('flight-expiry').fill('12/30');

    const cvv = page.getByTestId('flight-cvv');

    await cvv.fill('1');

    await page.getByTestId('flight-book').click();
});


test('Impedir pagamento com campos vazios', async ({ page }) => {
    await vaiParaPagamento(page);

    const numeroCartao = page.getByTestId('flight-card-number');
    const dataExpiracao = page.getByTestId('flight-expiry');
    const cvv = page.getByTestId('flight-cvv');

    const botaoPagamento = page.getByTestId('flight-book');

    await botaoPagamento.click();

    await expect(numeroCartao).toBeVisible();
    await expect(dataExpiracao).toBeVisible();
    await expect(cvv).toBeVisible();

    await expect(page).not.toHaveURL(/confirmation/);

});