Feature: Preventing wrong user creation

  Scenario: The user is not registered in the site and tries to create an account
    Given An unregistered user
    When I fill the data in the form with a wrong email format and press submit
    Then Log in screen shows an informative error message and does not allow the user to log in