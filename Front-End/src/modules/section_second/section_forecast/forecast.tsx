import React, { useState, useEffect } from "react";
import { getToken } from "../../register/token"; // Путь к файлу api.ts
function Forecast() {
  const jsessionId = localStorage.getItem("jsessionid");
  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, []);
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDates1 = [];

  for (let i = 0; i < 5; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);

    const dayOfWeek = weekDays[currentDate.getDay()];
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];

    const formattedDate = `${dayOfWeek} ${day}, ${month}`;
    formattedDates1.push(formattedDate);
  }

  const formattedDates = [];

  for (let i = 0; i < 5; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    formattedDates.push(formattedDate);
  }

  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [date3, setDate3] = useState(null);
  const [date4, setDate4] = useState(null);
  const [date5, setDate5] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/getDailyWeather", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Используем сохраненный токен
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Обработка ответа
      })
      .then((formattedDates) => {
        const day0 = formattedDates[0].main.temp;
        const day1 = formattedDates[1].main.temp;
        const day2 = formattedDates[2].main.temp;
        const day3 = formattedDates[3].main.temp;
        const day4 = formattedDates[4].main.temp;
        setDate1(day0);
        setDate2(day1);
        setDate3(day2);
        setDate4(day3);
        setDate5(day4);
      })
      .catch((error) => {
        // Обработка ошибок
      });
  });
  return (
    <div className="Forecast" id="Forecast">
      <h2 className="Forecast_Name" id="ChangeColor">
        5 Days Forecast:
      </h2>
      <div className="Forecast_inf">
        <div className="Forecast_inf_title">
          <img
            src="./src/assets/clouds2.png"
            alt="photo1"
            width="60px"
            height="60px"
          />
          <p className="Forecast_inf_title_p" id="ChangeColor">
            {date1 !== null ? date1 : "Loading..."}
          </p>
          <p className="Forecast_inf_title_day" id="ChangeColor">
            {formattedDates1[1]}
          </p>
        </div>
        <div className="Forecast_inf_title">
          <img
            src="./src/assets/clear3.png"
            alt="photo2"
            width="60px"
            height="60px"
          />
          <p className="Forecast_inf_title_p" id="ChangeColor">
            {date2}
          </p>
          <p className="Forecast_inf_title_day" id="ChangeColor">
            {formattedDates1[1]}
          </p>
        </div>
        <div className="Forecast_inf_title">
          <img
            src="./src/assets/clouds2.png"
            alt="photo3"
            width="60px"
            height="60px"
          />
          <p className="Forecast_inf_title_p" id="ChangeColor">
            {date3}
          </p>
          <p className="Forecast_inf_title_day" id="ChangeColor">
            {formattedDates1[2]}
          </p>
        </div>
        <div className="Forecast_inf_title">
          <img
            src="./src/assets/rain.png"
            alt="photo4"
            width="60px"
            height="60px"
          />
          <p className="Forecast_inf_title_p" id="ChangeColor">
            {date4}
          </p>
          <p className="Forecast_inf_title_day" id="ChangeColor">
            {formattedDates1[3]}
          </p>
        </div>
        <div className="Forecast_inf_title">
          <img
            src="./src/assets/rain.png"
            alt="photo5"
            width="60px"
            height="60px"
          />
          <p className="Forecast_inf_title_p" id="ChangeColor">
            {date5}
          </p>
          <p className="Forecast_inf_title_day" id="ChangeColor">
            {formattedDates1[4]}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Forecast;
