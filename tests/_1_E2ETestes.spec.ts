import { test, expect } from '@playwright/test';
import { vaiParaFinalizacao } from '../config/funcoes';

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

    await vaiParaFinalizacao(page);
    // Validação essencial do sucesso:
    await expect(page.getByTestId('flight-booking-success')).toContainText('Booking Confirmed');
    await expect(page.getByTestId('flight-pnr')).toBeVisible();


});