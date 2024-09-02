# SaralNotesKeep 🗒️

**SaralNotes** is a modern and user-friendly note-taking application designed to help users efficiently manage their notes. Built using a combination of React for the frontend, Laravel for the backend, and MySQL as the database, SaralNotes ensures a seamless and secure experience for users.

## Features

- **User Registration & Authentication:**
  - **JWT Authentication:** SaralNotes utilizes JSON Web Tokens (JWT) for secure authentication and session management.
  - **Register Users:** Create an account by providing a username, email, and password.
  - ![image](https://github.com/user-attachments/assets/8ceae74d-12fd-43b0-b4d2-14d264d52bb3)

  - **Login Users:** Access your account using your email and password.
  - ![image](https://github.com/user-attachments/assets/9e2424ef-b3ed-4a07-84d1-5d85a9f67263)


- **Note Management:**
  - **View Notes:**
  - ![image](https://github.com/user-attachments/assets/e7e1bdbb-a239-4071-b23b-65b80554a231)
      
  - **Create Notes:** Users can create notes by adding a title and description.
  - ![image](https://github.com/user-attachments/assets/ef7e76dd-8031-4d98-a8db-74d1d5eb7041)

  - **Edit Notes:** Update existing notes with new information.
  - ![image](https://github.com/user-attachments/assets/17396378-e86b-45a3-9b78-a015cfd5702f)

  - **Delete Notes:** Remove notes that are no longer needed.
  - ![image](https://github.com/user-attachments/assets/c2e02f83-1069-4c5b-971e-3a3bc26fb1e6)


- **User Interface:**
  - **Ant Design:** The application’s UI is built using Ant Design components, ensuring a clean and responsive interface across all devices.

- **Logout:** Securely log out of your account to prevent unauthorized access.

## Technologies Used

- **Frontend:**
  - React: A JavaScript library for building user interfaces.
  - Ant Design: A design system for enterprise-level products, providing a sleek UI.

- **Backend:**
  - Laravel: A PHP framework used for building the backend API.
  - MySQL: A relational database management system used for storing user and note data.
  
- **Authentication:**
  - JWT (JSON Web Tokens): Used for secure user authentication and session management.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/saralnotes.git
   ```

2. **Backend Setup:**
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install the required packages:
     ```bash
     composer install
     ```
   - Configure the environment variables:
     - Create a `.env` file by copying `.env.example` and updating it with your database credentials.
     ```bash
     cp .env.example .env
     ```
   - Generate the application key:
     ```bash
     php artisan key:generate
     ```
   - Run the migrations:
     ```bash
     php artisan migrate
     ```

3. **Frontend Setup:**
   - Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install the required packages:
     ```bash
     npm install
     ```

4. **Running the Application:**
   - Start the backend server:
     ```bash
     php artisan serve
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

5. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend API.

## Usage

1. **Register:** Create a new account by providing a username, email, and password.
2. **Login:** Log in to your account using your credentials.
3. **Create Note:** Add new notes by providing a title and description.
4. **Edit Note:** Update any of your notes with new information.
5. **Delete Note:** Remove notes that you no longer need.
6. **Logout:** Log out of your account securely.

## Contribution

Feel free to contribute to the project by submitting issues or pull requests. Please follow the code of conduct and make sure your contributions align with the project’s goals.

## License

This project is licensed under the MIT License.

---

**SaralNotes** - Simple yet powerful note-taking at your fingertips!
