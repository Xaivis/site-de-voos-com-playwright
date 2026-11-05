import { test, expect } from "@playwright/test";
import { vaiParaFinalizacao } from "../config/funcoes";
import { Finalizacao } from "../pages/finalizacao.page";
import { dadosReserva } from "../data/dados";

let finalizacao: Finalizacao;

test.beforeEach(async ({ page }) => {
  await vaiParaFinalizacao(page);
  finalizacao = new Finalizacao(page);  
});

test("deve confirmar reserva com dados corretos", async ({ page }) => {
  // 1. Confirmação do cabeçalho, etapa atual e referência
  const step = await finalizacao.flightSteps();
  await expect(step).toBeVisible();
  await expect(step).toHaveClass(/bg-primary/);

  // 2. Confirmação do sucesso da reserva
  const sucesso = finalizacao.sucess;
  await expect(sucesso).toHaveText(
    "Booking Confirmed!");
  await expect(sucesso).toBeVisible();

  // 3 . Confirmação do texto "Booking reference" e da referência (PNR)
  const texto1 = await finalizacao.textBox(/^Booking reference/);
  await expect(texto1).toBeVisible();
  await expect(texto1).toContainText('Booking reference');

  // 4. Dados dinâmicos e detalhes da reserva (vindos do fluxo de vaiParaFinalizacao)  
  const pnrUsavel = finalizacao.pnr;  
  await expect(pnrUsavel).toBeVisible();
  await expect(pnrUsavel).toHaveText(/^[A-Z0-9]{6,8}$/);

  // 5. Importando dados de reserva do arquivo dados.ts e realizando um laço com os dados para validação
  for (const dado of dadosReserva) {
    const elemento = dado.exato
      ? await finalizacao.textBoxExact(dado.valor)
      : await finalizacao.textBox(dado.valor);
    await expect(elemento).toBeVisible();
    await expect(elemento).toHaveText(dado.valor);
  }


  // 6. Botões clicáveis
  const reserveOutro = finalizacao.buttonR;
  await expect(reserveOutro).toBeEnabled();

  // 7. Navegação: ao clicar em "Book another flight", retorna para a etapa de busca
  await reserveOutro.click();
  await expect(finalizacao.search).toBeVisible();
});

// 8. Navegação: ao clicar em "Back to home page", retorna para a página inicial do site
test("botão voltar para home", async ({ page }) => {
  const botaoHome = finalizacao.buttonB;
  await expect(botaoHome).toBeEnabled();
  await expect(botaoHome).toBeVisible();
  await botaoHome.click();

  // 9. Validação da URL após clicar no botão "Back to home page"
  await expect(page).toHaveURL(finalizacao.url);
});
