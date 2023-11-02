import { useEffect, useState } from "react";
import { getToken } from "../../register/token";

function ForecastHours() {
  const jsessionId = localStorage.getItem("jsessionid");
  const [token, setToken] = useState<string | null>("");
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [date3, setDate3] = useState(null);
  const [date4, setDate4] = useState(null);
  const [date5, setDate5] = useState(null);
  const [w12, setW12] = useState<string | undefined>("");
  const [w15, setW15] = useState<string | undefined>("");
  const [w18, setW18] = useState(null);
  const [w21, setW21] = useState(null);
  const [w00, setW00] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedToken = await getToken();
        if (fetchedToken) {
          setToken(fetchedToken);

          // Теперь, когда у нас есть токен, можем выполнить запрос на сервер
          const response = await fetch(
            "http://localhost:8080/getHourlyWeather",
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${fetchedToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          const day0 = data["1"].main.temp;
          const day1 = data["2"].main.temp;
          const day2 = data["3"].main.temp;
          const day3 = data["4"].main.temp;
          const day4 = data["5"].main.temp;
          const W12 = data["1"].weather[0].main;
          const W15 = data["2"].weather[0].description;
          const W18 = data["3"].weather[0].description;
          const W21 = data["4"].weather[0].description;
          const W00 = data["5"].weather[0].description;
          setDate1(day0);
          setDate2(day1);
          setDate3(day2);
          setDate4(day3);
          setDate5(day4);
          setW12("./src/assets/" + W12 + ".png");
          setW15(W15);
          setW18(W18);
          setW21(W21);
          setW00(W00);
        }
      } catch (error) {
        // Обработка ошибок
      }
    };

    fetchData();
  }, [jsessionId]);

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
            {date1}
          </p>
          <img
            src="./src/assets/navigation1.png"
            alt="ph2"
            width="55px"
            height="55px"
          />
          <p className="ForecastHours_inf_title_speed" id="ChangeColor">
            3km/h
          </p>
        </div>
        <div className="ForecastHours_inf_title">
          <p className="ForecastHours_inf_title_time" id="ChangeColor">
            15:00
          </p>
          <img src={w15} alt="ph3" width="80px" height="80px" />
          <p className="ForecastHours_inf_title_Co" id="ChangeColor">
            {date2}
          </p>
          <img
            src="./src/assets/navigation1.png"
            alt="ph4"
            width="55px"
            height="55px"
          />
          <p className="ForecastHours_inf_title_speed" id="ChangeColor">
            2km/h
          </p>
        </div>
        <div className="ForecastHours_inf_title">
          <p className="ForecastHours_inf_title_time" id="ChangeColor">
            18:00
          </p>
          <img
            src="./src/assets/clouds2.png"
            alt="ph5"
            width="80px"
            height="80px"
          />
          <p className="ForecastHours_inf_title_Co" id="ChangeColor">
            {date3}
          </p>
          <img
            src="./src/assets/navigation1.png"
            alt="ph6"
            width="55px"
            height="55px"
          />
          <p className="ForecastHours_inf_title_speed" id="ChangeColor">
            2km/h
          </p>
        </div>
        <div className="ForecastHours_inf_title_night">
          <p className="ForecastHours_inf_title_time" id="ChangeColor">
            21:00
          </p>
          <img
            src="./src/assets/clouds2.png"
            alt="ph7"
            width="80px"
            height="80px"
          />
          <p className="ForecastHours_inf_title_Co" id="ChangeColor">
            {date4}
          </p>
          <img
            src="./src/assets/navigation1.png"
            alt="ph8"
            width="55px"
            height="55px"
          />
          <p className="ForecastHours_inf_title_speed" id="ChangeColor">
            3km/h
          </p>
        </div>
        <div className="ForecastHours_inf_title_night">
          <p className="ForecastHours_inf_title_time" id="ChangeColor">
            00:00
          </p>
          <img
            src="./src/assets/clear3.png"
            alt="ph9"
            width="80px"
            height="80px"
          />
          <p className="ForecastHours_inf_title_Co" id="ChangeColor">
            {date5}
          </p>
          <img
            src="./src/assets/navigation1.png"
            alt="ph10"
            width="55px"
            height="55px"
          />
          <p className="ForecastHours_inf_title_speed" id="ChangeColor">
            3km/h
          </p>
        </div>
      </div>
    </div>
  );
}
export default ForecastHours;
