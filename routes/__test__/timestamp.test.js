const request = require("supertest");
const app = require("../../app");

it("creates a timestamp utc", async () => {
  const body = { data: "2015-12-25" };

  const response = await request(app).post("/api/timestamp/utc").send(body);

  expect(response.statusCode).toBe(200);
  expect(response.body.utc).toBe("Fri, 25 Dec 2015 00:00:00 GMT");
  expect(response.body.unix).toBe(1451001600000);
});
