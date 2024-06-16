import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext(null);

const api = {
  key: "da3da065f06c2b416e8ef4c190b96742",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [theme, setTheme] = useState("dark");

  const [search, setState] = useState("");
  const [weather, setWeather] = useState({});

  const searchPress = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      });
  };

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <header className="App-header">
          <h1>Weather App</h1>
          <div>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setState(e.target.value)}
            />
            <button onClick={searchPress}>Search</button>
          </div>
          <p>{weather.name}</p>
          <p>{weather.main.temp}&deg;C</p>
          <div>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        </header>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
