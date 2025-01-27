=============[ Task Management & Social Feed Web Application ]==================

Project Description
---------------------
This web application combines basic user authentication, a task management system, and a user feed to post content. It is designed to provide a seamless user experience for managing tasks and sharing content. The backend is built using Node.js, Express, and MongoDB, while the frontend is developed using React. Key functionalities include a drag-and-drop task management system, password management, and image upload integration with Cloudinary.



Features Implemented
---------------------
* User Authentication
    Register: Users can create an account using their name, email, and password.
    Login: Users can log in with their email and password.
    Forgot Password: Users can reset their password with email-based reset functionality.

* Task Management System
    Create Task: Users can add tasks with a name and description.
    Task Columns:
    Divided into Pending, Completed, and Done.
    Drag-and-drop functionality enables easy status updates.
    Delete Task: Each task has a delete icon. Users are prompted for confirmation before deletion.

* Feed Section
    Users can post content that includes:
    Photo Upload: Upload photos to Cloudinary for secure storage and retrieval.
    Captions: Add a descriptive caption for each post.



Steps to Run the Project
--------------------------
* Backend Setup

    -> Navigate to the backend folder:
        cd backend

    -> Install dependencies:
        npm install

    -> Create a .env file in the backend directory with the following variables:
        PORT=5000
        MONGO_URI=<your-mongodb-connection-string>
        JWT_SECRET=<your-jwt-secret>
        CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
        CLOUDINARY_API_KEY=<your-cloudinary-api-key>
        CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

    -> Start the server:
        npm start

* Frontend Setup

    -> Navigate to the frontend folder:
        cd frontend

    -> Install dependencies:
        npm install

    -> Start the React application:
        npm start



Access the Application
------------------------
Open your browser and navigate to:
http://localhost:3000  (or)  add a frontend port of your choice

The backend will run on:
http://localhost:5000  (or)  add a backend port of your choice