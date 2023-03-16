import DatePickerSingleForm from "./DatePickerSingleForm"
import DatePickerSingleTimeForm from "./DatePickerSingleTimeForm";

function App() {
  return (
    <div className="absolute w-screen h-screen bg-[#09235a] flex items-center justify-center">
      <div className="w-fit h-fit bg-white rounded-lg p-8">

        {/* initialDate is what the calendar opens to, onSubmit is a function that handles the returned form values */}

        {/* returns start and end date on same day with times set to 00.00.00 and 23.59.59 */}
        <DatePickerSingleForm initialDate={new Date("1993-02-07")} onSubmit={(e) => console.log(e)} hidePastDates={false}/>
        
        {/* returns start and end date on same day with times set to selected times */}
        <DatePickerSingleTimeForm initialDate={new Date()} onSubmit={(e) => console.log(e)} hidePastDates/>


        {/* returns select ed start and end dates with times set to 00.00.00 and 23.59.59 */}
        {/* <DatePickerRangeForm initialDate={new Date()} onSubmit={(e) => console.log(e)}  /> */}

        {/* returns selected start and end dates with times set to selected times */}
        {/* <DatePickerRangeTimeForm initialDate={new Date()} onSubmit={(e) => console.log(e)}  /> */}
      </div>
    </div>
  );
}

export default App;