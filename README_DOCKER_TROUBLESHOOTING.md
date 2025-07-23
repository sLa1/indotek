# Docker Build Troubleshooting

## Common Issues and Solutions

**Note:** This project now uses a simplified Docker setup. Most complex permission and entrypoint issues have been eliminated by using a straightforward Laravel + Apache configuration.

### 1. Permission Errors During Build

If you encounter permission errors like:
```
ERROR [backend stage-0  9/11] RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html/storage && chmod -R 755 /var/www/html/bootstrap/cache
```

**Solution:** The simplified Dockerfile now handles permissions in a single step during build time, which works reliably across platforms.

### 2. Missing Environment File

Make sure to copy the environment file before building:
```bash
cp backend/.env.example backend/.env
```

### 3. Docker Compose Version Warning

If you see:
```
the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion
```

**Solution:** The version field has been removed from docker-compose.yml as it's no longer required in modern Docker Compose.

### 4. Build Steps (Updated)

1. **Clone the repository**
```bash
git clone https://github.com/sLa1/indotek.git
cd indotek
```

2. **Setup environment**
```bash
cp backend/.env.example backend/.env
```

3. **Clean previous builds (if any)**
```bash
docker-compose down -v
docker system prune -f
```

4. **Build and run**
```bash
docker-compose up --build
```

### 5. Alternative Build Commands

If the above doesn't work, try building services individually:

```bash
# Build backend first
docker-compose build backend

# Build frontend
docker-compose build frontend

# Start all services
docker-compose up
```

### 6. Windows-specific Notes

- Make sure Docker Desktop is running
- Ensure WSL2 backend is enabled
- Try running PowerShell/CMD as Administrator if permission issues persist

### 7. Debugging

To debug container issues:

```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend sh
```

### 8. Reset Everything

If all else fails, reset Docker completely:

```bash
# Stop and remove everything
docker-compose down -v
docker system prune -a
docker volume prune

# Rebuild from scratch
docker-compose up --build
```
