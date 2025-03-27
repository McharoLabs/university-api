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

- **Students Endpoint:** [http://13.60.65.147/api/students/](http://13.60.65.147/api/students/)
- **Subjects Endpoint:** [http://13.60.65.147/api/subjects/](http://13.60.65.147/api/subjects/)

## Setup Instructions

### Prerequisites

- Python 3.x
- Django 5.x
- Django REST Framework
- PostgreSQL (for production)

### Installation

1. Make directory

   ```bash
   mkdir project
   cd project
   ```

2. Create a virtual environment:

   ```bash
   python3 -m venv env
   ```

3. Activate the virtual environment:

   ```bash
   source env/bin/activate
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
