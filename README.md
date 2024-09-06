<div align="center">
    <h1>WorkIndia IRCTC Assignment</b></h1>
</div>

## 🎓Overview
The Railway Management System is a web application designed to facilitate train booking and management. It provides functionalities for both administrators and logged-in users.

### Key Features
1. User Roles:
          Admin: Responsible for managing trains, including adding new trains, updating seat availability, and other administrative tasks.
          Logged-in Users: Can check train availability, seat availability between stations, book seats, and view booking details.
          
2. Real-time Train Availability:
          Users can check the availability of trains between two stations in real-time.
          Seat availability is displayed dynamically, allowing users to decide on booking based on current availability.
   
3. Booking System:
        Users can book seats if available.
        Concurrent booking scenarios are handled to prevent overbooking through race condition management.
   
4. Role-Based Access Control (RBAC):
        Different functionalities are accessible based on the user's role.
        Admins have full control over train management and system configurations.
        Logged-in users have restricted access to booking and checking functionalities.

5. Security Measures:
        Authentication and authorization mechanisms are implemented to secure user data and operations.
        Admin actions are protected to prevent unauthorized modifications.

## 👨‍💻 Tech Stack
Node.js<br></br>
Express.js<br></br>
MySQL<br></br>

## Setup

1. Clone the repository.
2. Install all the dependencies ( npm install )
3. Create a db connection and add a .env file with all these credentials: PORT, USER, HOST, PASSWORD, JWT_SECRET.
4. Start a server (node index.js).
5. Verify the details using Postman.

## Screenshots

### Admin Registration
![workday_assign-1png](https://github.com/user-attachments/assets/b66be32b-12a0-43d4-974c-47d6ab50f195)
![workday-assgn-2](https://github.com/user-attachments/assets/a9d8e243-cb1e-4c77-936e-4637e61fde4c)



### Admin Login
![wrokday-assgn-3](https://github.com/user-attachments/assets/bb2e596b-d598-42c7-a9d0-90e8c08fa212)


### Add Train by Admin
![workday-assgn-4](https://github.com/user-attachments/assets/41c9d3af-10e5-44ab-967f-9bd2557ba3fa)
![workday-assgn-5](https://github.com/user-attachments/assets/cac403ec-5715-4f7d-93f3-a9884b5ec0fb)


### Get Train details
![workday-assgn-6](https://github.com/user-attachments/assets/e22b9df5-6928-490e-91fc-26a330145e50)


### Book a Seat 
![workday-assgn-7](https://github.com/user-attachments/assets/504c5fc3-3c23-4457-8cae-dab54f017dd5)


### Get Specific booking details
![workday-assgn-8](https://github.com/user-attachments/assets/ea728585-8825-4c39-a1a7-04a874099a8e)
![workday-assgn-9](https://github.com/user-attachments/assets/c94b3617-4de0-45f4-8ca3-5c4aed68cc86)


## How to handle Race Condition

Row-Level Locking: When a user initiates a booking, the specific row for that train is locked during the transaction. This lock prevents other transactions from accessing or altering the same row until the ongoing transaction completes, either by being committed or rolled back.

Transactional Integrity: All actions, including locating the train, updating the seat count, and creating the booking, are executed within a single transaction. This ensures that either all actions are completed successfully, or none are, thereby maintaining the integrity of the database.

Example Scenario:

1. User A begins a booking transaction, locking the row for the specific train.
2. User B attempts to book a seat on the same train while User A's transaction is still active. Since the row is locked, User B's request is put on hold until User A's transaction concludes.
3. Once User A's transaction is either committed or rolled back, User B's request proceeds. If User A booked the last available seat, User B will find no seats available and receive a "No available seats" message.
   
This approach ensures that no two users can book the same seat simultaneously, effectively preventing race conditions and ensuring consistent and reliable seat booking.

