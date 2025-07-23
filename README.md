# Movie Management Application

This is a full-stack movie management application built with Laravel for the backend, Next.js for the frontend, and PostgreSQL running in a Docker container. The application provides a user interface for managing movies, including creating, editing, and listing movies with filtering options based on their PG ratings.

## Project Structure

```
indotek
├── backend        # Laravel application
│   ├── app
│   │   ├── Http
│   │   │   └── Controllers
│   │   │       └── MovieController.php
│   │   └── Models
│   │       └── Movie.php
│   ├── database
│   │   ├── migrations
│   │   │   └── create_movies_table.php
│   │   └── seeders
│   │       └── MovieSeeder.php
│   ├── routes
│   │   └── api.php
│   ├── composer.json
│   ├── .env.example
│   └── Dockerfile
├── frontend       # Next.js application
│   ├── src
│   │   ├── app
│   │   │   ├── page.tsx
│   │   │   └── movies
│   │   │       ├── page.tsx
│   │   │       ├── create
│   │   │       │   └── page.tsx
│   │   │       └── [id]
│   │   │           └── edit
│   │   │               └── page.tsx
│   │   ├── components
│   │   │   ├── MovieForm.tsx
│   │   │   ├── MovieList.tsx
│   │   │   ├── MovieCard.tsx
│   │   │   ├── ModernSearch.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   └── Loader.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   └── types
│   │       └── movie.ts
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Requirements

- **Docker**: Latest version
- **Docker Compose**: Latest version
- **Backend**: Laravel 11.x (PHP 8.2)
- **Frontend**: Next.js 14.x (Node.js 18+)
- **Database**: PostgreSQL (Docker container)

## Setup Instructions

### Prerequisites
Make sure you have Docker and Docker Compose installed on your system:
- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clone the Repository
```bash
git clone https://github.com/sLa1/indotek.git
cd indotek
```

### 2. Environment Setup
```bash
# Copy environment file in backend directory
cp backend/.env.example backend/.env
```

### 3. Build and Run the Application
```bash
# Build and start all containers
docker-compose up --build

# Or run in background (detached mode)
docker-compose up --build -d
```

### 4. Database Setup (First Time Only)
The database will be automatically created when PostgreSQL container starts. 
Wait for all containers to be running, then set up the database:

```bash
# Access the backend container
docker-compose exec backend bash

# Run migrations
php artisan migrate

# Seed the database with sample data
php artisan db:seed
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Database**: localhost:5432 (user: postgres, password: secret)

### 6. Stopping the Application
```bash
# Stop all containers
docker-compose down

# Stop and remove all containers, networks, and volumes
docker-compose down -v
```

## Testing

The application includes comprehensive unit and feature tests for the API endpoints.

### Running Tests
```bash
# Access the backend container
docker-compose exec backend bash

# Run all tests
php artisan test

# Run tests with coverage (if you have Xdebug configured)
php artisan test --coverage

# Run specific test suite
php artisan test --testsuite=Feature
php artisan test --testsuite=Unit

# Run specific test file
php artisan test tests/Feature/MovieApiTest.php
```

### Test Coverage
- **Feature Tests**: Complete API endpoint testing including validation, CRUD operations, and error handling
- **Unit Tests**: Model testing including relationships, factory methods, and business logic
- **Movie API Tests**: All CRUD operations, validation rules, duplicate prevention
- **PG Rating API Tests**: Listing and data validation
- **Model Tests**: Relationships, fillable attributes, and factory functionality

## Features

### Movie Management
- **CRUD Operations**: Create, Read, Update, and Delete movies
- **Smart Filtering**: Filter movies based on PG ratings (G, PG, PG-13, R)
- **Modern UI**: Built with Tailwind CSS and Framer Motion animations
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### User Experience
- **Interactive Homepage**: Feature cards with navigation to key sections
- **Modern Search**: Dropdown-based filtering with instant results
- **Modal Dialogs**: Create and edit movies in elegant modal windows
- **Confirmation Dialogs**: Safe delete operations with modern confirmation UI
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Beautiful loading animations throughout the app

### Technical Features
- **REST API**: Laravel backend with comprehensive API endpoints
- **Docker Ready**: Full containerization for easy deployment
- **Database Seeding**: Pre-populated with PG ratings and sample data
- **Type Safety**: TypeScript implementation in frontend

## API Endpoints

### Movies
- `GET /api/movies` - List all movies (with optional PG rating filter: `?pg_rating_id=1`)
- `POST /api/movies` - Create a new movie
- `GET /api/movies/{id}` - Get specific movie details
- `PUT /api/movies/{id}` - Update specific movie
- `DELETE /api/movies/{id}` - Delete specific movie

### PG Ratings
- `GET /api/pg-ratings` - List all available PG ratings

### Example API Usage
```bash
# Get all movies
curl http://localhost:8000/api/movies

# Get movies filtered by PG rating (G = 1, PG = 2, PG-13 = 3, R = 4)
curl http://localhost:8000/api/movies?pg_rating_id=1

# Create a new movie
curl -X POST http://localhost:8000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"New Movie","description":"Movie description","pg_rating_id":2}'
```

## Troubleshooting

### Common Issues

#### Port Already in Use
If you get port conflicts, check what's running on the required ports:
```bash
# Check if ports are in use
netstat -an | findstr "3000\|8000\|5432"  # Windows
netstat -an | grep -E "3000|8000|5432"    # Linux/Mac

# Stop containers and try again
docker-compose down
docker-compose up --build
```

#### Database Connection Issues
If the backend can't connect to the database:
```bash
# Check if all containers are running
docker-compose ps

# View container logs
docker-compose logs backend
docker-compose logs db

# Restart the database container
docker-compose restart db
```

#### Frontend Build Errors
If the frontend container fails to build:
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild only frontend
docker-compose build frontend
docker-compose up frontend
```

#### Clear Everything and Start Fresh
If you encounter persistent issues:
```bash
# Stop all containers and remove volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Rebuild from scratch
docker-compose up --build
```

### Development Tips

#### Hot Reload
- Frontend: Changes are automatically reflected (Next.js hot reload)
- Backend: For Laravel changes, restart the backend container:
  ```bash
  docker-compose restart backend
  ```

#### Database Access
Connect to PostgreSQL directly:
```bash
# Using docker
docker-compose exec db psql -U postgres -d indotek

# Using external client (host: localhost, port: 5432, user: postgres, password: secret)
```

## Notes

- Ensure Docker and Docker Compose are installed and running
- The application uses the following ports: 3000 (frontend), 8000 (backend), 5432 (database)
- Database data persists between container restarts unless volumes are removed
- The backend includes CORS configuration for frontend communication
- All environment variables are configured in the Docker Compose setup

## License

This project is licensed under the MIT License.