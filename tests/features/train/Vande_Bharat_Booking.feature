Feature: Vande Bharat Booking
  Background: Login
    Given User should be logged in
  Scenario: Vande Bharat Booking
    Given start with "https://www.ixigo.com"
    When select train mode in dashboard
    And select vande bharat section
    And select any one specific Vande Bharat Train
    And check availability seat and book ticket to travel
    And enter traveller details and complete the payment
    Then payment page should appear successfully
