# URL Shortener with Analytics Dashboard

A full-stack URL shortener application with analytics tracking, similar to Bitly. Users can create shortened links and track their performance, including clicks and devices.

## Features

- User authentication with JWT
- URL shortening with optional custom aliases and expiration dates
- Analytics dashboard with click tracking
- Device and browser breakdown charts
- QR code generation for shortened URLs
- Pagination and search functionality

## Tech Stack

- **Frontend**: React.js, Redux Toolkit, Chart.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
###
```sh
git clone git@github.com:VaibhavTc/dacoid-task.git
cd dacoid-task
```
2. Install server dependencies:
###
```sh
npm install
```
3. Install client dependencies:
###
```sh
cd client
npm install
cd ..
```
4. Create a `.env` file in the root directory with the following variables:
###
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=your_port
```

5. Seed the initial user:
###
```sh
npm run seed
```

6. Start the development server:
###
```sh
npm run dev
```

7. The application will be available at `http://localhost:3000`

### Test Credentials

- Email: intern@dacoid.com
- Password: Test123

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user

### URLs
- `GET /api/urls` - Get all URLs for authenticated user
- `POST /api/urls` - Create a new shortened URL

### Analytics
- `GET /api/analytics/:urlId` - Get analytics for a specific URL

### Redirect
- `GET /:shortId` - Redirect to original URL and log click event

## 📜 License
This project is licensed under the **MIT License**.

