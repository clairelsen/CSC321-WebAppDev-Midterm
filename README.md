# CSC321-WebAppDev-Midterm

HabitQuest: Gamified Habit Tracker

Overview: HabitQuest is a gamified habit and to-do list tracker designed to boost user motivation and consistency by rewarding task completion with virtual resources (XP and Gold) and a progressive challenge (Boss Battle).

Application Architecture: 

HabitQuest utilizes a modern, JavaScript-centric MERN Stack (MongoDB, Express.js, React, Node.js) architecture.

The Frontend uses React (as seen in script.js) to manage the entire user interface, handle component state (like userData and habits), and render the UI elements, including the ShopModal and AnalyticsModal. All user interactions, such as button clicks and form submissions, are captured and managed by React components.

The Backend is built with Node.js and the Express.js framework. Its primary roles are to serve the static React files, implement the core game logic (e.g., calculating XP/Gold rewards, validating shop purchases), and manage all data persistence. This logic mediates the flow of information between the frontend and the MongoDB database. MongoDB, a NoSQL database, would store the application's data across several collections. The User collection would hold all core hero statistics like level, xp, gold, bossHp, and customization details. The Habit collection would store quest details like difficulty, streak, and isDaily, each referenced back to the owning userId. Finally, the JournalEntry collection would store the user's timestamped self-reflections.

API Routes and Frontend Interaction: The Express.js backend exposes a RESTful API through various routes and HTTP methods to communicate with the React frontend and ensure data is persistently backed up.

User and Customization: The frontend would use a GET request to /api/user/me to load the hero's current status and a PATCH request to the same route to save updates from the Hero Customization modal.

Quest Management and Rewards: The QuestList would load all tasks via a GET request to /api/habits. To add a new quest, the frontend sends a POST request to the same /api/habits route. The most critical interaction occurs when a user completes a task: a POST request is sent to /api/habits/:id/complete. This single route triggers the entire game loop on the server, which calculates the rewards, updates the user's XP/Gold, decrements the bossHp, and increments the quest's streak in the database. Deleting a quest is a simple DELETE request to /api/habits/:id.

Shop and Analytics: The Virtual Shop functionality sends a POST request to /api/user/purchase to process a shop item sale, which the server validates against the user's current gold before updating the user's resources. The AnalyticsModal relies on GET requests to /api/habits (for completion ratio) and /api/leaderboard (for global rankings) to populate the reports with live data.

Journaling: The JournalModal manages reflections via GET requests to /api/journal for fetching existing entries, POST requests to the same route for saving a new reflection, and DELETE requests to /api/journal/:id for removing an entry.
