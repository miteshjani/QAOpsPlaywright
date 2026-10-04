const { expect } = require("@playwright/test");

class BannerUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
      { data: this.loginPayload },
    );
    const loginResponseJSON = await loginResponse.json();
    const token = loginResponseJSON.token;
    console.log(token);
    return token;
  }

  async getEventDetailsResponse() {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.get(
      "https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12",
      {
        headers: {
          Authorization: "Bearer " + response.token,
          Accept: "application/json, text/plain, */*",
        },
      },
    );
    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);
    const eventId = orderResponseJSON.data[0].id;
    response.eventId = eventId;
    return response;
  }

  async createBookings(eventBookingPayload) {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://api.eventhub.rahulshettyacademy.com/api/bookings",
      {
        data: eventBookingPayload,
        headers: {
          Authorization: "Bearer " + response.token,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      },
    );
    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);
    const bookingId = orderResponseJSON.data.id;
    const eventId = orderResponseJSON.data.event.id;
    response.bookingId = bookingId;
    response.eventId = eventId;
    return response;
  }

  async createEvent(eventCreatePayload) {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://api.eventhub.rahulshettyacademy.com/api/events",
      {
        data: eventCreatePayload,
        headers: {
          Authorization: "Bearer " + response.token,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      },
    );
    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);
    const eventId = orderResponseJSON.data.id;
    const eventTitle = orderResponseJSON.data.title;
    response.eventId = eventId;
    response.eventTitle = eventTitle;
    return response;
  }
}
module.exports = { BannerUtils };
