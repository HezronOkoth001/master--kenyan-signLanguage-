# Kenyan Sign Language (KSL)

A welcoming digital platform for learning, promoting, and practicing Kenyan Sign Language (KSL). This project is designed to help people understand the importance of communication access, connect with the deaf community, and book KSL training, classes, or consultations.

## Overview

This web application is a modern landing page for a Kenyan Sign Language business and educational platform. It highlights the mission of making communication more inclusive and easier for hearing and non-hearing communities to connect.

The website serves as a digital front door for:

- learning about Kenyan Sign Language
- understanding the mission and value of inclusivity
- exploring available training and consultation services
- choosing beginner, intermediate, or advanced classes
- contacting the business through WhatsApp or email

## Why this project exists

Many people want to learn sign language but do not know where to start. This platform helps by giving them a simple, friendly, and accessible introduction to KSL and by making it easy to reach out for classes or support.

## What the app does

The app is a front-end learning and marketing website. It does not provide a sign recognition system or an online classroom backend. Instead, it helps promote the business and makes the learning journey easy to understand.

Users can:

- read about the importance of KSL
- browse available services and class options
- understand pricing and course duration
- book a service or class through WhatsApp
- send a message directly to the business

## Key features

- Hero section with a strong communication-focused message
- About section explaining the mission and inclusion goals
- Services section with pricing and booking buttons
- Classes section with level-based course offerings
- Contact section with phone, email, WhatsApp, and location details
- Form that sends the user’s message directly to WhatsApp
- Responsive layout for mobile and desktop screens
- Video section showcasing visual communication and learning

## User journey

1. A visitor opens the homepage.
2. They see the main message: communication without barriers.
3. They learn about the purpose and mission of the platform.
4. They explore the services and KSL classes available.
5. If interested, they click a booking button.
6. A WhatsApp chat opens with a pre-filled message.
7. The user can continue the conversation and book a class or request help.

## Technologies used

- React
- Vite
- JavaScript
- CSS
- HTML

## Project structure

```bash
master--kenyan-signLanguage-/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
├── package-lock.json
└── .gitignore
```

## Main components

- Navbar: top navigation bar
- Hero: headline and brand introduction
- VideoSection: demonstration of visual communication
- About: mission and inclusion message
- Services: training and consultation offers
- Classes: beginner, intermediate, and advanced KSL classes
- Contact: business contact details and message form

## Booking and contact flow

The website includes WhatsApp booking buttons for services and classes. When a user clicks Book Now, the app creates a WhatsApp link using a phone number and sends a pre-filled message such as:

```text
Hello, I would like to book KSL Training. The price is KSh 1,500.
```

The contact form also collects a user’s name, email, and message, then opens WhatsApp with the message ready to send.

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/HezronOkoth001/master--kenyan-signLanguage-.git
```

### 2. Open the project folder

```bash
cd master--kenyan-signLanguage-
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the app in your browser

The app usually runs at:

```text
http://localhost:5173
```

## Notes

- This is a front-end website and does not include a backend database or authentication system.
- WhatsApp is used as the main communication channel for enquiries and bookings.
- The video section currently contains a sample video placeholder and should later be replaced with original KSL learning content.

## Future enhancements

- add a lesson library with common KSL vocabulary
- add a quiz system for learners
- add a blog or knowledge section
- add online class booking with a backend
- create dedicated pages for each service and class
- replace sample media with original Kenyan Sign Language resources

## Contact

The project includes contact information for the KSL business, including:

- phone number
- WhatsApp support
- email address
- location in Nairobi, Kenya

## License

This project does not currently include a license file. If you plan to share or publish it publicly, you may want to add an appropriate license such as MIT or Apache 2.0.

## Summary

This app is a modern, inclusive, and friendly platform for Kenyan Sign Language learning and communication. Its main goal is to help people understand KSL, connect with the deaf community, and access learning opportunities more easily.
