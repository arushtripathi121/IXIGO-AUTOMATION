Feature: Train PNR Booking Flow

Background: Login
Given User should be logged in

@pnr
Scenario Outline: Check PNR and proceed for booking
Given User opens ixigo website
When User opens trains section
And User opens PNR status page
And User enters PNR number "<pnr>"
And User clicks on check PNR status "<pnr>"
Then User takes screenshot of passenger ticket
When User checks running status
Then User takes screenshot of running status
When User goes back to previous page
And User opens train schedule
And User opens availability section
And User selects journey date
And User clicks on PNR book button
And User clicks on add passenger
And User adds passenger details "<name>" "<age>"
And user choose first passenger
Then User proceeds to payment page
And User closes the popup


Examples:
| pnr        | name    | age |
| 4234567890 | TAMANNA | 22  |
|4           |Tamanna Singh|21| 