import React, { useState, useEffect } from "react";
import { getToken } from "../../register/token"; // Путь к файлу api.ts
import { useCity } from "../../../components/CityContext";
function Today() {
  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, []);
  const [temperature, setTemperature] = useState(null);
  const [feel, setFeel] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [uv, setUv] = useState(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [sunrise, setSunrise] = useState<null | string>(null); // Используйте null как начальное значение
  const [sunset, setSet] = useState<null | string>(null); // Используйте null как начальное значение
  const [weather, setWeather] = useState<string | undefined>("");
  const [txt, setTxt] = useState(null);
  var data = new URLSearchParams();
  data.append("username", "ilya");
  data.append("password", "123");
  const jsessionId = localStorage.getItem("jsessionid");
  const { city } = useCity();
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
        .then((data) => {
          console.log(data);
          const temp = data.main.temp;
          console.log(temp);
          const fls = data.main.feels_like;
          const prsr = data.main.pressure;
          const hmdt = data.main.humidity;
          const deg = data.wind.deg;
          const spd = Math.round(data.wind.speed);
          const rise = data.sys.sunrise;
          const set = data.sys.sunset;
          const weather1 = data.weather[0].main;
          const weather_txt = data.weather[0].main;
          const dateTime = new Date(rise);
          const hours = dateTime.getHours().toString().padStart(2, "0");
          const minutes = dateTime.getMinutes().toString().padStart(2, "0");
          const dateTime1 = new Date(set);
          const hours1 = dateTime1.getHours().toString().padStart(2, "0");
          const minutes1 = dateTime1.getMinutes().toString().padStart(2, "0");
          // Можно выполнить какие-либо операции с температурой здесь, если необходимо
          setTxt(weather_txt);
          setWeather("./src/assets/" + weather1 + ".png");
          setTemperature(temp); // Сохраняем значение температуры в состоянии компонента
          setFeel(fls);
          setPressure(prsr);
          setHumidity(hmdt);
          setUv(deg);
          setSpeed(spd);
          setSunrise(`${hours}:${minutes}`);
          setSet(`${hours1}:${minutes1}`);
        })
        .catch((error) => {
          console.error("Ошибка при запросе данных:", error);
          // Дополнительная обработка ошибок
        });
    }
  }, [city]);
  return (
    <div className="Today_block" id="TodaySection">
      <div className="Today_block_tmp">
        <div className="tmp_main">
          <h2 className="tmp_main_C0">
            {/* {temperature ? `${temperature}` : "N/A"} */}
            {temperature}°C
          </h2>
          <div>
            <h3>Feels like:</h3>
            <p>{feel}°C</p>
            {/* {feel ? `${feel}` : "N/A"} */}
          </div>
        </div>
        <div className="tmp_title">
          <div className="tmp_title_rise">
            <img
              src="./src/assets/sunrise.png"
              alt="sunrise"
              width="48px"
              height="48px"
            />
            <div className="rise_title">
              <h3 id="ChangeColor">Sunrise</h3>
              <p className="rise_time" id="ChangeColor">
                {sunrise} AM
              </p>
            </div>
          </div>
          <div className="tmp_title_set">
            <img
              src="./src/assets/sunset.png"
              alt="sunset"
              width="48px"
              height="48px"
            />
            <div className="set_title">
              <h3 id="ChangeColor">Sunset</h3>
              <p className="set_time" id="ChangeColor">
                {sunset} PM
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Today_weather">
        {/* {weather} */}
        <img src={weather} alt="weaher" width="250px" height="250px" />
        <h2 id="ChangeColor">{txt}</h2> {/*   Information about weather */}{" "}
        {/* {txt}*/}
      </div>
      <div className="Today_inf">
        <div className="Today_inf_title">
          <div className="inf_title_force">
            <img
              src="./src/assets/humidity.png"
              alt="humidity"
              width="60px"
              height="50.13px"
            />
            <div className="force_title">
              <p id="ChangeColor">{humidity}%</p>
              <h3 id="ChangeColor">Humidity</h3>
            </div>
          </div>
          <div className="inf_title_force">
            <img
              src="./src/assets/wind.png"
              alt="wind"
              width="60px"
              height="59.24px"
            />
            <div className="force_title">
              <p id="ChangeColor">{speed}km/h</p>
              <h3 id="ChangeColor">Wind Speed</h3>
            </div>
          </div>
        </div>
        <div className="Today_inf_title">
          <div className="inf_title_force">
            <img
              src="./src/assets/pressure.png"
              alt="pressure"
              width="58px"
              height="58px"
            />
            <div className="force_title">
              <p id="ChangeColor">{pressure}hPa</p>
              <h3 id="ChangeColor">Pressure</h3>
            </div>
          </div>
          <div className="inf_title_force">
            <img
              src="./src/assets/uv.png"
              alt="uv"
              width="58px"
              height="58px"
            />
            <div className="force_title">
              <p id="ChangeColor">{uv}</p>
              <h3 id="ChangeColor">UV</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Today;
