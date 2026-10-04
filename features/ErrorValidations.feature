Feature: Ecommerce validations
  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username              | password    |
    |miteshjani90@ymail.com | Test@123    |
    |hello@123.com          | Iamhello@12 |