import { useEffect, useState } from "react";
import { getToken } from "../../register/token";
import { useCity } from "../../../components/CityContext";
function ForecastHours() {
  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, []);
  const jsessionId = localStorage.getItem("jsessionid");
  const { city } = useCity();
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [date3, setDate3] = useState(null);
  const [date4, setDate4] = useState(null);
  const [date5, setDate5] = useState(null);
  const [w12, setW12] = useState<string | undefined>("");
  const [w15, setW15] = useState<string | undefined>("");
  const [w18, setW18] = useState<string | undefined>("");
  const [w21, setW21] = useState<string | undefined>("");
  const [w00, setW00] = useState<string | undefined>("");
  const [speed_1, setSpeed_1] = useState<number | null>(null);
  const [speed_2, setSpeed_2] = useState<number | null>(null);
  const [speed_3, setSpeed_3] = useState<number | null>(null);
  const [speed_4, setSpeed_4] = useState<number | null>(null);
  const [speed_5, setSpeed_5] = useState<number | null>(null);
  useEffect(() => {
    console.log("город" + city); // Добавьте эту строку для проверки, меняется ли 'city'
    if (city) {
      fetch(`http://localhost:8080/getHourlyWeather?city=${city}`, {
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
          const day0 = data["1"].main.temp;
          const day1 = data["2"].main.temp;
          const day2 = data["3"].main.temp;
          const day3 = data["4"].main.temp;
          const day4 = data["5"].main.temp;
          const W12 = data["1"].weather[0].main;
          const W15 = data["2"].weather[0].main;
          const W18 = data["3"].weather[0].main;
          const W21 = data["4"].weather[0].main;
          const W00 = data["5"].weather[0].main;
          const Speed1 = Math.round(data["1"].wind.speed);
          const Speed2 = Math.round(data["1"].wind.speed);
          const Speed3 = Math.round(data["1"].wind.speed);
          const Speed4 = Math.round(data["1"].wind.speed);
          const Speed5 = Math.round(data["1"].wind.speed);
          setDate1(day0);
          setDate2(day1);
          setDate3(day2);
          setDate4(day3);
          setDate5(day4);
          setSpeed_1(Speed1);
          setSpeed_2(Speed2);
          setSpeed_3(Speed3);
          setSpeed_4(Speed4);
          setSpeed_5(Speed5);
          setW12("./src/assets/" + W12 + ".png");
          setW15("./src/assets/" + W15 + ".png");
          setW18("./src/assets/" + W18 + ".png");
          setW21("./src/assets/" + W21 + ".png");
          setW00("./src/assets/" + W00 + ".png");
        })
        .catch((error) => {
          console.error("Ошибка при запросе данных:", error);
          // Дополнительная обработка ошибок
        });
    }
  }, [city]);
  return (
    <div className="ForecastHours_main" id="ForecastHours">
      <h2 className="ForecastHours" id="ChangeColor">
        Hourly Forecast:
      </h2>
      <div className="ForecastHours_inf">
        <div className="ForecastHours_inf_title">
          <p className="ForecastHours_inf_title_time" id="ChangeColor">
            12:00
          </p>
          <img src={w12} alt="ph1" width="80px" height="80px" />
          <p className="ForecastHours_inf_title_Co" id="ChangeColor">
            {date1}°C
          </p>
          <img
            src="./src/assets/navigation1.png"
            alt="ph2"
            width="55px"
            height="55px"
          />
          <p className="ForecastHours_inf_title_speed" id="ChangeColor">
            {speed_1} km/h
          </p>
        </div>
        <div className="ForecastHours_inf_title">
          <p className="ForecastHours_inf_title_time" id="ChangeColor">
            15:00
          </p>
          <img src={w15} alt="ph3" width="80px" height="80px" />
          <p className="ForecastHours_inf_title_Co" id="ChangeColor">
            {date2}°C
          </p>
          <img
            src="./src/assets/navigation1.png"
            alt="ph4"
            width="55px"
            height="55px"
          />
          <p className="ForecastHours_inf_title_speed" id="ChangeColor">
            {speed_2} km/h
          </p>
        </div>
        <div className="ForecastHours_inf_title">
          <p className="ForecastHours_inf_title_time" id="ChangeColor">
            18:00
          </p>
          <img src={w18} alt="ph5" width="80px" height="80px" />
          <p className="ForecastHours_inf_title_Co" id="ChangeColor">
            {date3}°C
          </p>
          <img
            src="./src/assets/navigation1.png"
            alt="ph6"
            width="55px"
            height="55px"
          />
          <p className="ForecastHours_inf_title_speed" id="ChangeColor">
            {speed_3} km/h
          </p>
        </div>
        <div className="ForecastHours_inf_title_night">
          <p className="ForecastHours_inf_title_time" id="ChangeColor">
            21:00
          </p>
          <img src={w21} alt="ph7" width="80px" height="80px" />
          <p className="ForecastHours_inf_title_Co" id="ChangeColor">
            {date4}°C
          </p>
          <img
            src="./src/assets/navigation1.png"
            alt="ph8"
            width="55px"
            height="55px"
          />
          <p className="ForecastHours_inf_title_speed" id="ChangeColor">
            {speed_4} km/h
          </p>
        </div>
        <div className="ForecastHours_inf_title_night">
          <p className="ForecastHours_inf_title_time" id="ChangeColor">
            00:00
          </p>
          <img src={w00} alt="ph9" width="80px" height="80px" />
          <p className="ForecastHours_inf_title_Co" id="ChangeColor">
            {date5}°C
          </p>
          <img
            src="./src/assets/navigation1.png"
            alt="ph10"
            width="55px"
            height="55px"
          />
          <p className="ForecastHours_inf_title_speed" id="ChangeColor">
            {speed_5} km/h
          </p>
        </div>
      </div>
    </div>
  );
}
export default ForecastHours;
