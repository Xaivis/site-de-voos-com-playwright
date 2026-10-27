import { test, expect } from '@playwright/test';

test.describe('Fluxo de Busca de Voos - 4 Passageiros', () => {

  test('Deve realizar a busca de passagens aéreas para 4 passageiros com sucesso', async ({ page }) => {
    // 1. Acessa a página principal do site de voos
    await page.goto('/');

    // 2. Clica no campo/botão de seleção de passageiros para abrir o menu dropdown
    // Substitua o seletor abaixo pelo ID, classe ou texto real do seu projeto
    await page.locator('button:has-text("Passageiros")').click();

    // 3. Adiciona passageiros até completar 4 (exemplo iterando cliques no botão de "+" de Adultos)
    // Caso o site permita digitar o valor diretamente, você pode usar await page.fill()
    const botaoAdicionarAdulto = page.locator('button.inc-adultos'); // Ajuste o seletor conforme o projeto
    
    // Supondo que comece com 1 passageiro por padrão, clicamos 3 vezes para somar 4
    for (let i = 0; i < 3; i++) {
      await botaoAdicionarAdulto.click();
    }

    // 4. Fecha ou confirma a seleção de passageiros (se houver botão de "Confirmar" ou "Concluído")
    await page.locator('button:has-text("Confirmar")').click();

    // 5. Preenche os dados de Origem e Destino (exemplo)
    await page.fill('input[name="origin"]', 'São Paulo (GRU)');
    await page.fill('input[name="destination"]', 'Rio de Janeiro (GIG)');

    // 6. Clica no botão de buscar voos
    await page.locator('button[type="submit"]:has-text("Buscar")').click();

    // 7. Validação (Assert): Verifica se a página de resultados carregou e exibe os voos
    await expect(page.locator('.flight-results-container')).toBeVisible();
    
    // Opcional: Validar se o resumo da busca exibe explicitamente 4 passageiros
    await expect(page.locator('.summary-passengers')).toContainText('4 passageiros');
  });

});

//Adicionando o teste de 4 passageiros
