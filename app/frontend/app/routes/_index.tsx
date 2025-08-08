import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { getWeatherByCity, formatTemperature, capitalizeDescription } from "~/api-services/open-weather-service";
import type { WeatherResponse } from "~/api-services/open-weather-service";

export const meta: MetaFunction = () => {
  return [
    { title: "Weather App" },
    { name: "description", content: "Get current weather information for any city" },
  ];
};

export const loader: LoaderFunction = async () => {
  // Load default weather for Ottawa
  try {
    const defaultWeather = await getWeatherByCity("Ottawa");
    return json({ defaultWeather });
  } catch (error) {
    return json({ defaultWeather: null, error: "Failed to load default weather" });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const city = formData.get("city") as string;

  if (!city || city.trim() === "") {
    return json(
      { error: "Please enter a city name" },
      { status: 400 }
    );
  }

  try {
    const weather = await getWeatherByCity(city.trim());
    return json({ weather });
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Failed to fetch weather data" },
      { status: 500 }
    );
  }
};

export default function Index() {
  const { defaultWeather } = useLoaderData<{ defaultWeather: WeatherResponse | null }>();
  const actionData = useActionData<{ weather?: WeatherResponse; error?: string }>();
  const navigation = useNavigation();
  const [city, setCity] = useState("");

  const isLoading = navigation.state === "submitting";
  const currentWeather = actionData?.weather || defaultWeather;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ textAlign: "center", color: "#2563eb", marginBottom: "2rem" }}>
          🌤️ Weather App
        </h1>

        <div style={{ marginBottom: "2rem" }}>
          <Form method="post" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name (e.g., Toronto, London)"
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "2px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "1rem",
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: isLoading ? "#9ca3af" : "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Loading..." : "Get Weather"}
            </button>
          </Form>
        </div>

        {actionData?.error && (
          <div style={{
            padding: "1rem",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            borderRadius: "0.5rem",
            marginBottom: "2rem",
            border: "1px solid #fecaca"
          }}>
            ❌ {actionData.error}
          </div>
        )}

        {currentWeather && (
          <div style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "1rem",
            padding: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.5rem" }}>
                  📍 {currentWeather.data.name}, {currentWeather.data.sys.country}
                </h2>
                <p style={{ margin: "0.5rem 0", color: "#64748b" }}>
                  Data source: {currentWeather.source === 'cache' ? '📦 Cache' : '🌐 Live API'}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "3rem", margin: 0 }}>
                  {formatTemperature(currentWeather.data.main.temp)}
                </div>
                <div style={{ color: "#64748b" }}>
                  Feels like {formatTemperature(currentWeather.data.main.feels_like)}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              <div>
                <h3 style={{ color: "#374151", marginBottom: "0.5rem" }}>🌤️ Conditions</h3>
                <p>{capitalizeDescription(currentWeather.data.weather[0].description)}</p>
              </div>
              
              <div>
                <h3 style={{ color: "#374151", marginBottom: "0.5rem" }}>🌡️ Temperature</h3>
                <p>High: {formatTemperature(currentWeather.data.main.temp_max)}</p>
                <p>Low: {formatTemperature(currentWeather.data.main.temp_min)}</p>
              </div>
              
              <div>
                <h3 style={{ color: "#374151", marginBottom: "0.5rem" }}>💧 Details</h3>
                <p>Humidity: {currentWeather.data.main.humidity}%</p>
                <p>Pressure: {currentWeather.data.main.pressure} hPa</p>
              </div>
              
              <div>
                <h3 style={{ color: "#374151", marginBottom: "0.5rem" }}>💨 Wind</h3>
                <p>Speed: {currentWeather.data.wind.speed} m/s</p>
                <p>Direction: {currentWeather.data.wind.deg}°</p>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#e0f2fe", borderRadius: "0.5rem" }}>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "#0369a1" }}>
                💡 This weather data is fetched from our backend API with Redis caching for improved performance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}