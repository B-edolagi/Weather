import React, { useState, useEffect } from "react";

function Today() {
  const [temperature, setTemperature] = useState(null);
  const [feel, setFeel] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [uv, setUv] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSet] = useState(null);
  var data = new URLSearchParams();
  data.append("username", "ilya");
  data.append("password", "123");
  const jsessionId = localStorage.getItem("jsessionid");

  fetch("/localhost:8080/getCurrentWeather", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `JSESSIONID=${jsessionId}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Обработка ответа
    })
    .then((data) => {
      const temp = data.main.temp;
      const fls = data.main.feels_like;
      const prsr = data.main.pressure;
      const hmdt = data.main.humidity;
      const deg = data.wind.deg;
      const spd = data.wind.speed;
      const rise = data.sys.sunrise;
      const set = data.sys.sunset;
      // Можно выполнить какие-либо операции с температурой здесь, если необходимо

      setTemperature(temp); // Сохраняем значение температуры в состоянии компонента
      setFeel(fls);
      setPressure(prsr);
      setHumidity(hmdt);
      setUv(deg);
      setSpeed(spd);
      setSunrise(rise);
      setSet(set);
    })
    .catch((error) => {
      // Обработка ошибок
    });
  return (
    <div className="Today_block" id="TodaySection">
      <div className="Today_block_tmp">
        <div className="tmp_main">
          <h2 className="tmp_main_C0">{temperature} °C</h2>
          <div>
            <h3>Feels like:</h3>
            <p>{feel}</p>
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
                {sunrise}
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
                {sunset}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Today_weather">
        <img
          src="./src/assets/clear11.png"
          alt="weaher"
          width="270px"
          height="270px"
        />
        <h2 id="ChangeColor">Sunny</h2> {/*   Information about weather */}
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
              <p id="ChangeColor">{humidity}</p>
              <h3 id="ChangeColor">Humidity</h3>
            </div>
          </div>
          <div>
            <img
              src="./src/assets/wind.png"
              alt="wind"
              width="60px"
              height="59.24px"
            />
            <div className="force_title">
              <p id="ChangeColor">{speed}</p>
              <h3 id="ChangeColor">Wind Speed</h3>
            </div>
          </div>
        </div>
        <div className="Today_inf_title">
          <div>
            <img
              src="./src/assets/pressure.png"
              alt="pressure"
              width="58px"
              height="58px"
            />
            <div className="force_title">
              <p id="ChangeColor">{pressure}</p>
              <h3 id="ChangeColor">Pressure</h3>
            </div>
          </div>
          <div>
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
