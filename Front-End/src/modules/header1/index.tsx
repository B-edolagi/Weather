import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../components/Button";
import { getToken } from "../register/token"; // Путь к файлу api.ts
import { useCity } from "../../components/CityContext";
import SectionMain from "../section_main/section_main";
import SectionSecond from "../section_second/section_second";

function Header1() {
  const [showContent, setShowContent] = useState(false); // State variable to control content visibility
  const [token, setToken] = useState<string | null>("");
  const [cityData, setCityData] = useState<
    {
      city: string;
      temperature: number | null;
      weatherIcon: string;
      speed: number | null;
      feels: number | null;
    }[]
  >([]);
  const [inputCity, setInputCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [blockCounter, setBlockCounter] = useState(0);
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, []);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value);
  };

  const { city, setCity } = useCity();

  const handleFetchWeather = async () => {
    if (inputCity) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/getCurrentWeather?city=${inputCity}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (setCity) {
          setCity(inputCity);
        }

        const newCityData = {
          city: inputCity,
          temperature: data.main.temp,
          weatherIcon: data.weather[0].main,
          speed: Math.round(data.wind.speed),
          feels: data.main.feels_like,
        };
        if (blockCounter < 8) {
          setCityData([...cityData, newCityData]);
          setBlockCounter(blockCounter + 1);
        } else {
          // Handle the case where the maximum number of blocks is reached.
          // You can show an alert or take any other appropriate action.
        }

        // Other data processing actions
      } catch (error) {
        // Error handling
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [isMoved, setIsMoved] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const changeBlockColor = () => {
    setIsMoved(!isMoved);
    setIsLightMode(!isLightMode);
    const elements = [
      "timeSection",
      "TodaySection",
      "Forecast",
      "ForecastHours",
      "paragraph",
      "footer__container",
      "h2",
      "lox",
      "h22", // Add the ID for the new h2 element
      "lox22", // Add the ID for the new p element
    ];

    elements.forEach((elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        const originalColor = element.dataset.originalColor || "";
        const currentColor = element.style.backgroundColor;
        const originalTextColor = element.dataset.originalTextColor || "";
        const currentTextColor = element.style.color;

        if (
          elementId !== "paragraph" &&
          elementId !== "h2" &&
          elementId !== "lox" &&
          elementId !== "h22" &&
          elementId !== "lox22"
        ) {
          if (currentColor !== "rgb(68, 68, 68)") {
            // Save the original background color if it hasn't been saved yet
            if (originalColor === "") {
              element.dataset.originalColor = currentColor;
            }

            element.style.backgroundColor = "rgb(68, 68, 68)";
            element.style.color = "white";
          } else {
            // Restore the original background color
            element.style.backgroundColor = originalColor;
            element.style.color = originalTextColor;
          }
        } else if (
          elementId === "paragraph" ||
          elementId === "h2" ||
          elementId === "h22"
        ) {
          if (originalTextColor === "") {
            element.dataset.originalTextColor = currentTextColor;
          }
          if (currentTextColor !== "white") {
            element.style.color = "white";
          } else {
            element.style.color = "rgb(82, 64, 64)";
          }
        } else if (elementId === "lox" || elementId === "lox22") {
          if (originalTextColor === "") {
            element.dataset.originalTextColor = currentTextColor;
          }
          if (currentTextColor !== "white") {
            element.style.color = "white";
          } else {
            element.style.color = "rgb(82, 64, 64)";
          }
        }
      }
    });

    const body = document.getElementById("mainBody");
    if (body) {
      const originalBodyColor = body.dataset.originalBodyColor || "";
      const currentBodyColor = body.style.backgroundColor;

      if (currentBodyColor !== "rgb(51, 51, 51)") {
        // Save the original body color if it hasn't been saved yet
        if (originalBodyColor === "") {
          body.dataset.originalBodyColor = currentBodyColor;
        }

        body.style.backgroundColor = "rgb(51, 51, 51)";
      } else {
        // Restore the original body color
        body.style.backgroundColor = originalBodyColor;
      }
    }
  };
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
        console.log("Token set:", token);
      }
    });
  }, []);
  const sendRequestToServer = (cityName: string) => {
    console.log("Token before request:", token);
    if (!token) {
      // Handle the case where the token is missing or empty
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch(`http://localhost:8080/getCurrentWeather?city=${cityName}`, {
      method: "GET",
      credentials: "include",
      headers,
    })
      .then((response) => {
        // ... Your response handling code ...
      })
      .catch((error) => {
        // Handle errors
      });
  };

  const toggleContent = (cityName: string) => {
    sendRequestToServer(cityName); // Send the request with the city name
    setShowContent(!showContent); // Toggle the content visibility
  };
  return (
    <>
      <header>
        <div className="header__list">
          <div className="list_switcher">
            <div className={`switcher_block ${isMoved ? "moved" : ""}`}>
              <button
                className="switcher_press"
                onClick={changeBlockColor}
                id="movingButton"
              ></button>
            </div>
            <p id="paragraph">{isLightMode ? "Light Mode" : "Dark Mode"}</p>
          </div>
          <label htmlFor="search" className="list_search">
            <input
              type="text"
              placeholder="Введите город"
              value={inputCity}
              onChange={handleCityChange}
              id="search"
            />
          </label>
          <>
            <button
              onClick={handleFetchWeather}
              disabled={isLoading}
              className="Current_btn"
            >
              {isLoading ? "Загрузка..." : "Confirm"}
            </button>
          </>
        </div>
      </header>
      {showContent ? (
        <>
          <SectionMain /> {/* Display SectionMain component */}
          <SectionSecond /> {/* Display SectionToday component */}
        </>
      ) : (
        <section className="section">
          <div className="section_wrap">
            {cityData.map((cityInfo, index) => (
              <div
                key={index}
                className={`section_div ${
                  isLightMode ? "light-mode" : "dark-mode"
                }`}
              >
                <h1>
                  {cityInfo.city.charAt(0).toUpperCase() +
                    cityInfo.city.slice(1)}
                </h1>

                <img
                  src={"./src/assets/" + cityInfo.weatherIcon + ".png"}
                  alt="Weather Icon"
                  width="156px"
                  height="156px"
                />
                <div className="blocks_flex">
                  <h2>Tempreature:{cityInfo.temperature}°C</h2>
                  <p>Feels like:{cityInfo.feels}°C</p>
                  <p>Speed: {cityInfo.speed}km/h</p>
                </div>
                <button
                  className="Main_btn"
                  onClick={() => sendRequestToServer}
                >
                  .!.
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
export default Header1;
