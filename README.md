# Developer Portfolio

## Folder Structure
```
project/
├── index.html          ← Main HTML file
├── css/style.css       ← All styles & animations
├── js/script.js        ← All JavaScript & interactions
├── images/             ← Add your images here (profile.jpg, about.jpg, project1-6.jpg)
├── resume/             ← Place your resume PDF here as resume.pdf
└── assets/             ← Additional assets
```

## Customization Guide

### 1. Your Name & Info
In `index.html`, search and replace:
- "Alex Johnson" → your name
- "alex@example.com" → your email
- "+1 (123) 456-7890" → your phone
- "San Francisco, CA" → your location
- Social links: update href="#" with your actual URLs

### 2. Profile Images
Add to `/images/`:
- `profile.jpg` — Hero section photo (square/portrait)
- `about.jpg` — About section photo (portrait 4:5 ratio)
- `project1.jpg` through `project6.jpg` — Project screenshots

### 3. Resume
Replace `/resume/resume.pdf` with your actual PDF resume.

### 4. Projects
Edit the 6 project cards in `index.html` under the Projects section:
- Update project name, description, and tags
- Add live demo and GitHub links
- Add project images

### 5. Skills
Edit skill percentages by changing `data-width="XX"` values (0–100).

### 6. Contact Form
The form currently simulates sending. To make it real, integrate:
- EmailJS (easiest, no backend)
- Formspree
- Your own backend API

## Libraries Used
- AOS.js — Scroll animations
- GSAP + ScrollTrigger — Advanced animations
- Typed.js — Typewriter effect
- Custom Canvas Particles — Background particles
- Font Awesome — Icons
- Devicon — Tech icons
- Google Fonts — Syne, DM Sans, JetBrains Mono
