Feature: Registering a new user

Scenario: The user is not registered in the root directory of the website
  Given An unregistered user
  When I fill the data in the form
  And click the sign in button 
  Then The main menu screen is shown