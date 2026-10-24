import { test, expect } from '@playwright/test';
import { vaiParaSelecaoVoos, vaiParaFinalizacao, vaiParaPagamento, vaiParaSelecaoPassageiros } from '../config/funcoes';

test('Teste End-to-End no site de testes https://www.qapractice.com/flight-booking-scenarios',{
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
    
    // testes realizados nesta página de procura dos voos(clara)

    // testes realizados nesta página de seleção de voos(guilherme)
    await vaiParaSelecaoVoos(page);

    // testes realizados nesta página de escolha de passageiros(Vanderson)
    await vaiParaSelecaoPassageiros(page);

    // testes realizados nesta página de pagamento(Emily)
    await vaiParaPagamento(page);

    // testes realizados nesta página de finalização
    await vaiParaFinalizacao(page);

});