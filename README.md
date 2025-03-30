# User Management System

A React-based user management system with features like adding, viewing, and managing user points.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- XAMPP (for running the Laravel backend)
- PHP 8.2 or higher
- Laravel 11
- MySQL 5.7 or higher

## Setup Instructions

### Backend Setup (Laravel)

1. Navigate to the Laravel project directory:
```bash
cd /path/to/laravel/project
```

2. Install PHP dependencies:
```bash
composer install
```

3. Create and configure .env file:
```bash
cp .env.example .env
php artisan key:generate
```

4. Configure your database in .env file:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=root
DB_PASSWORD=
```

5. Run migrations:
```bash
php artisan migrate
```

6. Start the Laravel development server:
```bash
php artisan serve
```

### Frontend Setup (React)

1. Navigate to the React project directory:
```bash
cd /path/to/react/project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Features

- View list of users
- Add new users
- View user details
- Update user points
- Delete users

## API Endpoints

- GET `/api/userlist` - Get all users
- POST `/api/createuser` - Create a new user
- PUT `/api/updateuser/{id}` - Update user details
- DELETE `/api/deleteuser/{id}` - Delete a user

## Development

The application uses:
- React for the frontend
- Laravel 11 for the backend
- PHP 8.2+ for server-side processing
- Bootstrap for styling
- MySQL 5.7+ for the database

## Troubleshooting

1. If you encounter CORS issues:
   - Ensure the Laravel backend has CORS middleware configured
   - Check if the baseURL in App.jsx matches your Laravel server URL

2. If database connection fails:
   - Verify MySQL is running in XAMPP
   - Check database credentials in .env file
   - Ensure database exists

3. If frontend can't connect to backend:
   - Verify both servers are running
   - Check if the baseURL is correct
   - Ensure no firewall is blocking the connection

4. If you encounter PHP version issues:
   - Verify PHP version is 8.2 or higher using `php -v`
   - Update XAMPP if needed to get the correct PHP version
   - Ensure Laravel 11 is compatible with your PHP version
