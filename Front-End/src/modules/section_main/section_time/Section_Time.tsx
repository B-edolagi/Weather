import TimeDiv from "../../../components/Time";
import Time2 from "../../../components/Time2";
function Time() {
  return (
    <div id="timeSection" className="Time_section">
      <h2 id="ChangeColor">Athens</h2>
      <div>
        {" "}
        <TimeDiv />
        <Time2 />
      </div>
    </div>
  );
}
export default Time;
