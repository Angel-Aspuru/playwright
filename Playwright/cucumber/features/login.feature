Feature: Login
  As a shopper
  I want to log into the store
  So that I can see the available products

  Scenario: Standard user logs in successfully
    Given Marisa is on the login page
    When she logs in with username "standard_user" and password "secret_sauce"
    Then she should see the products page
