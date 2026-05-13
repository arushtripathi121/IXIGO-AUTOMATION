Feature: Train Platform Locator to Booking a ticket
    Background: Login
        Given User should be logged in
    Scenario Outline: From Train Platform Locator to Booking a Ticket
        Given load "https://www.ixigo.com/"
        When select train module in the dashboard
        And select train paltform locator option
        And enter train name or number to get desired results "<Train_name_or_number>"
        And click on search platform button
        And click on book button to particular station
        And change the date to travel on desired date
        And apply some filters to get desired results to book ticket
        And select the available class and coach you want to travel
        And proceed with payment process
        Then payment page should visible successfully

        Examples:
            | Train_name_or_number |
            | 20103                |
            | xyz123               |
