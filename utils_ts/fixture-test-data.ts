import { test as baseTest } from "@playwright/test";

interface TestDataForOrder {
  userName: string;
  password: string;
  productName: string;
}

export const customTest = baseTest.extend<{
  testDataForOrder: TestDataForOrder;
}>({
  testDataForOrder: {
    userName: "miteshjani90@ymail.com",
    password: "Test@123",
    productName: "ZARA COAT 3",
  },
});
