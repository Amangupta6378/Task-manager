# Team Task Manager

Monorepo with `/server` (Node/Express/MongoDB) and `/client` (React + Vite + Tailwind).

Quick start:

- Backend
  - copy `server/.env.example` to `server/.env` and set `MONGO_URI` and `JWT_SECRET`.
  - cd `server` && npm install
  - run `npm run seed` to populate demo data
  - run `npm run dev`

- Frontend
  - copy `client/.env.example` if needed and set `VITE_API_URL` to backend URL
  - cd `client` && npm install
  - run `npm run dev`

Deployment checklist included in `/DEPLOYMENT.md`.
