import { Page, Locator } from "@playwright/test";

export class Finalizacao {
  readonly page: Page;
  readonly steps: Locator;
  readonly sucess: Locator;
  readonly pnr: Locator;
  readonly buttonR: Locator;
  readonly buttonB: Locator;
  readonly search: Locator;
  readonly url: string = "https://www.qapractice.com/";

  constructor(page: Page) {
    this.page = page;
    this.steps = page.getByTestId("flight-steps");
    this.sucess = page.getByTestId("flight-booking-success");
    this.pnr = page.getByTestId("flight-pnr");
    this.buttonR = page.getByRole("button", { name: /book another flight/i });
    this.buttonB = page.getByRole("button", { name: /back to home page/i });
    this.search = page.getByTestId("flight-search");
  }

  async flightSteps() {
    return this.steps.getByText(/Done/i);
  }

  async textBoxExact(name: string) {
    return this.page.getByText(name, { exact: true });
  }

  async textBox(name: string | RegExp) {
    return this.page.getByText(name);
  }
}
