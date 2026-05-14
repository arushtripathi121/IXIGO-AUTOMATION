Feature: Bus booking flow

    Background: Login
    Given User should be logged in

    @busSearch
    Scenario Outline: Search buses with valid routes
        Given I open the bus booking page "https://www.ixigo.com/buses"
        When I search buses with data from "<search_data>"
        Then the search should be successful
        
        Examples:
            | search_data          |
            | valid_search         |

    @busSearchNegative
    Scenario Outline: Search buses with invalid routes
        Given I open the bus booking page "https://www.ixigo.com/buses"
        When I search buses with invalid data from "<search_data>"
        Then the search should show an error message

        Examples:
            | search_data          |
            | invalid_search       |

    @busFilters
    Scenario: Apply bus filters and verify count changes
        Given I open the bus booking page "https://www.ixigo.com/buses"
        When I search buses with data from "valid_search"
        When I reload the page
        And I select price filter
        And I select seats filter
        And I select rating filter
        And I set price range to 1200 and 3000
        Then the number of buses should change after applying bus type filters
        When I select all departure times
        And I select arrival time filter
        And I select departure time filter
        And I open seat selection
        And I select 1 available seats
        And I select boarding point
        And I select dropping point
        And I continue to payment
        Then I am on the payment page

    @busFiltersNegative
    Scenario: Apply highly restrictive filters resulting in no buses
        Given I open the bus booking page "https://www.ixigo.com/buses"
        When I search buses with data from "valid_search"
        When I reload the page
        And I select price filter
        And I select seats filter
        And I select rating filter
        And I select arrival time filter
        And I select departure time filter
        And I set price range to 1200 and 1200
        And I apply bus type filters
        And I select all departure times
        Then no buses should be found

    @busPayment
    Scenario Outline: Submit passenger details
        Given I open the bus booking page "https://www.ixigo.com/buses"
        When I search buses with data from "valid_search"
        When I reload the page
        And I open seat selection
        And I select 1 available seats
        And I select boarding point
        And I select dropping point
        And I continue to payment
        Then I enter passenger details using data "<passenger_data>"
        
        Examples:
            | passenger_data           |
            | default_passenger        |

    @busPaymentNegative
    Scenario Outline: Submit invalid passenger details
        Given I open the bus booking page "https://www.ixigo.com/buses"
        When I search buses with data from "valid_search"
        When I reload the page
        And I open seat selection
        And I select 1 available seats
        And I select boarding point
        And I select dropping point
        And I continue to payment
        Then I attempt to enter passenger details using invalid data "<passenger_data>"
        And the payment should show a validation error
        
        Examples:
            | passenger_data           |
            | blank_details_passenger  |