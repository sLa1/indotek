# Docker Build Troubleshooting

## Common Issues and Solutions

### 1. Permission Err### 8. Windows-specific Notesrs During Build

If you encounter permission errors like:
```
ERROR [backend stage-0  9/11] RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html/storage && chmod -R 755 /var/www/html/bootstrap/cache
```

**Solution:** The updated Dockerfile now handles permissions at runtime instead of build time to avoid Windows Docker Desktop compatibility issues.

### 2. Bootstrap Cache Directory Error

If you see the error:
```
The /var/www/html/bootstrap/cache directory must be present and writable.
```

**Solution:** The Dockerfile has been updated to create all required Laravel directories before running composer scripts. The fix includes:
- Creating `bootstrap/cache` directory
- Creating all necessary `storage` subdirectories
- Setting proper ownership before composer operations

### 3. Missing Environment File

Make sure to copy the environment file before building:
```bash
cp backend/.env.example backend/.env
```

### 4. Entrypoint Script Not Found Error

If you see the error:
```
/usr/local/bin/docker-php-entrypoint: 9: exec: /usr/local/bin/docker-entrypoint.sh: not found
```

**Solution:** This has been fixed in the updated Dockerfile by ensuring the entrypoint script is copied after the application files to prevent overwriting.

### 5. Docker Compose Version Warning

If you see:
```
the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion
```

**Solution:** The version field has been removed from docker-compose.yml as it's no longer required in modern Docker Compose.

### 6. Build Steps (Updated)

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

### 7. Alternative Build Commands

If the above doesn't work, try building services individually:

```bash
# Build backend first
docker-compose build backend

# Build frontend
docker-compose build frontend

# Start all services
docker-compose up
```

### 5. Windows-specific Notes

- Make sure Docker Desktop is running
- Ensure WSL2 backend is enabled
- Try running PowerShell/CMD as Administrator if permission issues persist
- Consider using WSL2 terminal for Docker commands

### 9. Debugging

To debug container issues:

```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend sh
```

### 10. Reset Everything

If all else fails, reset Docker completely:

```bash
# Stop and remove everything
docker-compose down -v
docker system prune -a
docker volume prune

# Rebuild from scratch
docker-compose up --build
```
