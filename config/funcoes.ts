import { Page } from "@playwright/test";

export async function vaiParaSelecaoVoos(page: Page) {
    await page.goto('');
    await page.getByTestId('flight-from').selectOption('New York');
    await page.getByTestId('flight-to').selectOption('London');
    await page.getByTestId('flight-departure-date').fill('2026-08-01');
    await page.getByTestId('flight-one-way').check();   // hides the return date
    await page.getByTestId('flight-search').click();
    await page.waitForURL('**/flight-booking-scenarios');
};

export async function vaiParaSelecaoPassageiros(page: Page) {
    await vaiParaSelecaoVoos(page);
    await page.getByTestId('flight-sort').selectOption('price-asc');
    await page.getByTestId('flight-select-GW100').click();
    await page.getByTestId('flight-continue-to-passengers').click();
    await page.waitForURL('**/flight-booking-scenarios');
}

export async function vaiParaPagamento(page: Page) {
    await vaiParaSelecaoPassageiros(page);
    await page.getByTestId('flight-passenger-name').fill('Ada Lovelace');
    await page.getByTestId('flight-passenger-email').fill('ada@example.com');
    await page.getByTestId('flight-passenger-phone').fill('+15550100');
    await page.getByTestId('flight-continue-to-payment').click();
    await page.waitForURL('**/flight-booking-scenarios');
}

export async function vaiParaFinalizacao(page: Page) {
    await vaiParaPagamento(page);
    await page.getByTestId('flight-card-number').fill('4111111111111111');
    await page.getByTestId('flight-expiry').fill('12/30');
    await page.getByTestId('flight-cvv').fill('123');
    await page.getByTestId('flight-book').click();
    await page.waitForURL('**/flight-booking-scenarios');
} 