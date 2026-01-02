# Dive School Website – Case Study (v2)

## About V1
    ...For media we used google storage and I implemented token encryption and refresh handling but removed it from v2 to reduce system complexity.

## Lessons from v1
- Overloaded app.js with too many responsibilities
- Mixed infrastructure auth with product logic
- Learned importance of scoping before integrating third-party services

## Goal
Rebuild the core booking flow of a dive school website with a clean backend-first architecture.

## In Scope
- Database-driven site content (read-only)
- Dive listings
- Booking request flow
- Admin booking overview (no auth)

## Out of Scope (v2)
- Telegram admin bot
- Fine-grained CMS editing
- Authentication
- Payments

## Tech Stack
- Node.js
- Express
- SQL 
- React (frontend, later)

## Database
- MySQL
- mysql2 driver
- Local development database

## Background
This project is a rebuild of a previous full-stack implementation that suffered from scope creep and tight coupling.
