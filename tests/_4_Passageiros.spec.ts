import { test } from '@playwright/test';
import { vaiParaSelecaoPassageiros } from '../config/funcoes';
import { PassageirosPage } from '../pages/passageiros.page';

let passageiros: PassageirosPage;

test.beforeEach(async ({ page }) => {
    await vaiParaSelecaoPassageiros(page);
    passageiros = new PassageirosPage(page);
});

test('Verificar campos de passageiro', async () => {
    await passageiros.verificarCamposPassageiro();
});

test('Preencher dados do passageiro e avançar para o pagamento', async () => {
    // 1. Preenchimento dos dados do passageiro
    await passageiros.preencherDadosPassageiro('Ada Lovelace', 'ada@example.com', '+15550100');

    // 2. Confirma que os valores ficaram nos campos
    await passageiros.verificarDadosPreenchidos('Ada Lovelace', 'ada@example.com', '+15550100');

    // 3. Avança para a próxima etapa e valida que os campos de pagamento apareceram
    await passageiros.clicarContinuar();
    await passageiros.verificarAvancoParaPagamento();
});

test('Verificar e-mail inválido', async () => {
    await passageiros.preencherDadosPassageiro('Ada Lovelace', 'ada.example.com', '+15550100');
    await passageiros.clicarContinuar();

    // Com e-mail inválido não deve avançar para o pagamento
    await passageiros.verificarQueNaoAvancou();
});

test('Impedir avanço com campos vazios', async () => {
    await passageiros.clicarContinuar();
    await passageiros.verificarQueNaoAvancou();
});
