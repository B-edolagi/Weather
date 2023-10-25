import React, { useState, useEffect } from "react";

const TimeDiv = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, "0"); // Добавляем ведущий ноль, если часы состоят из одной цифры
      const minutes = currentTime.getMinutes().toString().padStart(2, "0"); // Добавляем ведущий ноль, если минуты состоят из одной цифры
      setTime(`${hours}:${minutes}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div className="TimeDiv">{time}</div>;
};

export default TimeDiv;
