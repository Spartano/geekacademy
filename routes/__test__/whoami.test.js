const request = require("supertest");
const app = require("../../app");

it("show user agent", async () => {
  const response = await request(app).get("/api/whoami");

  expect(response.statusCode).toBe(200);
});
