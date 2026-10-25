import { test, expect} from '@playwright/test';
import { vaiParaSelecaoVoos, vaiParaFinalizacao, vaiParaPagamento, vaiParaSelecaoPassageiros } from '../config/funcoes';

test('Teste End-to-End no site de testes https://www.qapractice.com/flight-booking-scenarios', {
    annotation: [
        {
            type: '📢 Boas-vindas',
            description: 'Bem vindo ao exercício do Curso de Testes de Software sobre o teste do site de voos.'
        },
        {
            type: '🔍 Procura dos voos',
            description: 'testes realizados pela Clara.'
        },
        {
            type: '✈️ Seleção dos voos',
            description: 'testes realizados pelo Guilherme.'
        },
        {
            type: '👥 Escolha dos passageiros',
            description: 'testes realizados pelo Vanderson.'
        },
        {
            type: '💳 Pagamento',
            description: 'testes realizados pela Emily.'
        },
        {
            type: '✅ Finalização',
            description: 'testes realizados pelo ivis.'
        }
    ]
}, async ({ page }) => {

    await test.step('Procura dos voos - Clara', async () => {
        // Testes e preenchimento dos campos de busca

        await test.step('Verificar se a data de retorno está visível', async () => {
            await expect(page.locator('#flight-return-date')).toBeVisible();
        });

        await test.step('Verificar se a data de retorno ficou oculta', async () => {
            await expect(page.locator('#flight-return-date')).toBeHidden();
        });



        await test.step('Seleção dos voos - Guilherme', async () => {
            await vaiParaSelecaoVoos(page);
            // Coloque aqui o que você está testando nesta etapa:
            // await expect(page.getByText('Voo 123')).toBeVisible();
        });
        await test.step('Escolha dos passageiros - Vanderson', async () => {
            await vaiParaSelecaoPassageiros(page);
            // Testes dos dados dos passageiros
        });
        await test.step('Pagamento - Emily', async () => {
            await vaiParaPagamento(page);
            // Testes de dados de pagamento
        });
        await test.step('Finalização - Ivis', async () => {
            await vaiParaFinalizacao(page);
            // Testes da tela de sucesso / voucher
        });
    });
});