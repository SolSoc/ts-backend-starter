# TypeScript Backend Starter

A minimal, flexible **TypeScript backend starter** for building RESTful APIs with Express and Zod — without locking you into databases, ORMs, or external services you may later replace.

This repository defines **structure, conventions, and boundaries**, not hard dependencies.

---

## ✨ Features

- **TypeScript-first**
- **Express** for HTTP handling
- **Zod** for API request validation
- **dotenv** for environment configuration
- **Custom JWT-based auth** (implemented per project)
- **Centralized error handling**
- **Structured logging with Winston**
- **Clear separation of concerns**
- **No decorators, no annotations**
- **No forced database or ORM**

---

## 📁 Project Structure

```
src/
├── app.ts                 # Application entry point
├── constants.ts           # Environment variables & global constants
├── routes/                # Express routers (mounted under /api)
├── models/                # Zod schemas for API requests
├── services/              # Internal services & external integrations
├── database/              # Persistence layer (implementation defined per project)
├── utils/
│   ├── logger.ts          # Winston logger
│   └── errors.ts          # Internal error classes
```

### Structural Principles

- **`app.ts` is the single entry point**
- **All routes are mounted under `/api`**
- **Routes use named exports (never default exports)**
- **One global error handler**
- **Every folder exposes an `index.ts`**
- **No framework magic or reflection**
- **Add only what the project actually needs**

---

## 🌐 API Design

- Fully **RESTful**
- JSON-only responses
- All responses follow a discriminated union defined in:

```
src/models/api.schema.ts
```

Routes:

- Validate input using Zod
- Return success responses
- Forward errors using `next(error)`

---

## 🧪 Validation with Zod

- All API **request** validation is done with Zod
- Schemas live in `src/models`
- Naming convention: `*.schema.ts`
- Schemas are named after routes

Example:

```
/api/markets → models/markets.schema.ts
```

Zod is the source of truth for request shape and parsing.

---

## 🧠 Database Folder (Flexible by Design)

The `src/database/` folder is intentionally **unopinionated**.

- Use it to implement **any persistence layer**
- Organize it based on the needs of the project
- Keep persistence concerns isolated from routes and services

This starter does **not** force a database, ORM, or schema style.

---

## 🔐 Environment Variables

This project uses **dotenv** for environment configuration.

### Setup

1. Copy the example environment file:

   ```
   mv .env.example .env
   ```

2. Open `.env` and populate it with values appropriate for your environment.

### Guidelines

- `.env` files should **never** be committed to version control
- `.env.example` serves as the **contract** for required configuration
- All environment variables should be:

  - read in `src/constants.ts`
  - exported as named constants
  - imported elsewhere in the application (avoid direct `process.env` access)

---

## 🧰 Logging

- Uses **Winston**
- Logger is a factory and instantiated per file
- Each file should have a uniquely named logger

Example:

```ts
const logger = Logger("user-router");
```

This keeps logs traceable and easy to filter.

---

## ❌ Error Handling

- Errors are defined as **classes**
- Internal errors live in `src/utils/errors.ts`
- **Exactly one** global error handler lives in `app.ts`
- Services and database layers throw errors
- Routes only forward errors with `next(error)`

The global error handler:

- logs the error
- maps it to an API error response
- handles validation errors
- defaults unknown failures to server errors

---

## 📜 Scripts

Standard scripts included in every backend project:

```json
{
  "build": "rm -rf dist/ && tsc",
  "prestart": "npm run build",
  "start": "node dist/app.js",
  "dev": "node --import tsx --watch -r ts-node/register src/app.ts",
  "prepublishOnly": "npm run build && npm run docs",
  "tests": "jest"
}
```

---

## 🤖 AI-Assisted Development

This repository includes a **prompt file for AI-assisted development**:

```
.github/backend.md
```

### What this file is for

- It defines **canonical backend rules and conventions**
- It is intended to be used as a **system prompt** for AI tools
- It helps AI-generated code match the project’s architecture and style

### What this file is NOT

- It is **not** runtime documentation
- It is **not** required to build or run the project
- It does **not** affect application behavior

### Recommended Usage

Load the contents of `.github/backend.md` into your AI tool of choice, such as:

- VS Code Copilot Chat
- Cursor
- Continue.dev
- ChatGPT

Using the prompt ensures:

- consistent file structure
- correct routing patterns
- proper error handling
- minimal back-and-forth when generating code

---

## 🎯 Philosophy

This starter is intentionally:

- **minimal**
- **explicit**
- **flexible**
- **anti–lock-in**

It gives you **structure without assumptions**.

---

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies
3. Copy and populate environment variables:

   ```
   mv .env.example .env
   ```

4. Start development:

   ```
   npm run dev
   ```

---

## 📦 License

MIT

---
