import { test, expect } from '@playwright/test';
import { ProcuraPage } from '../pages/procura.page';



test('Verificar campo de retorno', async ({ page }) => {
    const procura = new ProcuraPage(page);  
    // procura é o objeto (instância) da classe 
    // a classe ProcuraPage contém os métodos

    await test.step('Acessar a página de reservas de voos', async () => {
        await procura.acessarPagina();
        // por meio do objeto chamamos o método
    });

    await test.step('Verificar se a data de retorno está visível', async () => {
        await expect(procura.dataRetorno).toBeVisible();
    });

    await test.step('Marcar a opção de viagem só de ida', async () => {
        await procura.selecionarViagemIda();
    });

    await test.step('Verificar se a data de retorno ficou oculta', async () => {
        await expect(procura.dataRetorno).toBeHidden();
    });
});

test('Validar campos obrigatórios', async ({ page }) => {
    const procura = new ProcuraPage(page);

    await test.step('Acessar a página de reservas de voos', async () => {
        await procura.acessarPagina();
    });

    await test.step('Clicar em buscar voos sem preencher os campos', async () => {
        await procura.buscarVoos();
    });

    // Aqui vamos verificar as mensagens de validação
});

test('Impedir origem e destino iguais', async ({ page }) => {
    const procura = new ProcuraPage(page);

    await test.step('Acessar a página de reservas de voos', async () => {
        await procura.acessarPagina();
        
    });

    await test.step('Selecionar a mesma cidade na origem e no destino', async () => {
        await procura.selecionarOrigem('New York');
        await procura.selecionarDestino('New York');
    });

    await test.step('Clicar em buscar voos', async () => {
        await procura.buscarVoos();
    });

    // Aqui vamos verificar a mensagem de erro
});

test('Preencher todos os campos de Search Flights', async ({ page }) => {
    const procura = new ProcuraPage(page);

    await test.step('Acessar a página de reservas de voos', async () => {
        await procura.acessarPagina();
    });

    await test.step('Preencher os campos de busca', async () => {
        
        await procura.selecionarOrigem('New York');
        await procura.selecionarDestino('London');
        await procura.preencherDataPartida('2026-11-10');
        await procura.preencherDataRetorno('2026-11-20');
        await procura.preencherPassageiros('2');
        await procura.selecionarClasse('Business');
     });


    await test.step('Clicar no botão de buscar voos', async () => {
        await procura.buscarVoos();
    });
   
    await test.step('Validar que os resultados dos voos foram exibidos', async () => {
        await procura.verificarResultados();
        await expect(procura.resultados).toBeVisible();
    });


});