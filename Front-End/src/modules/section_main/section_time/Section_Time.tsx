import { useEffect, useState } from "react";
import TimeDiv from "../../../components/Time";
import Time2 from "../../../components/Time2";
const Time: React.FC = () => {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    // Функция для получения геолокации пользователя
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showCity, handleLocationError);
      } else {
        console.log("Геолокация не поддерживается вашим браузером.");
      }
    };

    // Функция для отображения города на странице
    const showCity = (position: GeolocationPosition) => {
      // Получаем координаты пользователя
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Создаем запрос к геосервису для определения местоположения на английском языке
      const geoServiceUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;

      // Отправляем запрос
      fetch(geoServiceUrl)
        .then((response) => response.json())
        .then((data) => {
          // Извлекаем английское название города из полученных данных
          const city = data.address.city;

          // Устанавливаем город в состояние компонента
          setCity(city);
        })
        .catch((error) => {
          console.error(
            "Ошибка при получении данных о местоположении: " + error
          );
        });
    };

    // Функция для обработки ошибок геолокации
    const handleLocationError = (error: GeolocationPositionError) => {
      console.error("Ошибка при получении геолокации: " + error.message);
    };

    // Вызываем функцию для получения геолокации при загрузке компонента
    getLocation();
  }, []);

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
