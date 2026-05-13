Feature: Ixigo Train Booking

  Background: Login
  Given User should be logged in

  @book
  Scenario Outline: Book train from source to destination
    Given User opens ixigo trains page
    When User enters source station "<source>"
    And User selects source station "<source>" and "<sourceCode>"
    And User enters destination station "<destination>"
    And User selects destination station "<destination>" and "<destinationCode>"
    And User selects departure date "<date>"
    And User clicks search button
    Then User should navigate to train search page
    And User applies AC filter
    And User selects first available train
    And User clicks on book button
    And click on add passenger
    And User enters passenger details "<name>" and "<age>"
    And User selects gender "<gender>"
    And User selects berth preference "<berth>"
    And User saves passenger details
    # And user chooses first passenger
    And User closes popup
    And User clicks proceed to pay
    Then User selects no refund option
    Examples:
      | source | sourceCode | destination | destinationCode | date | name    | age | gender | berth       |
      | Kharar | KARR       | New Delhi   | NDLS            | 20   | Tamanna | 21  | F      | Window Side |


  @negative
  Scenario Outline: Invalid source station

    Given User opens ixigo trains page
    When User enters source station "<invalidSource>"
    Then User should see no station results

    Examples:
      | invalidSource |
      | AAAAA         |
      | TEST123       |


  @negative
  Scenario Outline: Invalid destination station

    Given User opens ixigo trains page
    When User enters destination station "<invalidDestination>"
    Then User should see no station results

    Examples:
      | invalidDestination |
      | ZZZZZ              |
      | XYZ123             |


  @negative
  Scenario: Search without selecting source and destination

    Given User opens ixigo trains page
    When User clicks search button
    Then User should see validation message