const request = require("supertest");
const app = require("../server");
const database = require("../db/connect");

beforeAll(async () => {
  await database.initializeDatabase();
});

afterAll(async () => {
  await database.closeDatabase();
});

describe("Applications API", () => {
  test("GET /applications should return status 200", async () => {
    const response = await request(app).get("/applications");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  test("GET /applications/:id should return one application", async () => {
    const response = await request(app).get("/applications/6a735c759eaa44e729a4b083");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.jobTitle).toBe("Backend Developer");
  });
});