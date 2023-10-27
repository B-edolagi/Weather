import React, { useState } from "react";
import Header from "../header/Header";
import SectionMain from "../section_main/section_main";
import SectionSecond from "../section_second/section_second";
import Footer from "../footer/footer";

interface User {
  username: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [showContent, setShowContent] = useState(true); // Управление видимостью SectionMain

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Ваша логика обработки логина здесь
    // После успешного входа можно сделать блок кода видимым
    setIsCodeVisible(true);
    // Проверка введенных данных (для примера)
    if (username === "ilya" && password === "123") {
      setLoggedIn(true);

      // Скрываем главную карточку
      setShowContent(false);

      // По истечении 3 секунд показываем остальной контент
      setTimeout(() => {
        setShowContent(true);
      }, 1000);
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
          <Footer />
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
                <button
                  type="submit"
                  className="enter_btn"
                  onClick={(event) => {
                    event.preventDefault(); // Предотвращаем отправку формы

                    // Задержка в 4 секунды
                    setTimeout(() => {
                      handleLogin(event); // Передаем event в функцию handleLogin
                    }, 3000); // 4000 миллисекунд (4 секунды)
                  }}
                >
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
