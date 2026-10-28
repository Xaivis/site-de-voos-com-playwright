import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FlightsPage } from '../pages/FlightsPage';

test.describe('Fluxo de Busca - 4 Passageiros', () => {
  let flightsPage: FlightsPage;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    flightsPage = new FlightsPage(page);

    await homePage.goto();
    
    // Encapsula o preenchimento e a execução da busca para reaproveitar no beforeEach
    await homePage.searchForRoute({
      origin: 'São Paulo',
      destination: 'Rio de Janeiro',
      adults: 4
    });
  });

  test('deve exibir os resultados da busca com sucesso', async ({ page }) => {
    await expect(flightsPage.resultsContainer).toBeVisible();
    await expect(page).toHaveURL(/.*search|.*flights/);
  });

  test('deve validar se o resumo exibe a quantidade correta de passageiros', async () => {
    await expect(flightsPage.passengerSummary).toHaveText(/4 passageiros/i);
  });
});
