# Hotel Wishlist and Offers Feature
# Tests wishlist functionality and offer code matching
# Verifies users can save hotels to wishlist and validate offer codes

Feature: Hotel Wishlist Functionality
  
  # Scenario 1: Wishlist functionality
  @Scenario1
  Scenario: Verify a logged-in user can save a hotel to their wishlist
    # User navigation flow
    Given the user is on the ixigo homepage
    When the user navigates to the "Hotels" section
    # Explore popular destinations
    And the user clicks on the 3rd card in the "Popular Destinations" section
    # Find and view hotel details
    And the user opens the first hotel from the search results
    # Save hotel to wishlist
    And the user saves the hotel using the Save icon
    # Navigate to wishlist and verify
    And the user navigates to the "Hotels Wishlist" from the Profile dropdown
    Then the saved hotel should be visible in "My Wishlist"

  # Scenario 2: Offer code validation
  @Scenario2
  Scenario: Verify offer code consistency for filtered hotel offers
    # Navigation setup
    Given the user is on the ixigo homepage
    When the user navigates to the "Hotels" section
    # Access offers section
    And the user clicks "View All" in the Offers For You section
    # Apply filters to refine offers
    And the user applies the "Hotels" category filter
    And the user applies the "Domestic" Journey Type filter
    And the user selects the first bank from Popular Banks
    # Extract offer code from list
    Then the user saves the offer code of the first offer and prints it
    # Navigate to offer details
    When the user clicks the "Details" button of the first offer
    # Verify code matches on details page
    Then the saved offer code should exactly match the code on the Offer Details page
