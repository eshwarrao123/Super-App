import axios from "axios";

/**
 * apiServices.js
 *
 * Central API service layer.
 * All base URLs and API keys are read from environment variables.
 * Individual service files (weatherApi.js, newsApi.js, movieApi.js) re-export
 * from here, keeping the architecture modular without duplication.
 */

// ---------- Axios clients ----------

const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

const newsClient = axios.create({
  baseURL: "https://newsapi.org/v2",
});

const movieClient = axios.create({
  baseURL: "https://www.omdbapi.com",
});

// ---------- API keys (from .env) ----------

const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const NEWS_KEY = import.meta.env.VITE_NEWS_API_KEY;
const MOVIE_KEY = import.meta.env.VITE_MOVIE_API_KEY;

// ---------- Weather ----------

export const fetchCurrentWeather = async (city) => {
  try {
    const response = await weatherClient.get(
      `/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Weather fetch failed:", error);
    throw error;
  }
};

// ---------- News ----------

export const fetchTopHeadlines = async (category = "general") => {
  try {
    const response = await newsClient.get(
      `/top-headlines?category=${category}&language=en&apiKey=${NEWS_KEY}`
    );
    return response.data.articles || [];
  } catch (error) {
    console.error("News fetch failed:", error);
    throw error;
  }
};

// ---------- Movies ----------

export const searchMovies = async (query) => {
  try {
    const response = await movieClient.get(
      `/?s=${encodeURIComponent(query)}&type=movie&apikey=${MOVIE_KEY}`
    );
    return response.data.Search || [];
  } catch (error) {
    console.error("Movie search failed:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await movieClient.get(
      `/?i=${imdbID}&plot=full&apikey=${MOVIE_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Movie detail fetch failed:", error);
    throw error;
  }
};