Feature: Ecommerce validations
    @Regression
  Scenario Outline: Placing the Order
    Given a login to Ecommerce application with "miteshjani90@ymail.com" and "Test@123"
    When Add "<productname>" to Cart
    Then Verify "<productname>" is displayed in the Cart
    When Enter valid details and Place the order
    Then Verify order in present in OrderHistory

    Examples:
    | username              | password    | productname  |
    |miteshjani90@ymail.com | Test@123    | ZARA COAT 3  |
   

   @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username              | password    |
    |miteshjani90@ymail.com | Test@123    |
    |hello@123.com          | Iamhello@12 |