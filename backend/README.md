# User Management System - Backend

Laravel 11 backend for the User Management System.

## Requirements

- PHP 8.2 or higher
- Composer
- MySQL 5.7 or higher
- XAMPP (recommended for local development)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure your database in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=root
DB_PASSWORD=
```

6. Run migrations:
```bash
php artisan migrate
```

7. Start the development server:
```bash
php artisan serve
```

## Task Scheduling

### Setting Up Cron Jobs

1. Add the following Cron entry to your server:
```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

2. Define scheduled tasks in `bootstrap/app.php`:
```php
->withSchedule(function (Schedule $schedule) {
    // Run daily at midnight
    $schedule->command('app:reset-points')->daily();
    
    // Run every hour
    $schedule->command('app:cleanup-old-records')->hourly();
    
    // Run on specific days
    $schedule->command('app:generate-report')->weeklyOn(1, '8:00');
    
    // Run every 5 minutes
    $schedule->command('app:check-user-activity')->everyFiveMinutes();
})
```

3. Create custom commands in `app/Console/Commands/`:
```bash
php artisan make:command ResetPoints
```

4. Example command implementation:
```php
class ResetPoints extends Command
{
    protected $signature = 'app:reset-points';
    protected $description = 'Reset user points daily';

    public function handle()
    {
        User::query()->update(['points' => 0]);
        $this->info('User points reset successfully!');
    }
}
```

### Testing Scheduled Tasks

1. List all scheduled tasks:
```bash
php artisan schedule:list
```

2. Run scheduled tasks manually:
```bash
php artisan schedule:run
```

3. Test specific scheduled task:
```bash
php artisan app:reset-points
```

### Common Scheduling Methods

- `->daily()` - Run once per day at midnight
- `->hourly()` - Run once per hour
- `->everyMinute()` - Run every minute
- `->everyFiveMinutes()` - Run every 5 minutes
- `->weekly()` - Run once per week
- `->monthly()` - Run once per month
- `->weeklyOn(1, '8:00')` - Run weekly on Monday at 8:00
- `->cron('* * * * *')` - Run on a custom cron schedule

### Important Notes

1. Ensure your server's cron service is running:
```bash
sudo service cron status
```

2. Check cron logs for errors:
```bash
tail -f /var/log/cron.log
```

3. For Windows servers, use Task Scheduler instead of cron:
```batch
schtasks /create /tn "Laravel Schedule" /tr "php artisan schedule:run" /sc minute /mo 1
```

4. For shared hosting, check with your provider about cron job support and configuration.

## API Documentation

### Endpoints

#### Users

1. Get All Users
```
GET /api/userlist
Response: {
    "data": [
        {
            "id": number,
            "name": string,
            "points": number,
            "age": number,
            "address": string,
            "created_at": timestamp,
            "updated_at": timestamp
        }
    ]
}
```

2. Create User
```
POST /api/createuser
Request Body: {
    "name": string,
    "points": number,
    "age": number,
    "address": string
}
Response: {
    "data": {
        "id": number,
        "name": string,
        "points": number,
        "age": number,
        "address": string,
        "created_at": timestamp,
        "updated_at": timestamp
    }
}
```

3. Update User
```
PUT /api/updateuser/{id}
Request Body: {
    "name": string,
    "points": number,
    "age": number,
    "address": string
}
Response: {
    "data": {
        "id": number,
        "name": string,
        "points": number,
        "age": number,
        "address": string,
        "created_at": timestamp,
        "updated_at": timestamp
    }
}
```

4. Delete User
```
DELETE /api/deleteuser/{id}
Response: {
    "message": "User deleted successfully"
}
```

## Database Structure

### Users Table
- id (primary key)
- name
- points
- age
- address
- created_at
- updated_at

## CORS Configuration

The backend is configured to accept requests from the frontend. CORS settings can be found in:
- `config/cors.php`
- `app/Http/Middleware/Cors.php`

## Development

### Running Tests
```bash
php artisan test
```

### Code Style
```bash
composer run-script phpcs
```

### Database Seeding
```bash
php artisan db:seed
```

## Troubleshooting

1. Database Connection Issues
   - Verify MySQL is running
   - Check database credentials in .env
   - Ensure database exists

2. CORS Issues
   - Check CORS configuration in config/cors.php
   - Verify frontend URL is allowed
   - Check if CORS middleware is properly registered

3. API Response Issues
   - Check Laravel logs in storage/logs/laravel.log
   - Verify request format matches API documentation
   - Ensure all required fields are provided

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 