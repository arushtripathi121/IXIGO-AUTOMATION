Feature: Delhi Metro Booking

  Background: Login
  Given User should be logged in

  @metro
  Scenario: Book Delhi Metro ticket

    Given User open ixigo website
    When User opens trains sections
    And User opens running status page
    And User clicks on check live status
    And User selects train from suggestion
    And User clicks on check live status again
    And User opens Important Links
    And User opens Delhi Metro Route Map
    And User selects source metro station
    And User selects destination metro station
    And User selects number of tickets
    And User clicks on proceed to pay