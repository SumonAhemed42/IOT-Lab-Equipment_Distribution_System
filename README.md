# IoT Lab Equipment Distribution System

## Overview
The **IoT Lab Equipment Distribution System** is a web-based platform designed to streamline the process of equipment distribution in educational institutions. It enables students, teachers, and lab attendants to manage lab equipment efficiently, securely, and transparently. Built with HTML, CSS, JavaScript, PHP, and MySQL, the system ensures seamless data management and user-friendly interaction.

---

## Features
- **Real-Time Equipment Tracking**: Check availability, usage, and distribution of lab equipment.
- **Role-Based Dashboards**:
  - **Students**: Apply for equipment, track applications, and confirm usage.
  - **Teachers**: Approve or reject student requests.
  - **Lab Attendants**: Manage inventory, handle distribution, and update records.
- **Secure Data Handling**: Ensures all transitions are logged and critical records are non-editable.
- **User-Friendly Interface**: Search, filter, and manage data effortlessly with a responsive design.
- **No-Reload System**: Smooth interactions using AJAX for dynamic updates.

---

## System Requirements
### Hardware
- **Server**: 
  - Processor: 7th generation i5
  - RAM: 128MB
  - Storage: 20GB minimum
- **Client**:
  - Same as server specs.

### Software
- **Platform**: Windows 8-11
- **Tools**:
  - [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
  - [XAMPP](https://www.apachefriends.org/index.html) for server and database management.
- **Technologies**:
  - **Frontend**: HTML, CSS, JavaScript
  - **Backend**: PHP, MySQL
  - **Frameworks**: jQuery, AJAX

---

## Process Flow
1. **Student**:
   - Apply for equipment via the dashboard.
   - Provide quantity, purpose, and teacher reference.
2. **Teacher**:
   - Review and approve/reject student applications.
3. **Lab Attendant**:
   - Verify teacher approval.
   - Update distribution and return timestamps.
4. **Completion**:
   - Return equipment and close the record.

---

## Database Structure
### Tables
1. **student_information**: Stores student details.
2. **teacher_information**: Stores teacher details.
3. **apply_related_data**: Tracks student applications.
4. **equipment_related_data**: Manages inventory.
5. **provide_confirm_Status**: Logs distribution and return confirmations.

---

## Installation
1. Install **XAMPP** and ensure Apache and MySQL are running.
2. Import the database schema provided in `database.sql` to MySQL.
3. Place the project files in the `htdocs` folder of XAMPP.
4. Open the project in a browser via `localhost/project-folder`.

---

## Screenshots
### Student Dashboard
- View personal info, apply for equipment, and track applications.

### Teacher Dashboard
- Approve/reject student requests and manage records.

### Lab Attendant Dashboard
- Manage inventory, handle distributions, and confirm returns.

---

## Future Enhancements
- **Email Notifications**: Automate communication between users.
- **Image Updates**: Allow users to upload/update profile pictures.
- **Additional Records**: Include fields like age and birthdate for detailed profiles.
- **Extended Reporting**: Generate detailed usage reports for analysis.

---

## Authors
- **Sumon Ahemed** (1801042)
- **Mohaimenul Islam Mahin** (1901025)
- **Bitta Boibhov Barmon** (1901050)

**Supervisor**: Nurjahan Nipa, Assistant Professor, Department of Internet of Things & Robotics Engineering , BDU.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## References
1. [PHP CRUD Operation](https://www.tutorialrepublic.com/php-tutorial/php-mysql-crud-application.php)
2. [jQuery AJAX Tutorial](https://www.w3schools.com/jquery/jquery_ref_ajax.asp)
3. [JavaScript Checkbox](https://www.w3schools.com/jsref/prop_checkbox_checked.asp)
4. [PHP Associative Arrays](https://www.w3schools.com/php/php_arrays_associative.asp)
