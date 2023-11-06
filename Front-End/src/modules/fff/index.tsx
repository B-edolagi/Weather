import React, { useEffect, useState } from "react";
import { getToken } from "../register/token";
import { useCity } from "../../components/CityContext";
const Blocks: React.FC = () => {
  const [blocks, setBlocks] = useState<number[]>([]);
  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, []);
  const [temperature, setTemperature] = useState(null);
  const addBlock = () => {
    if (blocks.length < 6) {
      setBlocks([...blocks, blocks.length + 1]);
    }
  };
  const jsessionId = localStorage.getItem("jsessionid");
  const { city } = useCity();
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
          const temp = data.main.temp;
          setTemperature(temp); // Сохраняем значение температуры в состоянии компонента
        })
        .catch((error) => {
          console.error("Ошибка при запросе данных:", error);
          // Дополнительная обработка ошибок
        });
    }
  }, [city]);
  return (
    <div>
      <button onClick={addBlock}>Add Block</button>
      {blocks.map((blockNumber) => (
        <div key={blockNumber}>Block {temperature} content</div>
      ))}
    </div>
  );
};

export default Blocks;
