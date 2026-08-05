const request = require("supertest");
const app = require("../server");
const database = require("../db/connect");

beforeAll(async () => {
  await database.initializeDatabase();
});

afterAll(async () => {
  await database.closeDatabase();
});

describe("Interviews API", () => {
  test("GET /interviews should return status 200", async () => {
    const response = await request(app).get("/interviews");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /interviews/:id should return one interview", async () => {
    const response = await request(app).get(
      "/interviews/6a73718cbbfe340e4c31fbf1"
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.interviewerName).toBe("Sarah Johnson");
  });
});