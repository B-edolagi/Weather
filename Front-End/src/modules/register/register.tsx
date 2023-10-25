import React, { useState } from "react";
import Header from "../header/Header";
import SectionMain from "../section_main/section_main";
import SectionSecond from "../section_second/section_second";

interface User {
  username: string;
  password: string;
}

function handleLogin() {
  var data = new URLSearchParams();
  data.append("username", "ilya");
  data.append("password", "123");

  fetch("http://localhost:8080/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const setCookieHeader = response.headers.get("Set-Cookie");

      if (setCookieHeader) {
        // Извлекаем jsessionid из куки
        const jsessionId = setCookieHeader.split(";")[0];
        const jsessionIdValue = jsessionId.split("=")[1];
        console.log(jsessionIdValue);

        // Сохраняем jsessionid, например, в состоянии приложения
        // или в localStorage или sessionStorage для дальнейшего использования
        localStorage.setItem("jsessionid", jsessionIdValue);
      }
      return response.text();
    })
    .then((data) => {
      // Обработайте ответ от сервера
      console.log(data);
    })
    .catch((error) => {
      // Обработайте возможные ошибки
      console.error(error);
    });
}
const ban = handleLogin;
const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // Проверка введенных данных (для примера)
    if (username === "ilya" && password === "123") {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");
    setLoggedIn(false);
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      {loggedIn ? (
        <div>
          <Header />
          <SectionMain />
          <SectionSecond />
        </div>
      ) : (
        <div className="container__login">
          <div className="container__login_wrap">
            <form className="form_main" onSubmit={handleLogin}>
              <span className="login__form">Welcome</span>
              <span className="login__form_img">
                <img
                  src="./src/assets/sun.svg"
                  alt="logo-svg"
                  width="80px"
                  height="60px"
                  className="rotate-image"
                />
              </span>
              <div className="wrap__input inp1">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                />
              </div>
              <div className="wrap__input1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
                <button
                  type="button"
                  onClick={handleToggleShowPassword}
                  className="btn_show"
                >
                  {showPassword ? (
                    <img src="./src/assets/icons8.png" alt="icon"></img>
                  ) : (
                    <img src="./src/assets/icons8.png" alt="icon"></img>
                  )}
                </button>
              </div>
              <div className="wrap__input_btn">
                <button type="submit" className="enter_btn" onClick={ban}>
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
