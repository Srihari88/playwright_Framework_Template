// @ts-check
const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/homepage");
import { logTestName, logToFile } from '../utils/logger';
import fs from "fs";
const credentials = JSON.parse(fs.readFileSync("utils/credentials.json", "utf8"))


test.describe("SauceLabs Tests to Add Items in the cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");  //,{waitUntil:"commit"}
  });

  test.afterEach(async ({ page }: any, testInfo: { title: any; }) => {
    logTestName(testInfo);
  });

  test("Complete End to End flow for Checkout from login to completeing the order ", { tag: '@smoketest' }, async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.verifyPageTitle();
    await homepage.loginWithValidCredentials(credentials.standard_username, credentials.standard_password);
    await homepage.clickOnSubmitButton();
    await homepage.verifyUserLoggedInSuccessfully()
    logToFile('****** LoggedIn Successful ******');
    await homepage.addItemToCart('Sauce Labs Backpack');
    logToFile('****** Added Sauce Labs Backpack******');
    await homepage.addItemToCart('Sauce Labs Bike Light');
    logToFile('****** Added Sauce Labs Bike Light******');
    await homepage.addItemToCart('Sauce Labs Bolt T-Shirt');
    logToFile('****** Added Sauce Labs Bolt T-Shirt******');
    await homepage.clickOnTheCartButton()
    logToFile('****** Item Added on Cart ******');
    await homepage.verifyUserLandedOnTheCartPage()
    logToFile('****** Verified QTY, Description and Your Cart text on Cart page ******');
    await homepage.verifyItmesOnCart()
    logToFile('****** Verified Added Items on Cart such as Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt ******');
    await homepage.clickOncheckoutButton()
    logToFile('****** Click on the Checkout button ******');
    await homepage.verifyCheckoutInformationForum()
    logToFile('****** Entered all necessary information on the checkout page ******');
    await homepage.verifyCheckoutOverViewPage()
    logToFile('Verified Checkout page ');
    await homepage.verifyprice()
    logToFile('******Price Verified ****** ');
    await homepage.clickOnFinishButton()
    logToFile('****** Clicked on Finish Button ****** ');
    await homepage.VerifyOrderCompletePage()
    logToFile('****** Verified Order completed page ****** ');
    await homepage.clickOnBackToHomePage()
    logToFile('****** Test Completeed ****** ');

  });

});
