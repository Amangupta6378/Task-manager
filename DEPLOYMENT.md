Deployment checklist (Railway)

Backend (server):
- Link GitHub repo and set root directory to `/server`.
- Add environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`.
- Set start command to `npm run start` or use Docker.

Frontend (client):
- Link repo and set root directory to `/client`.
- Set `VITE_API_URL` to the deployed backend URL.

Notes:
- Do not commit `.env` files. Use Railway dashboard to set env vars.
- Use `seed.js` locally to create demo data; run it once after DB setup.
