# TypeScript Express app for CI

## API Endpoints

### 1) Health Check

```text
GET /health
```

Response:

```json
{ "status": "ok" }
```

---

### 2) Echo Message

```text
GET /api/v1/echo?msg=hello
```

Response:

```json
{ "echo": "hello" }
```

---

### 3) Sum Numbers

```text
POST /api/v1/sum
```

Body:

```json
{ "a": 2, "b": 3 }
```

Response:

```json
{ "sum": 5 }
```

Invalid input returns HTTP 400.

---

## Setup Instructions

### 0) Environment Configuration

Rename `.env.example` to `.env` in the project root, then set the desired port number:

```text
PORT=3000
```

### 1) Prerequisites

- Node.js v18+ (recommended v20)
- npm

Check versions:

```bash
node -v
npm -v
```

---

### 2) Install Dependencies

```bash
npm install
```

---

### 3) Run Lint

```bash
npm run lint
```

Fails if ESLint rules are violated.

---

### 4) Check Formatting

```bash
npm run format:check
```

Auto-fix formatting:

```bash
npm run format
```

---

### 5) Run Unit Tests (Local)

```bash
npm test
```

Note: Because this project uses Node ESM (`type: module`), Jest runs using Node VM modules.

---

### 6) Run CI Tests (Coverage + Reports)

```bash
npm run test:ci
```

Generates:

```text
coverage/
reports/junit.xml
```

Includes coverage thresholds and CI-ready artifacts.

---

### 7) Build the Application

```bash
npm run build
```

Compiled output appears in:

```text
dist/
```

---

### 8) Run the Application (Development)

```bash
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

Stop server with:

```text
Ctrl + C
```

---

### 9) Run Production Build

```bash
npm run build
npm start
```

---
