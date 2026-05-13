# Hotel Booking and Validation Feature
# Tests the complete hotel booking flow for registered users
# Including search, filtering, sorting, booking, and payment navigation

Feature: Hotel Booking and Validation
  

  # As a registered user of Ixigo
  # I want to be able to search for hotels and book a room
  # So that I can successfully complete my hotel reservation
  # Setup: Ensure user is logged in and on home page
  Background: Login
  Given User should be logged in

  # Positive scenario: Complete successful hotel booking flow
  Scenario: Verify successful hotel booking flow for a registered user
    When the user loads test data for "TC01_Positive"
    And the user clicks on "Hotels"
    And the user enters Destination, Check-in Date, Check-out Date, Room and Guests
    And the user clicks on the "Search" button
    Then the user should see the search results
    When the user applies the filters: Best Price Guarantee and Free Cancellation
    And the user sorts the results by "Price Low to High"
    And the user opens the first Hotel Card
    And the user clicks on "Reserve 1 Room"
    And the user enters Guest Details including Salutation, First Name, Last Name, Email, Mobile, and Nationality
    And the user clicks on "Pay Now"
    Then the user should successfully reach the payment page

  # Negative scenario: Search should be blocked when destination is empty
  Scenario: Verify search is blocked when destination is empty
    When the user loads test data for "TC02_Negative_EmptyDestination"
    And the user clicks on "Hotels"
    And the user enters Destination, Check-in Date, Check-out Date, Room and Guests
    Then the user clicks on "Search" and should be blocked
