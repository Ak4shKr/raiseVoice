# Aakrosh: RaiseUrVoice against corroution

This web portal allows users to raise complaints about corrupt officials and provides a platform for real-time discussions and complaint tracking. The portal is designed to help maintain transparency and accountability by allowing public participation in reporting and discussing corruption cases.

## Features

### 1. User Authentication
- **Email OTP Verification**: Secure user registration and login using email OTP verification.
- **JWT Token Authentication**: Ensures secure access to the portal with JSON Web Tokens (JWT) for user authentication.

### 2. User Roles
- **Admin Portal**: Admins can receive complaints, verify their authenticity, and decide whether to publish them.
- **User Portal**: Users can file complaints, track the status of their complaints, and participate in discussions.

### 3. Complaint Management
- **Raise Complaint**: Users can submit complaints against corrupt officials. Complaints are submitted along with a mandatory media file (photo or document) as evidence.
- **Anonymous Complaints**: Users have the option to file complaints anonymously to protect their identity.
- **Admin Verification**: Admins review all complaints and, after verification, decide if they should be made public.
- **Employee Appeal**: Employees who are named in complaints can raise a ticket to contest the complaints if they believe they are baseless or conspiratorial.

### 4. Real-Time Discussion
- **Socket.IO Integration**: Users can engage in real-time discussions on ongoing cases using the discussion forum powered by Socket.IO.

### 5. Analytics Dashboard
- **User Activity Tracking**: Users can view an analytics dashboard that provides insights into their complaint history, active discussions, and other activities.

### 6. Media Upload
- **Evidence Requirement**: Users must upload at least one piece of media (photo or document) to support their complaint, ensuring that complaints are substantiated.

### 7. Notifications
- **Real-Time Notifications**: Users receive real-time notifications about the status of their complaints and updates in discussion threads.

### 8. Admin Features
- **Complaint Management**: Admins can view, verify, publish, or reject complaints based on their validity.
- **User Management**: Admins can manage users, including banning or restricting access if needed.

## Installation

To get started with the Corruption Reporting Portal, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Ak4shkr/raiseVoice.git
    cd raiseVoice
    ```

2. **Install Backend Dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Install Frontend Dependencies**:
    ```bash
    cd frontend
    npm install
    ```

4. **Environment Variables**:
    Create a `.env` file in the `backend` directory and add your environment variables (e.g., JWT secret, database URI).

5. **Run the Application**:
    Start the backend server:
    ```bash
    cd backend
    npm start
    ```
    Start the frontend application:
    ```bash
    cd ../frontend
    npm start
    ```

6. **Access the Portal**:
    Open your browser and go to `http://localhost:3000` to start using the Corruption Reporting Portal.

## Technologies Used

- **Frontend**: ReactJs, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **Authentication**: JWT, Email OTP Verification, Nodemailer

## Contributing

We welcome contributions! If you have suggestions for improvements or new features, feel free to create an issue or submit a pull request.

### Features Summary

- **Register**:Secure user registration and login with email OTP verification.
- **Authentication**:JWT token-based authentication for secure access.
- **Admin panel**:Separate admin and user portals with role-specific functionalities.
- **Attack evidence**:Capability to file complaints with mandatory media evidence.
- **Anonmys**:Option to file complaints anonymously.
- **Discussion**:Real-time discussion forum powered by Socket.IO.
- **UserDashboard**:Analytics dashboard for tracking user activity.
- **RaiseTicket**:Employee appeal mechanism for contesting complaints.
- **Update**:Real-time notifications for updates and complaint status.
- **Managing at Admin sie**:Comprehensive complaint management system for admins.
  
## Contact

For any questions or feedback, please contact **Akash** mailto: akashsahabanaul@gmail.com.

---

*Thank you for using the raiseVoice portal. Your participation helps in fighting corruption and promoting transparency!*
