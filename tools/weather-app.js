module.exports = {
  name: "Weather MiniApp",
  slug: "weather-app",
  description: "A Farcaster-integrated Weather MiniApp for real-time weather conditions with adaptive greetings based on time of day, location detection, and comprehensive weather data from OpenWeatherMap API. Features clean UI with gradient backgrounds and weather icons.",
  category: ["Utility", "MiniApp"],
  tags: ["farcaster", "weather", "miniapp", "api", "location", "openweathermap"],
  status: "production",
  visibility: "public",
  liveUrl: "https://weather-base-app.vercel.app",
  github: "https://github.com/CryptoExplor/weather-mini-app",
  launched: "2025-11-09",
  
  // Farcaster integration
  farcaster: "https://farcaster.xyz/miniapps/EqlgelQ1dlTV/castweather",
  
  // Features
  features: [
    "Real-Time Weather - Current temp, humidity, wind speed, feels-like data",
    "Auto Location - Geolocation API for automatic city detection",
    "⏰ Adaptive Greetings - Time-based messages (morning, afternoon, evening)",
    "Comprehensive Data - Temperature, humidity, wind, pressure, visibility",
    "Weather Icons - Visual representations for different conditions",
    "Auto-Refresh - Updates weather data automatically",
    "Responsive UI - Clean mobile-friendly design with gradients",
    "Farcaster Frame - Optimized for Farcaster ecosystem"
  ],
  
  // Tech stack
  techStack: [
    "HTML5",
    "Vanilla JavaScript",
    "OpenWeatherMap API",
    "Farcaster Frame SDK",
    "Geolocation API",
    "CSS3 Gradients"
  ],
  
  // API integration
  apiIntegration: {
    provider: "OpenWeatherMap",
    endpoints: "Current weather, forecasts",
    features: "Temperature, humidity, wind, conditions"
  },
  
  stats: {
    github_stars: 0,
    deployments: 1,
    security_audit: "none"
  },
  
  keywords: ["farcaster", "weather", "miniapp", "api", "location", "utility"]
}
