# University API

This project is a simple Django REST Framework API that provides endpoints for students and subjects. The project is connected to a PostgreSQL database and deployed to an AWS Ubuntu instance.

## API Endpoints

1.  **/students**: Returns a JSON response containing a list of students with their name and enrolled program.

    - Example Response:
      ```json
      [
        { "name": "Kwame Nkrumah", "program": "Software Engineering" },
        { "name": "Ngozi Okonjo-Iweala", "program": "Software Engineering" },
        { "name": "Sizwe Dlamini", "program": "Software Engineering" },
        { "name": "Amina J. Mohammed", "program": "Software Engineering" },
        { "name": "Thabo Mbeki", "program": "Software Engineering" },
        { "name": "Chinua Achebe", "program": "Software Engineering" },
        { "name": "Nelson Mandela", "program": "Software Engineering" },
        { "name": "Wangari Maathai", "program": "Software Engineering" },
        { "name": "Kofi Annan", "program": "Software Engineering" },
        { "name": "Salim Ahmed Salim", "program": "Software Engineering" }
      ]
      ```

2.  **/subjects**: Returns a JSON response listing all subjects associated with the Software Engineering program, spanning from Year 1 through Year 4.
    - Example Response:
      ```json
      {
        "Year 1": ["Math 101", "CS 101", "Intro to Programming"],
        "Year 2": ["Data Structures", "Algorithms", "Discrete Math"],
        "Year 3": [
          "Operating Systems",
          "Database Systems",
          "Software Engineering"
        ],
        "Year 4": ["Machine Learning", "Cloud Computing", "Capstone Project"]
      }
      ```

### API URLs:

- **Students Endpoint:** [https://cs.ua.seranise.co.tz/api/students/](https://cs.ua.seranise.co.tz/api/students/)
- **Subjects Endpoint:** [https://cs.ua.seranise.co.tz/api/subjects/](https://cs.ua.seranise.co.tz/api/subjects/)

## Setup Instructions

### Prerequisites

- Python 3.x
- Django 5.x
- Django REST Framework
- PostgreSQL (for production)

### Installation

1. Create the project directory:

   ```bash
   mkdir project
   cd project
   ```

2. Create a virtual environment to isolate our package dependencies locally:

   ```bash
   python3 -m venv env
   ```

3. Activate the virtual environment:

   ```bash
   source env/bin/activate # On Windows use `env\Scripts\activate`
   ```

4. Clone the repository:

   ```bash
   git clone [https://github.com/McharoLabs/university-api.git](https://github.com/McharoLabs/university-api.git)
   cd university-api
   ```

5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
6. Create a `.env` file in the root of your project directory. Copy the contents of `.env.example` and replace the placeholder values with your actual database credentials:
   ```
   ENGINE=django.db.backends.your_engine
   DB_NAME=your_database_name
   DB_USER=your_db_user
   DB_PASSWORD=your_user_password
   DB_HOST=your_db_host
   PORT=your_db_port
   ```
   **Important:** Replace `your_engine`, `your_database_name`, `your_db_user`, `your_user_password`, `your_db_host`, and `your_db_port` with your actual database settings. For example, if you are using PostgreSQL, `ENGINE` would be `django.db.backends.postgresql`.
7. Run migrations:
   ```bash
   python manage.py migrate
   ```
8. Start the development server:
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://127.0.0.1:8000/`.

# Bash Scripting for AWS Ubuntu Server Management

## Tasks

### 0. Backup Schemes

This section explains three backup schemes used in server management, their execution methods, advantages, and disadvantages.

#### 1. Full Backup:

- **Execution:** A full backup involves creating a complete copy of the entire system or database. This is done at regular intervals (e.g., daily, weekly), capturing all files and data in one operation.

- **Advantages:**

  - Easy to restore, as everything is included in the backup.
  - Simple to manage, as there is only one file to restore.

- **Disadvantages:**
  - Time-consuming as it needs to copy everything.
  - Requires a large amount of storage space since all data is backed up.
  - Slow recovery time, especially if the system or database is large.

#### 2. Incremental Backup:

- **Execution:** Incremental backups only capture data that has changed since the last backup (whether full or incremental). This reduces the amount of data that needs to be saved each time.

- **Advantages:**

  - Faster than full backups, as it only backs up modified data.
  - Requires less storage space compared to full backups.

- **Disadvantages:**
  - Restoration can be slower, as all previous incremental backups need to be restored in sequence to fully reconstruct the latest state.
  - Can be more complex to manage because it requires keeping track of multiple backup files.

#### 3. Differential Backup:

- **Execution:** Differential backups capture all changes made since the last full backup. Each differential backup grows larger over time until the next full backup is performed.

- **Advantages:**

  - Faster than full backups, but not as fast as incremental backups.
  - Simpler restoration process than incremental backups, as only the full backup and the last differential backup are needed.

- **Disadvantages:**
  - Requires more storage than incremental backups, since it captures all changes since the last full backup.
  - Over time, differential backups can take longer to complete as the backup grows.

---

### Bash Scripts

This section describes the three Bash scripts you need to create and use for automating server management tasks.

#### 1. `health_check.sh`

This script will monitor the server’s health, ensuring the API is running and that system resources like CPU, memory, and disk space are within acceptable limits. The script will check the following:

- Whether the server is running.
- Whether critical services (like the web server and database) are active.
- System resource usage (e.g., CPU load, memory, disk space).

#### 2. `backup_api.sh`

This script will handle the backup of both the database and file system for the API. The script will:

- Perform a full backup of the database (using tools like `pg_dump` for PostgreSQL).
- Backup essential configuration files and application code.
- Optionally, it could automate sending the backups to an external server or cloud storage like AWS S3 for redundancy.

#### 3. `update_server.sh`

This script will automate the process of updating the server software and packages. The script will:

- Update the package lists with `apt-get update`.
- Upgrade all outdated packages with `apt-get upgrade`.
- Ensure that the server is running the latest security patches.
- Optionally, it could also handle reboots if necessary after upgrades.

### Steps to Set Up and Run the Scripts

1. **Create the `bash_scripts` directory:**

   ```bash
   mkdir bash_scripts
   cd bash_scripts

   ```

2. **Create and add the scripts**
   Create the following Bash scripts:

   ```bash
   tound health_check.sh backup_api.sh update_server.sh
   ```

3. **Set execute permissions on the scripts:**
   ```bash
   chmod +x health_check.sh backup_api.sh update_server.sh
   ```
4. **Run the scripts:**

   ```bash
   sudo ./health_check.sh
   sudo ./backup_api.sh
   sudo ./update_server.sh

   ```

# Docker, Nginx, Front-End Load Balance

A front-end interface for API and high availability (HA) at
the application level by load balancing the front-end application. A React
front-end for the /students and /subjects endpoints and implement load balancing with
NGINX or HAProxy across at least three front-end nodes, displaying the responding node on the
homepage.

### Steps

1. **Create React App using vite**

```bash
   npm create vite@latest
```

Follow Steps

2. **Development**
   create ReactJs UI integrating University API to consume the data

- **Students Endpoint:** [https://cs.ua.seranise.co.tz/api/students/](https://cs.ua.seranise.co.tz/api/students/)
- **Subjects Endpoint:** [https://cs.ua.seranise.co.tz/api/subjects/](https://cs.ua.seranise.co.tz/api/subjects/)

3. **Foldering**
   Create one folder and put the two project inside the folder

```bash
   mkdir app
   mv ./university_api ./app/ ./university-client ./app
```

This ensures that both university_api and university-client are moved into the app folder. After that, your folder structure will look something like this:

```bash
   cd app
   app/
      university_api/
      university-client/
```

4. **Create nginx folder**
   This folder contains all the nginx configuration as follows

```bash
   mkdir nginx
   touch nginx.conf
```

The configuration inside the nginx configuration for the frontend load balancer and api

```bash
   upstream frontend {
      server frontend1:5173;
      server frontend2:5173;
      server frontend3:5173;
   }

   upstream backend {
      server university-api:8000;
   }

   server {
      listen 80;
      server_name cs.ua.seranise.co.tz;

      return 301 https://$host$request_uri;
   }

   server {
      listen 443 ssl;
      server_name cs.ua.seranise.co.tz www.cs.ua.seranise.co.tz;

      ssl_certificate /etc/letsencrypt/original_certs/fullchain1.pem;
      ssl_certificate_key /etc/letsencrypt/original_certs/privkey1.pem;
      ssl_trusted_certificate /etc/letsencrypt/original_certs/chain1.pem;
      ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

      location / {
         proxy_pass http://frontend;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
      }

      location /api/ {
         proxy_pass http://backend/api/;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
         proxy_set_header X-Forwarded-Proto $scheme;
         proxy_set_header X-Forwarded-Host $host;
         proxy_set_header X-Forwarded-Port $server_port;
      }

      location /admin/ {
         proxy_pass http://backend/admin/;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
         proxy_set_header X-Forwarded-Proto $scheme;
         proxy_set_header X-Forwarded-Host $host;
         proxy_set_header X-Forwarded-Port $server_port;
      }

      location /static/ {
         alias /app/staticfiles/;
         expires 1y;
         access_log off;
         add_header Cache-Control "public";
      }

      location /media/ {
         alias /app/staticfiles/media/;
         expires 1y;
         access_log off;
         add_header Cache-Control "public";
      }

      error_page 500 502 503 504 /50x.html;
      location = /50x.html {
         root /usr/share/nginx/html;
      }
   }
```

5. **Create docker-compose folder inside the app**

```bash
   touch docker-compose.yml
```

Configure dcker-compose.yml accordingly, reffer to

- **docker-compose.yml:** [https://github.com/McharoLabs/university-api/blob/main/docker-compose.yml](https://github.com/McharoLabs/university-api/blob/main/docker-compose.yml)

6. **Dockerfile**
   For each child project inside the app, create Dockerfile special for building the project

```bash
   # University_api Dockerfile configuration
   cd university_api
   touch Dockerfile
```

Configurations

```bash
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
```

```bash
   # University-client Configurations
   cd ../university-client
   touch Dockerfile
```

Configurations

```bash
   FROM node:20.10.0-alpine

WORKDIR /client

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .


RUN npm run build

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
```

7. **Foldere Structure**

```bash
   app/
  nginx/
    nginx.conf
  university_api/
    Dockerfile
  university-client/
    Dockerfile
  docker-compose.yml
```

8. **Building the app**

- **Build university client**
  ```bash
     cd university-client
     docker build -t seranise/university-client:latest .
  ```
- **Push to docker hub**

  ```bash
     docker push seranise/university-client:latest
  ```

- **Build university api**
  ```bash
     cd university_api
     docker build -t seranise/university-api:latest .
  ```
- **Push to docker hub**
  ```bash
     docker push seranise/university-api:latest
  ```

9. **Run the project**

```bash
   docker compose up -d
```

**Finally the app is up and running, Now we need to deploy to AWS**

1. **Create AWS instance, update the instance, install docker and pull the project from GitHub**

```bash
   # Step 1: SSH into your AWS EC2 instance (replace with your instance's public IP)
   ssh -i /path/to/your-key.pem ubuntu@<your-ec2-public-ip>

   # Step 2: Update your AWS instance packages
   sudo apt update && sudo apt upgrade -y

   # Step 3: Install Docker
   # Install required dependencies
   sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

   # Add Docker's official GPG key
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

   # Set up the stable Docker repository
   echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

   # Install Docker
   sudo apt update
   sudo apt install docker-ce docker-ce-cli containerd.io -y

   # Step 4: Start Docker and enable it to start on boot
   sudo systemctl start docker
   sudo systemctl enable docker

   # Step 5: Install Docker Compose
   # Download the latest stable version of Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

   # Set permissions to make Docker Compose executable
   sudo chmod +x /usr/local/bin/docker-compose

   # Step 6: Verify Docker and Docker Compose installation
   docker --version
   docker-compose --version

   # Step 7: Pull the project from GitHub
   # Install git if it's not installed yet
   sudo apt install git -y

   # Clone the project repository from GitHub
   git clone https://github.com/McharoLabs/university-api.git

   # Step 8: Navigate into the project directory
   cd university-api

   # Step 9: (Optional) Build the Docker containers using Docker Compose
   # If you have a `docker-compose.yml` file inside your project, run the following to build and start the containers
   sudo docker-compose up --build -d

   # Step 10: Check the containers running with Docker Compose
   sudo docker ps
```

Now the app is up and running.

**App URL and public docker image**

- **Students Endpoint:** [https://cs.ua.seranise.co.tz/api/students/](https://cs.ua.seranise.co.tz/api/students/)
- **Subjects Endpoint:** [https://cs.ua.seranise.co.tz/api/subjects/](https://cs.ua.seranise.co.tz/api/subjects/)
- **Dokcer Client Image:** [https://hub.docker.com/repository/docker/seranise/university-client/general](https://hub.docker.com/repository/docker/seranise/university-client/general)
- **Dcker API Image:** [https://hub.docker.com/repository/docker/seranise/university-api/general](https://hub.docker.com/repository/docker/seranise/university-api/general)
- **React Front-End:** [https://cs.ua.seranise.co.tz/](https://cs.ua.seranise.co.tz/)
