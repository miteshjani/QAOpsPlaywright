const { test, expect, request } = require("@playwright/test");
const { BannerUtils } = require("../utils/BannerUtils.js");
const eventCreationPayload = {
  title: "Pongal Celebration 14/01/2027",
  description: "Pongal Celebration 14/01/2027",
  category: "Festival",
  venue: "Marina Beach",
  city: "Chennai",
  eventDate: "2027-01-14T04:00:00.000Z",
  price: 100,
  totalSeats: 500,
};
