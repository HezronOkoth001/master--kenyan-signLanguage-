# Kenyan Sign Language (KSL) Website

This project is a modern React-based landing page for a Kenyan Sign Language (KSL) company and learning platform. It is designed to promote Kenyan Sign Language education, increase awareness, and make it easy for people to learn, book classes, and get in touch.

## What this app does

This app does not act like a dictionary or translator. Instead, it is a marketing and education website for a KSL business. Its main purpose is to:

- introduce the KSL learning brand and mission
- explain what Kenyan Sign Language is and why it matters
- show the services offered, such as training and consultations
- display class packages for beginners, intermediates, and advanced learners
- allow users to contact the business through WhatsApp
- provide a visual section with an example sign-language video

In simple terms, the app helps people understand the value of Kenyan Sign Language and makes it easy for them to sign up for classes or ask questions.

## Main features

- Hero section with a strong message about learning and communication
- About section explaining the mission and importance of inclusion
- Services section with pricing and booking buttons
- Classes section with beginner, intermediate, and advanced levels
- Contact section with phone, WhatsApp, email, and location details
- Contact form that opens WhatsApp with the user’s message
- Responsive design for desktop and mobile screens
- Visual learning section with a sample video

## App flow

1. A visitor lands on the homepage.
2. They see the brand message and learn about the value of KSL.
3. They read the About section to understand the mission.
4. They browse the available services and classes.
5. If interested, they click Book Now or Send Message.
6. The app opens a WhatsApp chat with a pre-filled message so the user can continue the conversation.

This makes the website simple and practical for a business that relies on direct customer communication.

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
└── package-lock.json
```

## Key components

- Navbar - top navigation menu
- Hero - main headline and branding area
- VideoSection - demo video to support learning visuals
- About - mission and inclusion message
- Services - training and consultation offerings
- Classes - class packages and booking options
- Contact - contact information and message form

## How the booking works

Each Book Now button creates a WhatsApp link using a phone number already included in the code. The button sends a message such as:

- “Hello, I would like to book KSL Training. The price is KSh 1,500.”

The contact form also gathers the user’s name, email, and message, then sends that information to WhatsApp automatically.

## Getting started

1. Clone the repository

```bash
git clone https://github.com/HezronOkoth001/master--kenyan-signLanguage-.git
```

2. Open the project folder

```bash
cd master--kenyan-signLanguage-
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open the local URL shown in the terminal (usually http://localhost:5173)

## Notes

- The project is a front-end learning and business website, not a full backend app.
- WhatsApp is used as the primary communication channel.
- The video section currently contains a sample video placeholder and can be replaced with official KSL content later.

## Future improvements

- add real lesson content and sign vocabulary pages
- add a quiz or learning exercises section
- add authentication for students and instructors
- replace placeholder media with original Kenyan Sign Language videos
- connect the contact form to an email service or backend database

## Contact

For inquiries, the project includes contact details for the business, including WhatsApp and email.

## License

This project does not currently include a license file. If needed, add an appropriate open-source license before publishing it widely.
