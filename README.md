# Dive School Website — Case Study (v2)

## Background (v1)

**SeaLeonDiving (v1)** was a full-stack, plain JavaScript website built in 2024 for a real diving school.

The stack was intentionally minimal, chosen to reinforce fundamentals and allow experimentation without heavy abstractions. The project included:

* Google Cloud Storage for media
* Token-based authentication with refresh handling
* Asynchronous media streaming
* A Telegram-based admin panel
* A booking system

While functional, the project suffered from **scope creep**. Several ambitious features were partially implemented, and architectural quality was occasionally sacrificed to meet immediate needs.

v1 ultimately succeeded as a learning exercise, but not as a long-term maintainable system.

---

## Lessons Learned from v1

* `app.js` accumulated too many responsibilities
* Infrastructure concerns (auth, storage) were mixed with product logic
* Third-party services were integrated before the core domain was stable
* Scoping discipline matters more than feature count

---

## Goal of v2

Rebuild the system with **fundamental soundness** as the primary objective.

This version prioritizes:

* Clear separation of concerns
* Explicit module boundaries
* Predictable data flow
* Contract-driven development

Feature depth is intentionally limited to preserve architectural clarity.

---

## In Scope (v2)

* Database-driven site content (read-only)
* Dive listings
* Booking request flow
* Admin booking overview (no authentication)

---

## Out of Scope (v2)

* Telegram admin bot
* Fine-grained CMS editing
* Authentication & authorization
* Payments
* Media uploads

These are planned extensions once the core system is stable.

---

## Tech Stack

### Backend

* Node.js
* Express
* SQL
* SQLite (local development)

### Frontend

* React (client-side rendering)

---

## Database

* Relational schema with explicit content structure
* Seeded baseline data for deterministic behavior
* Data access layer isolated from routing logic

---

## Validation & Safety

Instead of a full test runner, this project currently relies on **lightweight sanity checks** to enforce correctness during early development:

* Database schema & seed validation
* API contract validation
* Client render schema validation

These checks fail loudly and early when assumptions are violated.

See `/docs/sanity-checks.md` for details.

---

## Notes

This project is intentionally **not** a CMS clone or a feature-complete product.

It is a case study in:

* building clean boundaries,
* resisting premature abstraction,
* and treating structure as a first-class concern.

---

How to Run Locally
Prerequisites

Node.js (v18+ recommended)

npm

No global dependencies required

1. Clone the repository
git clone <repo-url>
cd diving-school

2. Install dependencies

Server

cd server
npm install


Client

cd ../client
npm install

3. Initialize the database

From the server directory:

node scripts/init-db.js


This will:

Create the local SQLite database

Apply the schema

Insert seed data required for the app to function

4. Start the backend
npm run dev


The API will be available at:

http://localhost:3000

5. Start the frontend

From the client directory:

npm run dev


The client will be available at:

http://localhost:5173

6. Verify the setup

Optional sanity checks:

node scripts/sanity-db.js
node scripts/sanity-api.js


If these pass, the system is correctly wired.