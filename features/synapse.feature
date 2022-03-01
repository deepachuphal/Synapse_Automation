
Feature: Automate test cases for Synapse module
  
  @sanity
  Scenario Outline: User SignIn with "<type>" credentials
    Given User is on the login page
    When Enter "<username>" and "<password>"
    Then Validate is user is logged in with "<type>" credentials
    Then verify by default Acute Care module should be selected
    And Waiting room tab should be opened
    And user should be able to see list of patient sorted on the basis of Time of last call from latest to oldest

     Examples:
      | username | password             | type    |
      | chetan@ziggletech.com | HaG^wXAI93 | valid    |
     | deepa@ziggletech.com  | 7xM0G3fDXLKQ  | invalid |
  | chetanzzz@ziggletech.com | HaG^wXAI93 | invalid    |


  @sanity
  Scenario Outline: User SignIn with "<type>" credentials
    Given User is on the login page
    When Enter "<username>" and "<password>"
    Then Validate is user is logged in with "<type>" credentials

     Examples:
      | username | password             | type    |
      | deepa@ziggletech.com  | 7xM0G3fDXLKQ  | invalid |
      | chetanzzz@ziggletech.com | HaG^wXAI93 | invalid |


    @sanity
    Scenario Outline:Assign a case to another doctor
        Given user is logged in as "<username>" and "<password>"
        When the user clicks on a case
        Then clicks on more icon
        Then click on Assign to another provider 
        Then user will see list of all provider credentialed with that site
        And when user click on Assign button the case should get assigned to selected provider 
        #And provider should receive a text SMS with caselog link

        Examples:
      | username | password             |
      | chetan@ziggletech.com | HaG^wXAI93 |



    @sanity
    Scenario Outline:Verify the search
        Given user is logged in as "<username>" and "<password>"
        When user clicks on search button
        Then enters the patient name "<value>" to be searched
        Then verify if "<search>" list displayed as "<value>" 

        Examples:
      | username | password             |   value |search|
      | chetan@ziggletech.com | HaG^wXAI93 | Chetan     |patient|
      | chetan@ziggletech.com | HaG^wXAI93 | 6452574     |MRN|

    @sanity11
    Scenario Outline:Update "<time>" time for <case>
        Given user is logged in as "chetan@ziggletech.com" and "HaG^wXAI93"
        When user clicks on <case>
        Then user clicks on "<tab1>"
        And wait for data to load
        Then user clicks on "<tab2>"
        And wait for data to load
        Then user clicks on "<tab1>"
        And wait for data to load
        Then edit "<time>" for a patient
        Then click on button "Save as draft " 
        And Verify if case log updated
        When user clicks on <case>
        Then user clicks on "<tab2>"
        And Verify if updated case is displayed in "<tab2>"

      Examples:
      |     case        |    time                   |      tab1       |     tab2          |             
      #|  " Emergent "  | finalEDRecommendationTime|Waiting for Final Rec| Incomplete Notes |
      | " Non Emergent "| finalEDRecommendationTime|Waiting for Final Rec| Incomplete Notes |
      | " Stroke Alert "| finalEDRecommendationTime|Waiting for Final Rec| Incomplete Notes |
      #| " Stroke Alert "| patientCTReturn         |Waiting for CT        | Returned from CT|

      Scenario Outline:Update TIME PATIENT RETURNED FROM CT (CST) for <tab>
        Given user is logged in as "chetan@ziggletech.com" and "HaG^wXAI93"
        When user clicks on <tab>
        Then user clicks on "Waiting for CT"
        And wait for data to load
        Then user clicks on "Returned from CT"
        And wait for data to load
        Then user clicks on "Waiting for CT"
        And wait for data to load
        Then edit "patientCTReturn" for a patient
        Then click on button "Save as draft " 
        And Verify if case log updated
        When user clicks on <tab>
        Then user clicks on "Waiting for CT"
        And Verify if updated case is displayed in "Waiting for CT"

      Examples:
      | tab | 
      #|  " Emergent "  |
      |   " Stroke Alert "  |
