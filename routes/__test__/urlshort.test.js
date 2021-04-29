const request = require("supertest");
const app = require("../../app");

it("minifies a link", async () => {
  const url = "http://google.com";

  const response = await request(app).post("/api/shorturl/new").send({ url });

  expect(response.statusCode).toBe(200);

  const urlShort = response.body.url;

  const response2 = await request(app).get("/api/shorturl/" + urlShort);

  expect(response2.body.urlIniziale).toBe(url);
});
