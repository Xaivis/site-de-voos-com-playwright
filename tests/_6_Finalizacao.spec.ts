import { test, expect } from '@playwright/test';
import { vaiParaFinalizacao } from '../config/funcoes';

test.beforeEach(async ({ page }) => {
    await vaiParaFinalizacao(page);

});

test('deve confirmar reserva com dados corretos', async ({ page }) => {
    // 1. Confirmação do cabeçalho, etapa atual e referência
    const stepDone = page.getByTestId('flight-steps').getByText(/Done/i);
    await expect(stepDone).toBeVisible();
    await expect(stepDone).toHaveClass(/bg-primary/);

    await expect(page.getByTestId('flight-booking-success')).toHaveText('Booking Confirmed!');
    await expect(page.getByText(/^Booking reference/)).toBeVisible();

    // 2. Dados dinâmicos e detalhes da reserva (vindos do fluxo de vaiParaFinalizacao)
    const pnr = page.getByTestId('flight-pnr');
    await expect(pnr).toBeVisible();
    await expect(pnr).toHaveText(/^[A-Z0-9]{6,8}$/);

    await expect(page.getByText('Departure', { exact: true })).toBeVisible();
    await expect(page.getByText('Global Wings (GW100)')).toBeVisible();
    await expect(page.getByText('New York → London')).toBeVisible();
    await expect(page.getByText('$210')).toBeVisible();
    await expect(page.getByText('****1111')).toBeVisible();
    await expect(page.getByText('ada@example.com', { exact: true })).toBeVisible();

    // 3. Botões clicáveis
    const reserveOutro = page.getByRole('button', { name: /book another flight/i });
    await expect(reserveOutro).toBeEnabled();

    // 4. Navegação: ao clicar em "Book another flight", retorna para a etapa de busca
    await reserveOutro.click();
    await expect(page.getByTestId('flight-search')).toBeVisible();
});

test('botão voltar para home', async ({ page }) => {
    const botaoHome = page.getByRole('button', { name: /back to home page/i });
    await expect(botaoHome).toBeVisible();
    await botaoHome.click();

    await expect(page).toHaveURL('https://www.qapractice.com/');
});
