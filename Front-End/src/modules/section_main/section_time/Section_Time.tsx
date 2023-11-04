import { useEffect, useState } from "react";
import TimeDiv from "../../../components/Time";
import Time2 from "../../../components/Time2";
import { getToken } from "../../register/token"; // Путь к файлу api.ts
import { useCity } from "../../../components/CityContext";

const Time: React.FC = () => {
  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, []);
  const { city } = useCity();
  const jsessionId = localStorage.getItem("jsessionid");
  // Ваш fetch запрос
  useEffect(() => {
    console.log("город" + city); // Добавьте эту строку для проверки, меняется ли 'city'
    if (city) {
      fetch(`http://localhost:8080/getCurrentWeather?city=${city}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {})
        .catch((error) => {
          console.error("Ошибка при запросе данных:", error);
          // Дополнительная обработка ошибок
        });
    }
  }, [city]);
  return (
    <div id="timeSection" className="Time_section">
      {city ? (
        <h2 id="ChangeColor">{city}</h2>
      ) : (
        <p>Determining your city...</p>
      )}
      <div>
        {" "}
        <TimeDiv />
        <Time2 />
      </div>
    </div>
  );
};
export default Time;
