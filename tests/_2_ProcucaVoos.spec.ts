import { test, expect } from '@playwright/test';
import { vaiParaPagamento } from '../config/funcoes';


test('Verificar campo de retorno', async ({ page }) => {

    await test.step('Acessar a página de reservas de voos', async () => {
        await page.goto('https://www.qapractice.com/flight-booking-scenarios');
    });

    await test.step('Verificar se a data de retorno está visível', async () => {
        await expect(page.locator('#flight-return-date')).toBeVisible();
    });

    await test.step('Marcar a opção de viagem só de ida', async () => {
        await page.getByRole('checkbox', { name: 'One Way' }).check();
    });

    await test.step('Verificar se a data de retorno ficou oculta', async () => {
        await expect(page.locator('#flight-return-date')).toBeHidden();
    });
});

test('Validar campos obrigatórios', async ({ page }) => {

    await test.step('Acessar a página de reservas de voos', async () => {
        await page.goto('https://www.qapractice.com/flight-booking-scenarios');
    });

    await test.step('Clicar em buscar voos sem preencher os campos', async () => {
        await page.getByRole('button', { name: 'Search Flights' }).click();
    });

    // Aqui vamos verificar as mensagens de validação
});

test('Impedir origem e destino iguais', async ({ page }) => {

    await test.step('Acessar a página de reservas de voos', async () => {
        await page.goto('https://www.qapractice.com/flight-booking-scenarios');
    });

    await test.step('Selecionar a mesma cidade na origem e no destino', async () => {
        await page.locator('#flight-from').selectOption('New York');
        await page.locator('#flight-to').selectOption('New York');
    });

    await test.step('Clicar em buscar voos', async () => {
        await page.getByRole('button', { name: 'Search Flights' }).click();
    });

    // Aqui vamos verificar a mensagem de erro
});

test('Preencher todos os campos de Search Flights', async ({ page }) => {

    await test.step('Acessar a página de reservas de voos', async () => {
        await page.goto('https://www.qapractice.com/flight-booking-scenarios');
    });

    await test.step('Selecionar a cidade de origem', async () => {
        await page.locator('#flight-from').selectOption('New York');
    });

    await test.step('Selecionar a cidade de destino', async () => {
        await page.locator('#flight-to').selectOption('London');
    });

    await test.step('Preencher a data de partida', async () => {
        await page.locator('#flight-departure-date').fill('2026-11-10');
    });

    await test.step('Preencher a data de retorno', async () => {
        await page.locator('#flight-return-date').fill('2026-11-20');
    });

    await test.step('Informar a quantidade de passageiros', async () => {
        await page.locator('#flight-passengers').fill('2');
    });

    await test.step('Selecionar a classe da viagem', async () => {
        await page.locator('#flight-class').selectOption('Business');
    });

    await test.step('Clicar no botão de buscar voos', async () => {
        await page.getByRole('button', { name: 'Search Flights' }).click();
    });

    await test.step('Validar que a etapa de passageiros foi aberta', async () => {
        await expect(page.getByTestId('flight-passenger-name')).toBeVisible();
    });
});