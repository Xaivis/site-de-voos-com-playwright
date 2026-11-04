import { Page, Locator } from "@playwright/test";

export class Finalizacao {
  readonly page: Page;
  readonly steps: Locator;
  readonly sucess: Locator;
  readonly textBook: Locator;
  readonly pnr: Locator;
  readonly button: Locator;
  readonly search: Locator;

  constructor(page: Page) {
    this.steps = page.getByTestId("flight-steps");
    this.sucess = page.getByTestId("flight-booking-success");
    this.textBook = page.getByText(/^Booking reference/);
    this.pnr = page.getByTestId("flight-pnr");
    this.button = page.getByRole("button", { name: /book another flight/i });
    this.search = page.getByTestId("flight-search");
  }

  async flightSteps() {
    return this.steps.getByText(/Done/i);
  }

  async textBoxExact(name: string) {
    return this.page.getByText(name, { exact: true });
  }

  async textBox(name: string) {
    return this.page.getByText(name);
  }
}
