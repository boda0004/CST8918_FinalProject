// Updated to call our backend instead of OpenWeather API directly

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherResponse {
  source: 'api' | 'cache';
  data: WeatherData;
}

/**
 * Fetches weather data for a given city from our backend API
 */
export async function getWeatherByCity(city: string): Promise<WeatherResponse> {
  try {
    // Call our backend instead of OpenWeather API directly
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/weather?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}: ${response.statusText}`);
    }
    
    const weatherData: WeatherResponse = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to fetch weather data: ${error.message}`
        : 'Failed to fetch weather data'
    );
  }
}

/**
 * Get the backend URL based on environment
 */
function getBackendUrl(): string {
  // In development, use localhost
  if (typeof window !== 'undefined') {
    // Browser environment
    return 'http://localhost:3000';
  }
  
  // Server-side rendering environment
  // In production, this would be your Kubernetes service URL
  return process.env.BACKEND_URL || 'http://localhost:3000';
}

/**
 * Helper function to format temperature
 */
export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`;
}

/**
 * Helper function to capitalize weather description
 */
export function capitalizeDescription(description: string): string {
  return description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}