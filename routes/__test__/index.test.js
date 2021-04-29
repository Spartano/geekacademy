const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const Blog = require("../../model/Blog");

const buildBlog = async () => {
  const blog = new Blog({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "mario",
    body: "mario bros",
    snippet: "mario",
  });
  await blog.save();

  return blog;
};

it("fetches blogs", async () => {
  // Create three blogs
  const ticketOne = await buildBlog();
  const ticketTwo = await buildBlog();
  const ticketThree = await buildBlog();

  const response = await request(app).get("/blogs");
  expect(response.statusCode).toBe(200);
  const blogs = await Blog.find();

  expect(blogs.length).toBe(3);
});

it("creates a blog", async () => {
  // Create three blogs
  const data = { title: "luigi", body: "luigi bros", snippet: "luigi" };
  const response = await request(app).post("/blogs").send(data);
  expect(response.statusCode).toBe(302);

  const blogs = await Blog.find();

  expect(blogs.length).toBe(1);
});

it("deletes a blog", async () => {
  const blog = await buildBlog();

  const response = await request(app).delete("/blogs/" + blog.id);
  expect(response.statusCode).toBe(200);

  const deletedBlog = await Blog.findById(blog.id);
  expect(deletedBlog).toBe(null);
});
