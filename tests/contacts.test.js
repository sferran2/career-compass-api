const request = require("supertest");
const app = require("../server");
const database = require("../db/connect");

beforeAll(async () => {
  await database.initializeDatabase();
});

afterAll(async () => {
  await database.closeDatabase();
});

describe("Contacts API", () => {
  test("GET /contacts should return status 200", async () => {
    const response = await request(app).get("/contacts");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /contacts/:id should return one contact", async () => {
    const response = await request(app).get(
      "/contacts/6a737009db601c5eec989aea"
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.firstName).toBe("Laura");
  });
});