---

# **To-Do List Application**

A simple and interactive web-based To-Do List application that helps users organize their tasks. Users can add, delete, and mark tasks as completed with a clean and responsive interface.

---

## **Features**

1. **Add Tasks**  
   Users can input task names into a text field and add them to the to-do list by clicking the **Add Task** button.

2. **Mark Tasks as Completed**  
   Tasks can be marked as completed, and completed tasks are visually distinguished (e.g., with a strikethrough).

3. **Delete Tasks**  
   Users can delete tasks from the list with a single click.

4. **Dynamic Updates**  
   The task list dynamically updates as users add, complete, or remove tasks.

---

## **Tech Stack**

### **Frontend**
- **React**: Handles the UI and dynamic task list updates.

### **Styling**
- Basic CSS for styling (can be expanded with Tailwind, Bootstrap, etc.).

---

## **How to Run the Project**

### **Prerequisites**
- Node.js installed on your machine.
- A code editor (e.g., VSCode).

### **Setup Steps**
1. Clone the repository:
   ```bash
   git clone github.com/CSE389-Team-TBD/Todo
   ```
2. Navigate to the project directory:
   ```bash
   cd Todo
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open the application in your browser:
   - Go to `http://localhost:3000`.

---

## **Folder Structure**

```
todo-app/
├── src/
│   ├── components/        # React components for the UI
│   │   ├── Auth.js        # Authentication screen
│   │   ├── ToDoList.js    # To-do list screen
│   │   ├── NavBar.js      # Navigation bar
│   ├── styles/            # CSS or Tailwind styles
│   │   ├── Auth.css       # Styling for Auth component
│   │   ├── ToDoList.css   # Styling for ToDoList component
│   ├── firebase.js        # Firebase configuration
│   ├── App.js             # Main app file with routing
│   ├── index.js           # React entry point
│   ├── index.css          # Global CSS or Tailwind setup

```

---

## **Future Enhancements**

1. **Task Prioritization**  
   Add functionality to categorize tasks as High, Medium, or Low priority.

2. **Persistent Storage**  
   Integrate Firebase Firestore for saving tasks to a database.

3. **Authentication**  
   Implement Firebase Authentication to allow users to log in and manage their tasks securely.

4. **Responsive Design**  
   Improve styling to make the app mobile-friendly.

5. **Advanced Features**  
   Add options to sort tasks, share tasks via a link or email, and filter tasks by completion status.

---

## **Contributing**

Contributions are welcome! Please fork the repository and create a pull request for any feature you’d like to add or improve.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Authors**

- **Adya** - Frontend Development  
- **Manu** - API, Web Server Setup
- **Abheek** - Database Setup
- **Joshua** - Firebase Authentication  

---
