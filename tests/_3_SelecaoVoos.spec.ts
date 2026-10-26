
import { test, expect } from '@playwright/test';

// Valida se os filtros estão visíveis
test('Verificar funcionalidades para Seleção de voos', async ({ page }) => {
  await page.goto('https://www.qapractice.com/flight-booking-scenarios');

  await test.step('Verificar se o ordenar por está visível', async () => {
    await expect(page.locator('#flight-sort')).toBeVisible();
  });

  await test.step('Verificar se as companhias aéreas estão visíveis', async () => {
    await expect(page.locator('#flight-filter-airline')).toBeVisible();
  });
});

// Valida o botão Selecionar
test('Testar clique no botão Selecionar', async ({ page }) => {
  await page.goto('https://www.qapractice.com/flight-booking-scenarios');

  await test.step('Verificar se o botão Selecionar está visível', async () => {
    await expect(page.getByTestId('flight-select-AL248')).toBeVisible();
  });

  await test.step('Clicar no botão Selecionar', async () => {
    await page.getByTestId('flight-select-AL248').click();
  });
});

// Valida o avanço para a próxima etapa
test('Testar avanço para a etapa de passageiros', async ({ page }) => {
  await page.goto('https://www.qapractice.com/flight-booking-scenarios');

  await test.step('Verificar se o botão para próxima etapa está visível', async () => {
    await expect(page.getByTestId('flight-continue-to-passengers')).toBeVisible();
  });

  await test.step('Clicar no botão para próxima etapa', async () => {
    await page.getByTestId('flight-continue-to-passengers').click();
  });

  await test.step('Validar avanço para a etapa de passageiros', async () => {
    await expect(page.getByTestId('flight-steps')).toContainText('Passageiros');
  });
});


// Teste End to End
test('Filtrando opções e selecionando o vôo desejado', async ({ page }) => {
  await page.goto('https://www.qapractice.com/flight-booking-scenarios'); 

  
await test.step('Selecionar ordenação de baixo a alto', async () => {
  await page.getByTestId('flight-sort').selectOption('price-asc');
});

await test.step('Filtrar pela companhia aérea BlueJet', async () => {
  await page.getByTestId('flight-filter-airline').selectOption('BlueJet');
});


await test.step('Selecionar voo de ida', async () => {
  await page.getByTestId('flight-select-BJ211').click();
});

await test.step('Selecionar voo de volta', async () => {
  await page.getByTestId('flight-select-BJ311').click();
});

await test.step('Avançar para a próxima etapa', async () => {
  await page.getByTestId('flight-continue-to-passengers').click();
});


});
  
