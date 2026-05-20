# SmartLife Assist

SmartLife Assist is a mobile task management application developed for CSE5007 Mobile Application Development - Assessment 4. The application helps users manage tasks, reminders, emergency alerts, AI suggestions, GPS features, and accessibility settings using Firebase and React Native technologies.

---

# Main Features

- Firebase Authentication (Login and Signup)
- Firestore cloud database
- SQLite local task storage
- Add, edit, delete and manage tasks
- AI task suggestions using Gemini API
- Local push notifications
- GPS and Google Maps integration
- Emergency contact alert system
- Accelerometer motion sensor
- Battery status monitoring
- Parallel asynchronous processing
- Background task registration
- Dark mode and large text accessibility
- Jest testing
- Firebase Test Lab testing
- Android APK deployment using EAS

---

# Project Structure

```text
SmartLifeAssist/
│
├── app/
├── assets/
├── components/
├── contexts/
├── services/
├── types/
├── __tests__/
│
├── app.json
├── eas.json
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

# Required Software

Install the following software before running the project:

- Node.js
- npm
- Expo CLI
- Android Studio
- Android Emulator or Android phone
- EAS CLI
- Firebase account

---

# Install Project Dependencies

Open terminal inside the project folder:

```bash
cd SmartLifeAssist
npm install
```

If dependency conflicts happen:

```bash
npm install --legacy-peer-deps
```

---

# Start the Application

Run Expo development server:

```bash
npx expo start
```

For development build:

```bash
npx expo start --dev-client
```

If cache issue occurs:

```bash
npx expo start --dev-client -c
```

---

# Run Android Emulator

1. Open Android Studio
2. Start Android emulator
3. Run:

```bash
npx expo start --dev-client
```

4. Press:

```bash
a
```

This opens the application on Android emulator.

---

# Firebase Setup

Firebase services are configured inside:

```text
services/firebase.ts
services/firestoreTasks.ts
```

The application uses:

- Firebase Authentication
- Cloud Firestore

Before public submission or public GitHub upload, sensitive API keys should be replaced with placeholder values such as:

```text
YOUR_API_KEY
```

---

# Google Maps Setup

Google Maps API configuration is stored in:

```text
app.json
```

The app uses Google Maps Android SDK for map preview and GPS location display.

---

# Run Jest Tests

The project includes unit, integration and feature-level testing.

Run tests using:

```bash
npx jest
```

Expected result:

```text
Test Suites: 3 passed
Tests: 9 passed
```

Current test files:

```text
__tests__/taskValidation.test.ts
__tests__/taskSorting.test.ts
__tests__/aiFallback.test.ts
```

---

# Firebase Test Lab

Firebase Test Lab Robo Testing was used for automated device testing.

## Steps

1. Build APK using EAS
2. Open Firebase Console
3. Open Test Lab
4. Select Robo Test
5. Upload APK
6. Select Android device
7. Run test
8. Save passed result screenshots

---

# Build Android APK

Development APK build:

```bash
eas build --platform android --profile development
```

Preview APK build:

```bash
eas build --platform android --profile preview
```

After build completes:

- download APK from EAS dashboard
- install APK on Android device

---

# Main Application Usage

## 1. Signup

Create a new account using email and password.

---

## 2. Login

Login using Firebase Authentication.

---

## 3. Add Task

Press ADD TASK and enter:

- title
- description
- due date
- due time

Then save the task.

---

## 4. View Task

Saved tasks appear on the dashboard screen.

---

## 5. Edit Task

Open task details and press EDIT TASK.

---

## 6. Delete Task

Open task details and press DELETE TASK.

---

## 7. AI Suggestions

Press AI SUGGESTIONS to generate productivity suggestions using Gemini API.

---

## 8. Reminder Notifications

Open reminder screen and press SET REMINDER to create local notification reminder.

---

## 9. Location Features

Open Location Settings to:

- access current GPS location
- view Google Maps preview
- view detected address

---

## 10. Emergency Alerts

Open Emergency screen to:

- prepare emergency alert message
- include GPS location
- share message using device sharing options

---

## 11. Motion Sensor

Open Motion Sensor screen to monitor accelerometer movement data.

---

## 12. Parallel Processing

Open Parallel Processing screen to load:

- battery information
- SQLite task data
- Firestore task data

using Promise.all().

---

## 13. Work Manager

Open Work Manager screen and register background task service.

---

## 14. Settings

The Settings screen allows users to:

- enable dark mode
- enable large text mode
- check battery status
- access device feature screens
- logout from application

---

# Testing Evidence Required

Include screenshots for:

- Jest test results
- Firebase Test Lab results
- Login and signup
- CRUD operations
- Firestore database
- SQLite storage
- AI suggestions
- Maps and GPS
- Notifications
- Emergency alerts
- Work Manager
- Motion sensor
- APK build
- GitHub commits
- Azure DevOps sprint boards

---

# Known Limitations

- AdMob is included as demonstration feature because older Expo AdMob package caused compatibility issues with latest Expo SDK.
- AI suggestions require internet connection.
- Background task execution timing depends on Android operating system scheduling.
- API keys should be secured before public repository deployment.

---

# Assessment 4 Notes

This project demonstrates:

- Firebase integration
- local storage
- mobile device APIs
- testing and deployment
- Android build generation
- Azure DevOps sprint planning
- GitHub version control

as required for Assessment 4 Mobile Application Development.