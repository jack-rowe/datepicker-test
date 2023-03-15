import DatePickerComponent from "./DatePickerComponent";
import DatePickerSingle from "./DatePickerSingle";
import DatePickerSingleForm from "./DatePickerSingleForm";
// import { DatePickerField } from "./DatePickerField";

function App() {
  return (

    // </div>
    <div className="absolute w-screen h-screen bg-[#09235a] flex items-center justify-center">
      <div className="w-fit h-fit bg-white rounded-lg p-8">
        {/* default date picker */}
        <DatePickerSingleForm initialDate={new Date()} onSubmit={e => console.log("Submit", e)}/>
        {/* <DatePickerRange /> */}
        {/* <DatePickerAndTimeSingle /> */}
        {/* <DatePickerAndTimeRange /> */}


      </div>
    </div>
  );
}

export default App;