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
