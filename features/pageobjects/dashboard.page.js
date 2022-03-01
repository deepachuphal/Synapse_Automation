import LoginPage from "../pageobjects/login.page";
import commonPage from "../pageobjects/common.page";
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import utils from '../utils/Utils'
class DashboardPage {
  static patient_name = "";
  get timeOfLastCall() {
    return $$(".inner-col-1 .content-box .icon-show span");
  }

  get patientsList() {
    return $$(".inner-col-3 .content-box");
    //patient-name div
  }

  get MRN(){
    return $(".inner-col-4 .content-box");
  }

  get dropdownOrderReference() {
    return $(".selector span+select[name='id_order']");
  }

  get acuteCare() {
    return $("//li[@class='active']/child::span"); 
  }

  get waitingRoom() {
    return $("//span[text()=' Waiting Room ']/parent::li[contains(@class,'active')]");
  }

  get moreIcon(){
    return $("//span[contains(@class,'ellipsis')]/parent::button");
  }

  get editBtn(){
    return $("//span[contains(@class,'uil-edit')]/parent::button");
  }

  get assignToAnthorDoc(){
    return $("//a[text()='Assign to another provider']");
  }

  get assignBtn(){
    return $("(//button[contains(text(),'Assign')])[2]")
  }

  get assignMsg(){
    return $(".toast-title");
  }
  /* get providerList(){
    return $$("(//tr['${i}']/td[1])[2]")
  } */

  get searchIcon(){
    return $("//img[contains(@class,'search-icon')]/parent::a");
  }

  get searchBar(){
    return $("//input[contains(@placeholder,'Search')]");
  }

  get emergent(){
    return $("//li/span[text()=' Emergent ']");
  }

  get nonEmergent(){
    return $("//li/span[text()=' Non Emergent ']");
  }

  get waitingForFinalRec(){
    return $("//span[contains(text(),'Waiting for')]");
  }

  get incompleteNotes(){
    return $("//span[contains(text(),'Incomplete Notes')]");
  }

  get allConsults(){
    return $("//span[contains(text(),'All')]");
  }

  get HH(){
    return $("(//input[@id='finalEDRecommendationTime']/following::input)[1]");
  }
  //input[@id='patientCTReturn']/following::input)[1]

  get MM(){
    return $("(//input[@id='finalEDRecommendationTime']/following::input)[2]");
  }

  get patientName(){
    return $("h4.patient-name");
  }

  //Actions
async verifyAcuteCareActive(){
   
  expect(await this.acuteCare).toHaveTextContaining("ACUTE CARE");
  cucumberJson.attach("Acute Care is selected by default");
}

async verifyWaitingRoomOpened(){

 expect(await this.waitingRoom).toHaveTextContaining("Waiting Room") ;
 //cucumberJson.attach("Waiting room is opened");
}


async verifyTimeOfLastCallSorted(){
    //const callTimes = [];
    for(let i=0;i<4;i++){
       if (await this.timeOfLastCall[i].getText() >await this.timeOfLastCall[i+1].getText() && i==3){
         cucumberJson.attach("Last recieved calls are sorted in decendimg order");
       }
       else if(await this.timeOfLastCall[i].getText() < await this.timeOfLastCall[i+1].getText())
       cucumberJson.attach("Last recieved calls are not sorted");
       
    }
 
}

async verifyPatientListVisible(){
  //const callTimes = [];
  await browser.pause(3000);
  for(let i=0;i<4;i++){
    console.log("#####---------");
      const patient = await this.patientsList[i].getText();
      console.log("#####---------"+patient);
      if(patient.length===0)
      cucumberJson.attach("Patient No."+i+1+" :"+patient +"and patient name is missing");
      else
       cucumberJson.attach("Patient No."+i+1+" :"+patient);
     }
    }

    async verifySearchedPatientVisible(search, value){
      //const callTimes = [];
      await browser.pause(5000);
      await this.patientsList[0].waitForDisplayed(8000);
      await browser.pause(2000);
      if(search === "patient"){
      for(let i=0;i<4;i++){
        console.log("#####---------");
          let patient = await this.patientsList[i].getText();
          //await console.log("#####---------"+this.patientsList[i].getText());
          await expect(this.patientsList[i]).toHaveTextContaining(value);
          //cucumberJson.attach("Patient No."+i+1+" :"+patient +"and patient name is missing");
           cucumberJson.attach("Patient No."+(i+1)+" :"+patient);
           //await LoginPage.logOut();
         }
        }
        else{
          await expect(this.MRN).toHaveTextContaining(value);
          cucumberJson.attach("MRN searched is displayed as: "+this.MRN.getText());
        }
        }
  async clickOnCase(){
  await browser.pause(5000);
  await this.patientsList[0].waitForExist();
  expect( this.patientsList[0]).toBeDisplayed();
  await this.patientsList[0].click();
}

async clickOnMoreIcon(){
  expect(await this.moreIcon).toBePresent();
  await this.moreIcon.click();
}

async clickOnEditBtn(){
  expect(await this.editBtn).toBePresent();
  await this.editBtn.click();
}

async clickOnAssignToAnotherDoc(){
  await expect(this.assignToAnthorDoc).toBePresent();
  await this.assignToAnthorDoc.click();
  //await this.browser.pause(5000);
}

async getProvidersList(){
  await browser.pause(5000);
  const providerList = [];
  for(let i=0; i<3;i++){
     providerList[i] = await $(`(//tr[${i+1}]/td[1])[2]`).getText();
     console.log(providerList[i]);
    cucumberJson.attach("Provider no."+(i+1)+": "+providerList[i]);
  }
 // cucumberJson.attach("Provider list: "+providerList);

}

async clickOnAssign(){
  await this.assignBtn.waitForEnabled();
  this.assignBtn.click();
}

async clickOnSearchIcon(){
  await this.searchIcon.waitForEnabled();
  this.searchIcon.click();
}

async verifyUserAssignedtoDoc(){
  await this.assignMsg.waitForDisplayed();
  const msg = this.assignMsg.getText();
  cucumberJson.attach(msg);
  await expect(this.assignMsg).toHaveTextContaining("Case Log Updated");
  
}

async enterPatientName(value){
  await this.searchBar.setValue(value);
}
  sendMessageToCustomerCare = async () => {
    await this.drpdownSubjectHeading.selectByVisibleText("Customer service");

    await expect(await this.inputEmailAddress.getValue()).toEqual(
      utils.staticData.email
    );

    await this.dropdownOrderReference.selectByIndex(1);

    await this.inputMessage.setValue(
      "Hi There,\n" +
      "I got some issue with my product which i bought yesterday.Can you please help me with refund the amount!\n" +
      "Thanks"
    );

    await this.btnSubmit.click();
  }

  async getpatientName(){
    await this.patientName.waitForDisplayed();
    this.patient_name = await this.patientName.getText();
    console.log("######-------"+this.patient_name);
    //return patientName;
  }

}

export default new DashboardPage();
