Feature: Shopping Cart
  As a logged in shopper
  I want to add products to my cart
  So that I can purchase them later

  Scenario: Adding a product updates the cart badge
    Given Marisa is logged in
    When she adds the "backpack" to her cart
    Then the cart badge should show "1" item
