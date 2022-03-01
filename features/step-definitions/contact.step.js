import { Given, When, Then } from "@cucumber/cucumber";
import HomePage from "../pageobjects/login.page";
import commonPage from "../pageobjects/common.page";
import DashboardPage from "../pageobjects/dashboard.page";

Given(/^I am on the contact page$/, async () => {
  await expect(HomePage.link_Contact).toBePresent();
  await HomePage.link_Contact.click();
  await commonPage.vaerifyPageHeading("CUSTOMER SERVICE - CONTACT US");
});

Given(/^I send refund request to customer care for prev. order$/, async () => {
  await conatctPage.sendMessageToCustomerCare();
});
