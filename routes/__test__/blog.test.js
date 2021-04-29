const request = require("supertest");
const app = require("../../app");

it("creates a timestamp", async () => {
  // Create three blogs
  const data = { title: "luigi", body: "luigi bros", snippet: "luigi" };
  const response = await request(app).post("/blogs").send(data);
  expect(response.statusCode).toBe(302);

  const blogs = await Blog.find();

  expect(blogs.length).toBe(1);
});
