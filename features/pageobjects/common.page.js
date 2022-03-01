import AllureReporter from "@wdio/allure-reporter";
import DashboardPage from "../pageobjects/dashboard.page"
import cucumberJson from 'wdio-cucumberjs-json-reporter';
class commonPage {

  /*  get Option(button){
      return $(`//li/span[text()='${button}']`);
  }

  get Btn(btn){
    return $(`//button[text()='${btn}']`);
  } */

  //const  Btn = "//li/span[text()='  ']";
  
  async openLoginPage(){
      await browser.url('https://synapse.dev.mysevaro.com/');
      AllureReporter.addStep("Nevigating to login page");
      console.log("Nevigating to url");
      //var title = browser.getTitle();
      //console.log(title);
     // return title;
    
  }

  vaerifyPageHeading = async (title) => {
    await browser.waitUntil(
      async () => (await browser.getTitle()) === title,
      {
        timeout: 10000,
        timeoutMsg: "expected text is different after 10s",
      }
    );
    const headingTitle = await browser.getTitle();
    expect(await headingTitle.toEqual(title));
  };

  async clickOnOption(button){
    await $(`//li/span[text()='${button}']`).waitForExist();
    await $(`//li/span[text()='${button}']`).click();
  }

  async clickOnBtn(btn){
    await $(`//button[text()='${btn}']`).waitForDisplayed(5000);
    await $(`//button[text()='${btn}']`).click();
  }

  async waitForDataToLoad(){
    await browser.pause(5000);
      await DashboardPage.patientsList[0].waitForDisplayed(20000);
      //await browser.pause(2000);
  }

  async verifyCaseLogUpdated(){
    await DashboardPage.assignMsg.waitForDisplayed();
    await expect(DashboardPage.assignMsg).toHaveTextContaining("Case Log Updated");
    const msg = await DashboardPage.assignMsg.getText();
    cucumberJson.attach(msg);
    
  }

  async updateTime(time){
    await $(`(//input[@id='${time}']/following::input)[1]`).waitForDisplayed();
    await $(`(//input[@id='${time}']/following::input)[1]`).setValue("03");
    await $(`(//input[@id='${time}']/following::input)[2]`).setValue("15");
  }

  async verifyCaseIsDisplayed(tab){
    await browser.pause(15000);
    //await commonPage.clickOnOption("Waiting for Final Rec");
    await this.waitForDataToLoad();
    //await commonPage.clickOnOption("Incomplete Notes");
    await browser.pause(2000);
    expect (await $(`//div[text()=' ${this.patient_name} ']`)).toBeDisplayed();
    cucumberJson.attach("User "+this.patient_name+" is displayed in "+tab);
  }
}
export default new commonPage();
