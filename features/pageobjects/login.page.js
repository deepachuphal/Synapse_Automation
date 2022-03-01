import AllureReporter from "@wdio/allure-reporter";
import cucumberJson from 'wdio-cucumberjs-json-reporter';

class LoginPage {
  // WebElement Locators

  get signInLogo(){
    return $('//h2[contains(text(),"Sign In")]')
}
get signInBtn(){
    return $('#okta-signin-submit');
}

get userNameTxtBox(){
    return $('#okta-signin-username'); 
}

get upasswordTxtBox(){
    return $('#okta-signin-password');
}
get dashboardContainer() {
    return $('.container-fluid');
}

get welcomeLogo(){
    return $('//h2[contains(text(),"Welcome back")]');
}

get errorMsg(){
    return $('//div[contains(@class,"error")]/p');
}
get user(){
  return $('//span[contains(text(),"Chetan Joshi")]');
}

get logOutBtn(){
  return $('//span[text()="Logout"]');
}





  // Actions
  async  navigateToLoginPage(){
    await this.signInBtn.click();
}

async login(username, password){
  await this.userNameTxtBox.setValue(username);
  cucumberJson.attach("Usenname entered as: "+username);
  //AllureReporter.addStep("Usenname entered as: "+username);
  await this.upasswordTxtBox.setValue(password);
  //AllureReporter.addStep("Password entered as: "+password);
  cucumberJson.attach("Password entered as: "+password);
  await this.signInBtn.click();
  cucumberJson.attach("Clicked on Sign In Button");

}

async checkIfDashboardOpen() {
  await (this.dashboardContainer).waitForExist();
  expect(this.welcomeLogo).toBeDisplayed;
  cucumberJson.attach("Dashboard opened successfully");
}

   async logOut() {
    await this.user.waitForEnabled(5000);
    await this.user.click();
    await browser.pause(1000);
    await this.logOutBtn.click();
    await browser.pause(5000);
    console.log("Sign In Button Is Clicked");
    cucumberJson.attach("User logged out");
    
  } 
}
export default new LoginPage();
