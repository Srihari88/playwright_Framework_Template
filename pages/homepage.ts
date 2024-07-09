// @ts-check
import { Locator, Page, expect } from "@playwright/test";
import { initializeLogFile, logToFile } from '../utils/logger';

// Initialize the log file for logging
initializeLogFile();

export class HomePage {
  // Define locators for various elements on the page
  readonly Username: Locator;
  readonly Password: Locator;
  readonly login: Locator;
  readonly cart: Locator;
  readonly addToCart: Locator;
  readonly backToProduct: Locator;
  readonly shoppingBadge: Locator;
  readonly cartpage: Locator;
  readonly AddeditmesTitles: Locator;
  readonly checkoutButton: Locator;
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly zipcode: Locator;
  readonly checkoutInformaition: Locator;
  readonly continue: Locator;
  readonly checkoutOverview: Locator;
  readonly summaryInfo: Locator;
  readonly inventeryprice: Locator;
  readonly finish: Locator;
  readonly ordercomplete: Locator;
  readonly backtoHomeButton: Locator;


  constructor(readonly page: Page) {

    // Initialize locators using Playwright's locator strategies
    this.Username = page.getByTestId("username");
    this.Password = page.getByTestId("password")
    this.login = page.getByTestId("login-button")
    this.cart = page.getByTestId("shopping-cart-link")
    this.backToProduct = page.getByTestId('back-to-products')
    this.addToCart = page.getByTestId("add-to-cart")
    this.shoppingBadge = page.locator('#shopping_cart_container')
    this.cartpage = page.locator('cart_contents_container')
    this.AddeditmesTitles = page.locator('[class="cart_item_label"] a')
    this.checkoutButton = page.getByTestId('checkout')
    this.firstname = page.getByTestId('firstName')
    this.lastname = page.getByTestId('lastName')
    this.zipcode = page.getByTestId('postalCode')
    this.checkoutInformaition = page.getByText('Checkout: Your Information')
    this.continue = page.getByTestId('continue')
    this.checkoutOverview = page.getByText('Checkout: Overview')
    this.summaryInfo = page.locator('.summary_info')
    this.inventeryprice = page.locator('.inventory_item_price')
    this.finish = page.getByTestId('finish')
    this.ordercomplete = page.locator('#checkout_complete_container')
    this.backtoHomeButton = page.getByTestId('back-to-products')
  }

  // Verify HomePage loaded successfully
  async verifyPageTitle() {
    await expect(this.page).toHaveTitle('Swag Labs')
    logToFile('Navigated to https://www.saucedemo.com/ and Verified the title');
    await expect(this.page).toHaveURL('https://www.saucedemo.com/')
    logToFile('Redirected to Web Page Url');
  }

  // Login with valid user credentials

  async loginWithValidCredentials(_uname: any, _upass: any) {
    expect(this.Username).toBeVisible();
    expect(this.Username).toBeEnabled();
    expect(this.Username).toBeAttached();
    await this.Username.fill(_uname);
    logToFile(`"Entered Username",${_uname}`);
    expect(this.Username).toHaveValue(_uname);
    expect(this.Username).toBeFocused();
    expect(this.Password).toBeVisible();
    expect(this.Password).toBeEnabled();
    expect(this.Password).toBeAttached();
    await this.Password.fill(_upass);
    logToFile(`"Entered Password for ",${_uname} :sGiven User`);
  }

  // Click on the login submit button
  async clickOnSubmitButton() {
    expect(this.login).toBeVisible();
    expect(this.login).toBeEnabled();
    expect(this.login).toBeAttached();
    expect(this.login).toHaveText('Login');
    await this.login.click();
    logToFile(`Click on the Submit button`);
  }

  // Verify user logged in successfully
  async verifyUserLoggedInSuccessfully() {
    expect(this.cart).toBeVisible();
    expect(this.cart).toBeEnabled();
    expect(this.cart).toBeAttached();
    logToFile(`Verified Logged in Successful`);
  }

  // Add an item to the cart based on the item name
  async addItemToCart(itemName: any) {
    const item = this.page.locator(`text=${itemName}`).first();
    await this.page.waitForTimeout(2000)
    await item.click();
    await this.addToCart.click()
    await this.backToProduct.click()
  }

  // Verify the user landed on the cart page
  async verifyUserLandedOnTheCartPage() {
    expect(this.page.getByText('Your Cart')).toHaveText('Your Cart')
    expect(this.page.getByText('QTY')).toHaveText('QTY')
    expect(this.page.getByText('Description')).toHaveText('Description')
  }


  // Verify items on the cart page
  async verifyItmesOnCart() {
    const ExpectedAddedItems: string[] = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ]

    const ActualAddedItems: string[] = []

    let product_names = await this.page.$$('[class="cart_item_label"] a')

    for (const prod of product_names) {
      const added_product_items = await prod.textContent()
      if (added_product_items !== null) {
        ActualAddedItems.push(added_product_items.trim());
        console.log(added_product_items);
      }
    }

    for (const expectedItem of ExpectedAddedItems) {
      if (!ActualAddedItems.includes(expectedItem)) {
        throw new Error(`Expected item ${expectedItem} not found in cart`);
      }
    }


  }
  // Click on the cart button
  async clickOnTheCartButton() {
    await this.page.waitForTimeout(2000)
    expect(this.cart).toBeVisible()
    expect(this.cart).toBeEnabled()
    await this.shoppingBadge.click()
  }

  // Log test name
  async logTestName(testInfo: { title: any; }) {
    console.log(`Test completed: ${testInfo.title}`);
  }

  // Click on the checkout button
  async clickOncheckoutButton() {
    expect(this.checkoutButton).toBeVisible();
    expect(this.checkoutButton).toBeEnabled();
    expect(this.checkoutButton).toBeAttached();
    expect(this.checkoutButton).toHaveText('Checkout');
    await this.checkoutButton.click();
    logToFile(`Clicked on Checkout button`);
  }

  // Verify the checkout information form
  async verifyCheckoutInformationForum() {
    expect(this.checkoutInformaition).toHaveText('Checkout: Your Information')
    await this.firstname.fill('Srihari')
    await this.lastname.fill('Naidu')
    await this.zipcode.fill('10012')
    expect(this.continue).toBeVisible()
    expect(this.continue).toBeAttached()
    expect(this.continue).toHaveText('Continue')
    await this.continue.click()

  }
  // Verify the checkout overview page
  async verifyCheckoutOverViewPage() {
    expect(this.checkoutOverview).toBeVisible()
    expect(this.checkoutOverview).toHaveText('Checkout: Overview')
    expect(this.summaryInfo).toBeVisible()
    expect(this.summaryInfo).toContainText('Payment Information')
    expect(this.summaryInfo).toContainText('Shipping Information')
    expect(this.summaryInfo).toContainText('Price Total')
    expect(this.summaryInfo).toContainText('Item total')
    expect(this.summaryInfo).toContainText('Tax')

  }
  // Verify the price of items in the cart
  async verifyprice() {

    let items_price: string[] = []

    let product_prices = await this.page.$$('[class="inventory_item_price"]')

    for (const prod of product_prices) {
      const priceText = await prod.textContent()
      if (priceText !== null) {
        items_price.push(priceText);
        console.log(priceText);
      }
    }
    const total = items_price
      .map(priceText => parseFloat(priceText.replace('$', '')))
      .reduce((total, num) => total + num, 0);
    console.log(`The total sum is: $${total.toFixed(2)}`);

    const expectedPriceText = await this.page.locator('[class="summary_subtotal_label"]').innerText()

    const expectedPriceMatch = expectedPriceText.match(/\$([\d,.]+)/);

    if (!expectedPriceMatch) {
      throw new Error(`Failed to extract expected price from text: "${expectedPriceText}"`);
    }

    const expectedPrice = parseFloat(expectedPriceMatch[1].replace(',', ''));

    if (total !== expectedPrice) {
      throw new Error(`Expected total price to be $${expectedPrice}, but got $${total.toFixed(2)}`);
    }


  }
  // Click on the finish button to complete the checkout
  async clickOnFinishButton() {
    expect(this.finish).toBeVisible()
    expect(this.finish).toBeEnabled()
    expect(this.finish).toBeAttached()
    expect(this.finish).toHaveText('Finish')
    await this.finish.click()

  }

  // Verify the order complete page
  async VerifyOrderCompletePage() {
    expect(this.ordercomplete).toBeVisible()
    expect(this.ordercomplete).toBeEnabled()
    expect(this.ordercomplete).toBeAttached()
    expect(this.ordercomplete).toContainText('Thank you for your order!')
    expect(this.ordercomplete).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')

  }

  async clickOnBackToHomePage() {
    expect(this.backtoHomeButton).toBeVisible()
    expect(this.backtoHomeButton).toBeEnabled()
    expect(this.backtoHomeButton).toBeAttached()
    await this.backtoHomeButton.click()
  }

}
