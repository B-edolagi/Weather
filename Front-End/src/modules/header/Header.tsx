import { useState } from "react";
import Button from "../../components/Button";
function Header() {
  const [isMoved, setIsMoved] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const changeBlockColor = () => {
    setIsMoved(!isMoved);
    setIsLightMode(!isLightMode);
    const elements = [
      "timeSection",
      "TodaySection",
      "Forecast",
      "ForecastHours",
      "paragraph",
      "footer__container",
      "h2",
      "lox",
      "h22", // Add the ID for the new h2 element
      "lox22", // Add the ID for the new p element
    ];

    elements.forEach((elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        const originalColor = element.dataset.originalColor || "";
        const currentColor = element.style.backgroundColor;
        const originalTextColor = element.dataset.originalTextColor || "";
        const currentTextColor = element.style.color;

        if (
          elementId !== "paragraph" &&
          elementId !== "h2" &&
          elementId !== "lox" &&
          elementId !== "h22" &&
          elementId !== "lox22"
        ) {
          if (currentColor !== "rgb(68, 68, 68)") {
            // Save the original background color if it hasn't been saved yet
            if (originalColor === "") {
              element.dataset.originalColor = currentColor;
            }

            element.style.backgroundColor = "rgb(68, 68, 68)";
            element.style.color = "white";
          } else {
            // Restore the original background color
            element.style.backgroundColor = originalColor;
            element.style.color = originalTextColor;
          }
        } else if (
          elementId === "paragraph" ||
          elementId === "h2" ||
          elementId === "h22"
        ) {
          if (originalTextColor === "") {
            element.dataset.originalTextColor = currentTextColor;
          }
          if (currentTextColor !== "white") {
            element.style.color = "white";
          } else {
            element.style.color = "rgb(82, 64, 64)";
          }
        } else if (elementId === "lox" || elementId === "lox22") {
          if (originalTextColor === "") {
            element.dataset.originalTextColor = currentTextColor;
          }
          if (currentTextColor !== "white") {
            element.style.color = "white";
          } else {
            element.style.color = "rgb(82, 64, 64)";
          }
        }
      }
    });

    const body = document.getElementById("mainBody");
    if (body) {
      const originalBodyColor = body.dataset.originalBodyColor || "";
      const currentBodyColor = body.style.backgroundColor;

      if (currentBodyColor !== "rgb(51, 51, 51)") {
        // Save the original body color if it hasn't been saved yet
        if (originalBodyColor === "") {
          body.dataset.originalBodyColor = currentBodyColor;
        }

        body.style.backgroundColor = "rgb(51, 51, 51)";
      } else {
        // Restore the original body color
        body.style.backgroundColor = originalBodyColor;
      }
    }
  };
  return (
    <header>
      <div className="header__list">
        <div className="list_switcher">
          <div className={`switcher_block ${isMoved ? "moved" : ""}`}>
            <button
              className="switcher_press"
              onClick={changeBlockColor}
              id="movingButton"
            ></button>
          </div>
          <p id="paragraph">{isLightMode ? "Light Mode" : "Dark Mode"}</p>
        </div>
        <label htmlFor="search" className="list_search">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for your preferred city..."
          />
        </label>
        <>
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </>
      </div>
    </header>
  );
}

export default Header;
