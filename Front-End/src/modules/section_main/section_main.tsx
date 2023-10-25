import Section_Time from "./section_time/Section_Time";
import Section_Today from "./section_today/Section_Today";

function SectionMain() {
  return (
    <div className="Main">
      <Section_Time />
      <Section_Today />
    </div>
  );
}
export default SectionMain;
