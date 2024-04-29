Feature: Starting an entire game

Scenario: A non-logged user wants to play an entire game (Kiwi Quest gamemode)
    Given A non-logged user in the main menu
    When Clicking the button to start a new game (Kiwi Quest gamemode)
    
    And Waiting for the question to load 
    And Checking user is on round 1/9
    And Clicking on a random answer
    And Sending the answer
    
    And Waiting for the question to load 
    And Checking user is on round 2/9
    And Clicking on a random answer
    And Sending the answer
    
    And Waiting for the question to load 
    And Checking user is on round 3/9
    And Clicking on a random answer
    And Sending the answer
    
    And Waiting for the question to load 
    And Checking user is on round 4/9
    And Clicking on a random answer
    And Sending the answer
    
    And Waiting for the question to load 
    And Checking user is on round 5/9
    And Clicking on a random answer
    And Sending the answer
    
    And Waiting for the question to load 
    And Checking user is on round 6/9
    And Clicking on a random answer
    And Sending the answer
    
    And Waiting for the question to load 
    And Checking user is on round 7/9
    And Clicking on a random answer
    And Sending the answer
    
    And Waiting for the question to load 
    And Checking user is on round 8/9
    And Clicking on a random answer
    And Sending the answer
    
    And Waiting for the question to load 
    And Checking user is on round 9/9
    And Clicking on a random answer
    And Sending the answer
    

    Then The user statistics are shown

