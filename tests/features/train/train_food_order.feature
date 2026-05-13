Feature: Train Food Order
    Background: Login
        Given User should be logged in
    Scenario: Order food on train
        Given navi to "https://www.ixigo.com/"
        When select train section on dashboard
        And click on Order food on train section
        And enter valid PNR number "<PNR>"
        And select any one of hotels
        And add some filters to sort out desired  results
        And select meals to Order
        And click on next button
        And enter passengers name "<Name>"
        And enter contact details "<Contact>"
        And select payment method
        And click on continue button
        Then payment page should load successfull

        Examples:
            | PNR        | Name       | Contact    |
            | 2834441160 | Praburam M | 6383604912 |
            | 1234567890 | John Doe   | 1234567890 |