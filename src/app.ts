import express from "express";
import type { Request, Response } from "express";

const app = express();

const unused = 123;

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/v1/echo", (req: Request, res: Response) => {
  const msg = (req.query.msg as string | undefined) ?? "";
  res.status(200).json({ echo: msg });
});

app.post("/api/v1/sum", (req: Request, res: Response) => {
  const { a, b } = req.body as { a?: unknown; b?: unknown };

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({
      error: "Invalid input. Expected JSON body: { a: number, b: number }"
    });
  }

  res.status(200).json({ sum: a + b });
});

export { app };
