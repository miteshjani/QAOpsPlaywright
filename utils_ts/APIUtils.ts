export class APIUtils {
  apiContext: any;
  loginPayload: string;

  constructor(apiContext: any, loginPayload: string) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload },
    );
    const loginResponseJSON = await loginResponse.json();
    const token = loginResponseJSON.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayload: string) {
    let response = { token: String, orderId: String };
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      },
    );

    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);
    const orderId = orderResponseJSON.orders[0];
    response.orderId = orderId;
    return response;
  }
}
