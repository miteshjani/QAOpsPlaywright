const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    userName: "miteshjani90@ymail.com",
    password: "Test@123",
    productName: "ZARA COAT 3",
  },
});
