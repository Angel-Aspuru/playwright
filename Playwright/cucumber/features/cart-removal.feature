Feature: Cart Management
  As a shopper
  I want to remove items from my cart
  So that I only purchase what I actually want

  Scenario: Removing an item empties the cart
    Given Marisa has added the "jacket" to her cart
    When she removes the "jacket" from her cart
    Then her cart should be empty
