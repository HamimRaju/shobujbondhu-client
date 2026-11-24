# ShobujBondhu

**A community-service events platform for neighbours across Bangladesh.**

- **Live site:** Not deployed yet — connect the API and deployment environment first.
- **Client repository:** https://github.com/HamimRaju/shobujbondhu-client
- **Server repository:** https://github.com/HamimRaju/shobujbondhu-server

## Highlights

- Browse upcoming neighbourhood clean-ups, donation drives, tree planting, and more.
- Create events with image previews, Bangladesh-local date/time validation, and event categories.
- Join upcoming events and see participant counts.
- Save and sort joined events in a private dashboard.
- Edit or delete only the events you created.
- Sign in or register with email/password, or use Google OAuth when configured.
- Update your profile and switch the whole interface between light and dark themes.
- Responsive layouts, accessible forms, helpful empty states, and loading skeletons.

## Stack

- Next.js App Router, React, TypeScript, Tailwind CSS
- Better Auth with MongoDB and JWT
- Express API with MongoDB, Zod validation, and Helmet

## Run locally

1. Install dependencies in both project folders:

   ```bash
   cd shobujbondhu-server && npm install
   cd ../shobujbondhu-client && npm install
   ```

2. Configure the server:

   ```bash
   cd shobujbondhu-server
   cp .env.example .env
   ```

   Set `MONGODB_URI`, `DB_NAME`, a random `BETTER_AUTH_SECRET` (32+ characters),
   `BETTER_AUTH_URL=http://localhost:5000`, and
   `CLIENT_URL=http://localhost:3000`. Add Google OAuth credentials to enable
   Google login. The OAuth callback is
   `http://localhost:5000/api/auth/callback/google`.

3. Configure the client:

   ```bash
   cd ../shobujbondhu-client
   cp .env.example .env.local
   ```

   Set `NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000` and
   `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

4. Start the API and web app in separate terminals:

   ```bash
   # Terminal 1
   cd shobujbondhu-server && npm run dev

   # Terminal 2
   cd shobujbondhu-client && npm run dev
   ```

   Open http://localhost:3000.

## Deployment

Deploy the Express API to a Node.js host such as Render and the client to
Vercel. Configure the production MongoDB URI, a fresh authentication secret,
Google OAuth callback/origins, `BETTER_AUTH_URL`, `CLIENT_URL`,
`NEXT_PUBLIC_BETTER_AUTH_URL`, and `NEXT_PUBLIC_SITE_URL` for the deployed
origins. Use HTTPS in production. Add the final production URL above after
deployment.

## Verification

```bash
# Client
npm run lint
npm run build

# Server
npm run typecheck
npm run build
```
