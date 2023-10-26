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
    ];
    elements.forEach((elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        const originalColor = element.dataset.originalColor || "";
        const currentColor = element.style.backgroundColor;
        const originalTextColor = element.dataset.originalTextColor || "";
        const currentTextColor = element.style.color;

        if (elementId !== "paragraph") {
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
        } else {
          if (originalTextColor === "") {
            element.dataset.originalTextColor = currentTextColor;
          }
          if (currentTextColor !== "white") {
            element.style.color = "white";
          } else {
            element.style.color = "black";
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
