process.env.SECRET = "TEST_SECRET";

const { server } = require("../../../../src/server"); // destructing assignment
const supertest = require("supertest");
const mockRequest = supertest(server);
const jwt = require("jsonwebtoken");

const { db, users } = require("../../../../src/models/index");

// before any of the test create a connection
beforeAll(async () => {
  await db.sync();
  await users.create({ username: "test", password: "test", role: "admin" });
});

// after all the tests are done
afterAll(async () => {
  await db.drop(); // drop the database tables
});

describe("Web server", () => {
  // Check if 404 is handled

  it("Should respond with hello world for home route", async () => {
    const response = await mockRequest.get("/");
    expect(response.text).toBe("hello world");
  });
  it("Should respond with 404 status on an bad route", async () => {
    const response = await mockRequest.get("/foo");
    expect(response.status).toBe(404);
  });
  it("Should respond with 404 status on an bad method", async () => {
    const response = await mockRequest.put("/food");
    expect(response.status).toBe(404);
  });
});

describe("food router", () => {
  it("can add a food", async () => {
    const user = { username: "test" };
    const token = jwt.sign(user, process.env.SECRET);

    const response = await mockRequest
      .post("/api/v2/food")
      .send({
        name: "banana",
        calories: 1.2,
        type: "fruit",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
  });

  // test if can read food
  it("can get all food", async () => {
    const user = { username: "test" };
    const token = jwt.sign(user, process.env.SECRET);
    const response = await mockRequest
      .get("/api/v2/food")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  // test if can read one food
  it("can get one food ", async () => {
    const user = { username: "test" };
    const token = jwt.sign(user, process.env.SECRET);
    const response = await mockRequest
      .get("/api/v2/food/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);

    // you can test the body object or any part of it
    // expect(response.body.message).toBe('pass!')
  });

  // test if can update a food
  it("can update a food record", async () => {
    const user = { username: "test" };
    const token = jwt.sign(user, process.env.SECRET);
    const response = await mockRequest
      .put("/api/v2/food/1")
      .send({
        name: "updated_banana",
        calories: 1.2,
        type: "fruit",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
  });

  // test if can delete a food
  it("can delete a food record", async () => {
    const user = { username: "test" };
    const token = jwt.sign(user, process.env.SECRET);
    const response = await mockRequest
      .delete("/api/v2/food/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});

describe("clothes router", () => {
  // test if can create a clothes
  it("can add a clothes", async () => {
    const user = { username: "test" };
    const token = jwt.sign(user, process.env.SECRET);
    const response = await mockRequest
      .post("/api/v2/clothes")
      .send({
        name: "T-shirt",
        color: "blue",
        size: "xt",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
  });

  // test if can read  clothes
  it("can get all clothes", async () => {
    const user = { username: "test" };
    const token = jwt.sign(user, process.env.SECRET);
    const response = await mockRequest
      .get("/api/v2/clothes")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  // test if can read one clothes
  it("can get one clothes ", async () => {
    const user = { username: "test" };
    const token = jwt.sign(user, process.env.SECRET);
    const response = await mockRequest
      .get("/api/v2/clothes/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);

    // you can test the body object or any part of it
    // expect(response.body.message).toBe('pass!')
  });

  // test if can update a clothes
  it("can update a clothes record", async () => {
    const user = { username: "test" };
    const token = jwt.sign(user, process.env.SECRET);
    const response = await mockRequest
      .put("/api/v2/clothes/1")
      .send({
        name: "T-shirt",
        color: "red",
        size: "xt",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
  });

  // test if can delete a clothes
  it("can delete a clothes record", async () => {
    const user = { username: "test" };
    const token = jwt.sign(user, process.env.SECRET);
    const response = await mockRequest
      .delete("/api/v2/clothes/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});
