# FROM python:3.12-alpine
# ENV PYTHONUNBUFFERED=1
# RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

# WORKDIR /app

# COPY requirements.txt requirements.txt

# RUN pip3 install -r requirements.txt

# COPY . .


# RUN python3 manage.py collectstatic --noinput
# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

# Backend Dockerfile

FROM python:3.12-alpine

# Install system dependencies
RUN apk update && \
    apk add --no-cache \
    postgresql-dev \
    gcc \
    python3-dev \
    musl-dev \
    libffi-dev \
    jpeg-dev \
    zlib-dev \
    gettext

# Create user and set permissions
RUN adduser -D appuser
WORKDIR /app
RUN chown appuser:appuser /app

# Copy and install requirements
COPY --chown=appuser:appuser requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY --chown=appuser:appuser . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Switch to non-root user
USER appuser

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "university_api.wsgi"]