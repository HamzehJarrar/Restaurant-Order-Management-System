# Restaurant Order Management System

<div align="center">

### From table to kitchen to payment - all in one live workflow

![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Bundler-Vite%207-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/API-Express%205-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![MUI](https://img.shields.io/badge/UI-Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

</div>

---

## Why this project is cool

This system is built for fast-moving restaurant teams who need everything connected in real time:

- POS flow for building orders by table
- Live Kitchen board with instant status updates
- Paid Orders history with totals and details
- Menu management with image upload support
- Analytics dashboard with AI-generated business insights

---

## Product tour

### Frontend routes

- `/` - POS Page
- `/kitchen` - Kitchen Dashboard
- `/paid-orders` - Paid Orders page
- `/menu-dashboard` - Menu management dashboard
- `/menu-form` - Menu item form view
- `/admin-analytics` - Analytics + AI insights

### Backend API groups

- `/api/orders` - create/update/delete orders and item operations
- `/api/menu` - CRUD for menu items (with image upload)
- `/api/tables` - table creation, listing, and release actions
- `/api/analytics` - sales, best-sellers, peak-hours, AI insights
- `/api/auth` - register/login/refresh authentication routes

---

## Tech stack

**Frontend**

- React 19 + Vite
- Material UI + Emotion
- Zustand state management
- Axios + React Router
- Socket.IO client

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT auth + bcrypt
- Joi validation
- Socket.IO server
- OpenAI SDK for analytics insights
- Cloudinary + Multer for media upload

---

## Quick start

### 1) Clone and install

```bash
git clone <your-repo-url>
cd Restaurant-Order-Management-System

cd Backend
npm install

cd ../frontend
npm install
```

### 2) Create environment files

Create `Backend/.env`:

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URL=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_SECRET=your_jwt_secret
SALT=10

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

OPENAI_API_KEY=your_openai_api_key
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000
VITE_ENABLE_SOCKET=true
```

### 3) Run the app

Terminal A:

```bash
cd Backend
npm run dev:backend
```

Terminal B:

```bash
cd frontend
npm run dev
```

Frontend should open on `http://localhost:5173`.

---

## Realtime flow (magic moment)

1. Create/update order in POS
2. Kitchen dashboard receives updates live via Socket.IO
3. Mark order statuses (`OPEN` -> `cooking` -> `ready` -> `paid`)
4. Paid Orders + Analytics reflect business activity

---

## Project structure

```text
Restaurant-Order-Management-System/
|- Backend/
|  |- src/
|  |  |- modules/ (auth, menu, orders, tables, analytics)
|  |  |- middlewares/
|  |  |- routes/
|  |- database/
|  |- server.js
|- frontend/
|  |- src/
|  |  |- pages/ (orders, kitchen, menu, AI)
|  |  |- components/
|  |  |- api/
|  |  |- store/
|  |- vite.config.*
```

---

## Scripts

### Backend (`Backend/package.json`)

- `npm run start` - start production server
- `npm run dev:backend` - start backend with nodemon
- `npm run seed` - seed menu data

### Frontend (`frontend/package.json`)

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview built app
- `npm run lint` - run ESLint

---

## Notes

- Enable socket updates with `VITE_ENABLE_SOCKET=true`.
- Keep `CLIENT_ORIGIN` and frontend URL aligned for CORS.
- AI insights require a valid `OPENAI_API_KEY`.

---

## License

ISC

---
