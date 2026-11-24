<div align="center">

# 🌿 ShobujBondhu

### Neighbours together. Communities stronger.

**A community-service events platform built for local action across Bangladesh.**

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/API-Express-111111?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

<br />

[Explore events](#what-you-can-do) ·
[Run locally](#get-started) ·
[Client repository](https://github.com/HamimRaju/shobujbondhu-client) ·
[Server repository](https://github.com/HamimRaju/shobujbondhu-server)

<br />

![A community planting trees together](public/images/home/hero-planting.jpg)

</div>

> **Live site:** Deployment is pending production API and database configuration.

---

## 🌱 What you can do
<a id="what-you-can-do"></a>

| Discover | Take part | Organize |
| --- | --- | --- |
| Browse future community events by type, title, or place. | Join an event and see how many neighbours are coming. | Create an event with a photo, location, category, and date. |
| View event details without an account. | Keep joined opportunities in your private dashboard. | Update or delete only the events you created. |

### Made for real community work

- Email/password sign-in and registration, with optional Google OAuth.
- Profile view and update, plus a persistent light/dark theme.
- Bangladesh-local date and time validation; past events are excluded from upcoming listings.
- Responsive event cards, search and filters, clear empty states, and loading skeletons.
- Public event responses omit private creator information; protected event operations verify JWTs and active sessions.

## 🖼️ A glimpse of the community

<table>
  <tr>
    <td width="50%">
      <img src="public/images/home/gallery-neighborhood-planting.jpg" alt="Neighbours planting trees together" />
      <p align="center"><strong>Greener neighbourhoods</strong></p>
    </td>
    <td width="50%">
      <img src="public/images/home/gallery-river-cleanup.jpg" alt="Volunteers cleaning a riverbank" />
      <p align="center"><strong>Cleaner shared spaces</strong></p>
    </td>
  </tr>
</table>

## 🧰 Built with

**Web:** Next.js App Router · React · TypeScript · Tailwind CSS<br />
**Authentication:** Better Auth · email/password · optional Google OAuth · JWT<br />
**API & data:** Express · MongoDB · Zod · Helmet

## 🚀 Get started
<a id="get-started"></a>

The client and API are separate packages with separate lockfiles. Run each command from its package directory.

### 1. Install dependencies

```bash
cd shobujbondhu-server && npm install
cd ../shobujbondhu-client && npm install
```

### 2. Configure the API

```bash
cd shobujbondhu-server
cp .env.example .env
```

Set `MONGODB_URI`, `DB_NAME`, and a random `BETTER_AUTH_SECRET` of at least 32 characters. For local development use:

```dotenv
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```

Google sign-in is optional. To enable it, set both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`; register this callback with Google:

```text
http://localhost:5000/api/auth/callback/google
```

### 3. Configure the web app

```bash
cd ../shobujbondhu-client
cp .env.example .env.local
```

Use `NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000` and `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

### 4. Start both services

In separate terminals:

```bash
# Terminal 1 — from shobujbondhu-server
npm run dev
```

```bash
# Terminal 2 — from shobujbondhu-client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The API listens on port `5000`.

## ✅ Verify changes

```bash
# Client
cd shobujbondhu-client
npm run lint
npm run build

# API
cd ../shobujbondhu-server
npm run typecheck
npm test
npm run build
```

Run the event validator tests alone with:

```bash
cd shobujbondhu-server
npx tsx --test src/tests/event.validator.test.ts
```

## ☁️ Deployment

Deploy the Express API to a Node.js host and the Next.js client to Vercel. Configure the production MongoDB URI, a new authentication secret, and matching production origins for `BETTER_AUTH_URL`, `CLIENT_URL`, and `NEXT_PUBLIC_BETTER_AUTH_URL`. Set `NEXT_PUBLIC_SITE_URL` to the client URL. Use HTTPS and update the Google OAuth callback/origins if OAuth is enabled.

Add the production link here once the API and client are deployed.
