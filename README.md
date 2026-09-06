# Tattoo Studio — Full-Stack Booking Platform

A modern, full-stack tattoo studio website built with Next.js, TypeScript, Prisma, and MySQL.

The project combines a public-facing studio website with a secure admin dashboard for managing artists, portfolio work, studio information, and appointment requests.

## Features

### Public Website

- Modern responsive tattoo studio landing page
- Dynamic artist profiles
- Dynamic tattoo portfolio
- Artist-specific portfolio work
- Appointment booking form
- Artist selection during booking
- Appointment date validation
- Booking conflict detection
- Dynamic studio contact information
- Instagram and WhatsApp links
- Responsive design for desktop and mobile

### Admin Dashboard

- Password-protected administrator login
- Signed, expiring admin sessions
- View appointment requests
- Update booking status
- Artist management
  - Create artists
  - Edit artists
  - Delete artists
- Tattoo portfolio management
  - Add tattoos
  - Edit tattoos
  - Delete tattoos
- Studio settings management
  - Address
  - Phone
  - Email
  - Instagram
  - WhatsApp
  - Opening hours
- Admin logout

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js App Router
- Next.js Route Handlers
- Prisma ORM
- MySQL

### Authentication

- bcrypt password hashing
- HTTP-only session cookie
- HMAC-SHA256 signed admin sessions
- Expiring authentication sessions

### Development

- ESLint
- TypeScript
- Prisma migrations
- Git / GitHub

## Architecture

```text
Browser
   │
   ├── Public Pages
   │      ├── Home
   │      ├── Artists
   │      ├── Portfolio
   │      └── Booking
   │
   └── Admin Dashboard
          ├── Bookings
          ├── Artists
          ├── Tattoos
          └── Studio Settings
                  │
                  ▼
            Next.js API Routes
                  │
                  ▼
                Prisma
                  │
                  ▼
                MySQL
