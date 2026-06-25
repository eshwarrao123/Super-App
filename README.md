# Super App

A personalized entertainment application that allows users to register, select their favorite entertainment categories, and access a customized dashboard featuring live weather, news, a countdown timer, and movie recommendations.

## Features

- User Registration
- Category Selection
- Protected Routes
- Personalized Dashboard
- Weather Widget
- News Carousel
- Notes Widget (Local Storage)
- Countdown Timer
- Movie Recommendations
- Responsive UI

## Tech Stack

- React 19
- Vite
- React Router
- Zustand
- Axios
- CSS3
- OpenWeather API
- News API
- TMDB API

## Project Structure

  - `src/` - Main application source code
  - `components/` - Reusable UI widgets and elements
  - `pages/` - Top-level route views (Register, Categories, Dashboard, Movies)
  - `services/` - Centralized API fetching layer
  - `store/` - Global state management configuration
  - `routes/` - Route definitions and protected route logic
  - `assets/` - Static images, fonts, and global stylesheets

## Installation

```bash
git clone https://github.com/eshwarrao123/Super-App.git
cd super-app
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the project root and add your API keys:

```env
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_NEWS_API_KEY=your_news_api_key
VITE_TMDB_API_KEY=your_tmdb_api_key
```



## Future Improvements

- Better animations
- Improved accessibility
- Performance optimization
- Dark/Light theme

---

## Project Analysis

### Objective
The objective of this project was to build a personalized entertainment application where users can register, select preferred categories, and receive customized content.

### Architecture
The application follows a component-based architecture using React and Vite. State management is handled using Zustand. Routing is implemented using React Router. API communication is handled using Axios.

### Key Features
- User Registration
- Category Selection
- Protected Routes
- Personalized Dashboard
- Weather Integration
- Live News Carousel
- Persistent Notes
- Countdown Timer
- Movie Recommendations

### Challenges Faced
- Managing protected routes
- Handling multiple APIs
- Making the dashboard responsive
- Synchronizing local storage with Zustand
- Designing layouts similar to the Figma

### Improvements
Future improvements include:
- Authentication
- Better animations
- Theme switching
- Pagination
- Better accessibility
- Unit testing

### Learning Outcomes
This project improved my understanding of:
- React architecture
- Zustand state management
- API integration
- Responsive UI
- Component reusability
- Route protection
- Project organization
