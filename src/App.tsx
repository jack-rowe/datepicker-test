import DatePickerComponent from "./DatePickerComponent";
// import { DatePickerField } from "./DatePickerField";

function App() {
  return (

    // </div>
    <div className="absolute w-screen h-screen bg-[#09235a] flex items-center justify-center">
      <div className="w-fit h-fit bg-white rounded-lg p-8">
        {/* default date picker */}
        {/* <DatePickerComponent/> */}

        {/* date picker with hidden past dates */}
        {/* <DatePickerComponent hidePastDates={false}/> */}

        {/* date picker with range */}
        <DatePickerComponent isRange />

        {/* date picker with range and ability to choose past dates, opened to 1921 */}
        {/* <DatePickerComponent isRange initialDate={new Date("1921-03-14")} hidePastDates={false}/> */}
        
        {/* date picker without time functionality */}
        {/* <DatePickerComponent isJustCalendar /> */}
      </div>
    </div>
  );
}

export default App;