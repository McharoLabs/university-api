#!/bin/bash

# === CONFIGURATION ===
TIMESTAMP=$(date "+%Y%m%d-%H%M%S")
PROJECT_DIR="/home/ubuntu/university-api"
BACKUP_DIR="/home/ubuntu/backups"
BACKUP_FILE="$BACKUP_DIR/university_api_backup_$TIMESTAMP.tar.gz"
PG_BACKUP_FILE="$BACKUP_DIR/postgres_backup_$TIMESTAMP.sql"

# PostgreSQL credentials (set these only if using PostgreSQL)
DB_NAME="university_api"
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"

# === CREATE BACKUP DIR IF IT DOESN'T EXIST ===
mkdir -p "$BACKUP_DIR"

# === BACKUP DJANGO PROJECT ===
echo "Backing up project from $PROJECT_DIR to $BACKUP_FILE..."
tar --exclude="$PROJECT_DIR/env" -czf "$BACKUP_FILE" -C "$(dirname "$PROJECT_DIR")" "$(basename "$PROJECT_DIR")"

# === BACKUP POSTGRESQL DATABASE (OPTIONAL) ===
echo "Backing up PostgreSQL database $DB_NAME..."
PGPASSWORD=postgres pg_dump -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" "$DB_NAME" > "$PG_BACKUP_FILE"

# === DONE ===
echo "Backup completed!"
echo "Project backup: $BACKUP_FILE"
echo "Database backup: $PG_BACKUP_FILE"