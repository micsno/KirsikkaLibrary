# React + Vite
# Project 3 - Library App README

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Kirsikka Library is a project work developed as part of the Buutti Education web development course in 2024. The project was created by a team of four members, collaborating to build a comprehensive library application. The team utilized various technologies and frameworks, including React, Vite, and ESLint, to develop the application with modern web development practices. The project aims to provide users with a user-friendly interface to browse and search for books, read reviews, and manage their loans. It also incorporates user authentication to ensure secure access to the full functionality of the web page. The team followed best practices and guidelines to ensure a smooth development process and deliver a high-quality application.

## Official Plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Dependencies

To use `useMediaQuery`, install: `npm i @uidotdev/usehooks`

To use `Timestamp`, install: `npm i moment`

To get icons, install: `npm i react-social-icons`

## Image Credits

Pictures found from [Unsplash](https://unsplash.com/)

## Description

This web page leverages a library back-end to display a comprehensive range of features. The main interface, the Kirsikka page, presents an organized view of all available books categorized by genre, latest additions, and top-rated selections (cherry picks). Users can easily search for books using various criteria such as name, publication year, or ISBN. Upon selecting a book, detailed information, user reviews, and ratings will be displayed. 

Logged-in users can post their own reviews and ratings for books, as well as delete their own reviews if needed. Additionally, the profile page allows users to view their current loans, loan history, and personalized recommendations.

## User Authentication

To access the full functionality of the web-page, you need to log in or sign up. Once logged in, you can log out to end your session.

During the registration process, the API will generate a unique token for each user. This token can be used for authentication purposes when making API requests.

## Installation Instructions

**Notice:** The `main.jsx` filename needs to be written in lowercase. Using `Main.jsx` causes issues.

To use this software, follow these steps:

1. Clone the repository: `git clone https://github.com/micsno/KirsikkaLibrary.git`
2. Change directory to the project folder: `cd KirsikkaLibrary`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

These commands will clone the project from the GitLab repository, install all necessary dependencies listed in package.json, and start a development server for you to work with.

Please note that Vite is already included as part of the project dependencies, so there is no need to install it separately.