import { Given, When, Then } from "@cucumber/cucumber";
import commonPage from "../pageobjects/common.page";
import LoginPage from "../pageobjects/login.page";
import DashboardPage from "../pageobjects/dashboard.page"
import AllureReporter from "@wdio/allure-reporter";
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import dashboardPage from "../pageobjects/dashboard.page";

Given(/^User is on the login page$/, async() => {

  commonPage.openLoginPage();
  //commonPage.vaerifyPageHeading()
  //console.log("Login page title is"+ title);
});

  When(/^Enter "([^"]*)" and "([^"]*)"$/, async (username, password) => {
    //  genricFunc.waitUntillTextToPresent(pageObjectLocators.username);
      //await browser.pause(10000);
      await LoginPage.login(username,password);
             
  });

  Then(/^Validate is user is logged in with "([^"]*)" credentials$/, async(type) => {
    
    if (type === "valid")
        {

        await LoginPage.checkIfDashboardOpen();
        await browser.pause(2000);
        //await LoginPage.logOut();
    }
    else{ 
        await (LoginPage.errorMsg).waitForExist();
        const errMsg = await LoginPage.errorMsg.getText();
        cucumberJson.attach("Error message displayed as: "+errMsg);
        AllureReporter.addStep("error : "+errMsg);
        console.log(errMsg);
    } 
} );

Then(/^verify by default Acute Care module should be selected$/, async() =>{
    await DashboardPage.verifyAcuteCareActive();
});

Then(/^Waiting room tab should be opened$/, async() => {
  await DashboardPage.verifyWaitingRoomOpened();
});


Then(/^user should be able to see list of patient sorted on the basis of Time of last call from latest to oldest$/, async() =>{
  await DashboardPage.verifyPatientListVisible();
  //await DashboardPage.verifyTimeOfLastCallSorted();
  //await browser.pause(2000);
  //await LoginPage.logOut();
});

Given(/^user is logged in as "([^"]*)" and "([^"]*)"$/, async(username, password) =>{
  await commonPage.openLoginPage();
  await LoginPage.login(username,password);
  await LoginPage.checkIfDashboardOpen();
});

When(/^the user clicks on a case$/, async ()=>{
   await DashboardPage.clickOnCase();
});

Then(/^clicks on more icon$/, async() =>{
 await DashboardPage.clickOnMoreIcon();
});

Then(/^click on Assign to another provider$/, async() =>{
 await DashboardPage.clickOnAssignToAnotherDoc();
});

Then(/^user will see list of all provider credentialed with that site$/, async() => {
 await DashboardPage.getProvidersList();
});

Then(/^when user click on Assign button the case should get assigned to selected provider$/, async() =>{
 await DashboardPage.clickOnAssign();
 await DashboardPage.verifyUserAssignedtoDoc();
});

When(/^user clicks on search button$/, async() =>{
await DashboardPage.clickOnSearchIcon();
});

Then(/^enters the patient name "([^"]*)" to be searched$/, async(value) =>{
await DashboardPage.enterPatientName(value);
});

Then(/^verify if "([^"]*)" list displayed as "([^"]*)"$/, async(search, value) =>{
await DashboardPage.verifySearchedPatientVisible(search, value);
});

When(/^user clicks on "([^"]*)"$/, async (button)=> {
await commonPage.clickOnOption(button);
});

Then(/^wait for data to load$/, async() =>{
await commonPage.waitForDataToLoad();
});

Then(/^click on button "([^"]*)"$/, async(button) =>{
await commonPage.clickOnBtn(button);
});

Then(/^Verify if case log updated$/, async() =>{
await commonPage.verifyCaseLogUpdated();
});

Then(/^Verify if updated case is displayed in "([^"]*)"$/, async(tab) =>{
await commonPage.verifyCaseIsDisplayed(tab);
});

Then(/^edit "([^"]*)" for a patient$/, async(time) =>{
  await DashboardPage.clickOnCase();
  await DashboardPage.getpatientName();
  await DashboardPage.clickOnEditBtn();
  await commonPage.updateTime(time);
});