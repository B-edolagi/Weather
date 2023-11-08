import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../components/Button";
import { getToken } from "../register/token"; // Путь к файлу api.ts
import { useCity } from "../../components/CityContext";

function Header1() {
  const [blocks, setBlocks] = useState<number[]>([]);
  const [token, setToken] = useState<string | null>("");
  const [temperature, setTemperature] = useState<number | null>(null); // State for temperature
  const [inputCity, setInputCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    const addBlock = () => {
      if (blocks.length < 6) {
        setBlocks([...blocks, blocks.length + 1]);
      }
    };
    addBlock();

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

        setTemperature(data.main.temp); // Set the temperature state

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
      <section>
        {blocks.map((blockNumber) => (
          <div key={blockNumber}>Block {temperature} content</div>
        ))}
      </section>
    </>
  );
}
export default Header1;
