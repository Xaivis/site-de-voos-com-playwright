import { Page, Locator } from "@playwright/test";

export class Selecao {
  readonly sort: Locator;
  readonly filter: Locator;
  readonly select248: Locator;
  readonly select211: Locator;
  readonly continue: Locator;

  constructor(page: Page) {
    this.sort = page.locator("#flight-sort");
    this.filter = page.locator("#flight-filter-airline");
    this.select248 = page.getByTestId("flight-select-AL248");
    this.select211 = page.getByTestId("flight-select-BJ211");
    this.continue = page.getByTestId("flight-continue-to-passengers");
  }

  async clicarNosCampos() {
    await this.sort.selectOption('price-asc')
    await this.filter.selectOption('BlueJet')
    await this.select248.click()
    await this.select211.click()
    await this.continue.click()

  }
}