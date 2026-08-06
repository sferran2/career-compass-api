const request = require("supertest");
const app = require("../server");
const database = require("../db/connect");

beforeAll(async () => {
  await database.initializeDatabase();
});

afterAll(async () => {
  await database.closeDatabase();
});

describe("Companies API", () => {
  test("GET /companies should return status 200", async () => {
    const response = await request(app).get("/companies");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /companies/:id should return one company", async () => {
    const response = await request(app).get(
      "/companies/6a6abbbdc4a66a122543b9ed"
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe("Tech Solutions Inc.");
  });
});