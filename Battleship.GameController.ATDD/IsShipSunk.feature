Feature: IsShipSunk
	In order to show if ship is sunk
	to the user
	I want the game shows me a message

@mytag
Scenario: The ship has been completely sunk
	Given I have entered first position "A1"
	And I have entered second position "A2"
	And I have entered thrid position "A3"
	And I have entered fourth position "A4"
	And I have entered fifth position "A5"	
	When I check if the ships is sunk
	Then the IsShipSunk should be true
