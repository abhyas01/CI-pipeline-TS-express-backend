import request from "supertest";
import { app } from "../src/app";

describe("API", () => {
  it("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("GET /api/v1/echo echoes msg", async () => {
    const res = await request(app).get("/api/v1/echo").query({ msg: "hi" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ echo: "hi" });
  });

  it("GET /api/v1/echo defaults to empty string", async () => {
    const res = await request(app).get("/api/v1/echo");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ echo: "" });
  });

  it("POST /api/v1/sum returns sum", async () => {
    const res = await request(app).post("/api/v1/sum").send({ a: 2, b: 3 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ sum: 5 });
  });

  it("POST /api/v1/sum returns 400 for invalid body", async () => {
    const res = await request(app).post("/api/v1/sum").send({ a: "2", b: 3 });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid input/i);
  });
});
