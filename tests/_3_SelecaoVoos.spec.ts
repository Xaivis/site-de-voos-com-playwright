
import { test, expect } from '@playwright/test';
import { vaiParaSelecaoPassageiros, vaiParaSelecaoVoos} from '../config/funcoes';
import { Selecao } from '../pages/selecao.page';

// Valida se os filtros estão visíveis
test('Verificar funcionalidades para Seleção de voos', async ({ page }) => {
  await vaiParaSelecaoVoos(page);

  await test.step('Verificar se o ordenar por está visível', async () => {
    await expect(page.locator('#flight-sort')).toBeVisible();
  });

  await test.step('Verificar se as companhias aéreas estão visíveis', async () => {
    await expect(page.locator('#flight-filter-airline')).toBeVisible();
  });
});

// Valida o botão Selecionar
test('Testar clique no botão Selecionar', async ({ page }) => {
  await vaiParaSelecaoVoos(page);

  const selecao = new Selecao(page);

  await test.step('Verificar se o botão Selecionar está visível', async () => {
    await expect(selecao.select248).toBeVisible();
  });

  await test.step('Clicar no botão Selecionar', async () => {
    await selecao.select248.click();
  });
});

// Valida o avanço para a próxima etapa
test('Testar avanço para a etapa de passageiros', async ({ page }) => {
  await vaiParaSelecaoVoos(page);

  const selecao = new Selecao(page);

  await test.step('Selecionar voo de ida', async () => {
    await selecao.select211.click();
  });

  await test.step('Verificar se o botão para próxima etapa está visível', async () => {
    await expect(selecao.continue).toBeVisible();
  });

  await test.step('Clicar no botão para próxima etapa', async () => {
    await selecao.continue.click();
  });

  await test.step('Acessar a seleção de passageiros', async () => {
    await vaiParaSelecaoPassageiros(page);
  });
});

// Teste End to End
test('Filtrando opções e selecionando o voo desejado', async ({ page }) => {
  await vaiParaSelecaoVoos(page);

  const selecao = new Selecao(page);

  await test.step('Filtrar opções e selecionar voo desejado', async () => {
    await selecao.clicarNosCampos();
  });

  await test.step('Acessar a seleção de passageiros', async () => {
    await vaiParaSelecaoPassageiros(page);
  });
});


