import DatePickerSingleForm from "./DatePickerSingleForm";
import DatePickerSingleTimeForm from "./DatePickerSingleTimeForm";

function App() {
  return (
    <div className="w-screen  h-fit min-h-screen bg-[#09235a] flex flex-col items-center justify-center">
      {/* initialDate is what the calendar opens to, onSubmit is a function that handles the returned form values */}

      <div className="w-fit h-fit flex flex-col bg-white rounded-lg p-8 m-4 gap-4 ">
        {/* returns start and end date on same day with times set to 00.00.00 and 23.59.59 */}
        <h1 className="text-2xl w-full text-center">Single Date Picker</h1>
        <div className="flex gap-4">
          <DatePickerSingleForm
            initialDate={new Date()}
            onSubmit={(e) => console.log(e)}
            hidePastDates={false}
          />
          {/* <DatePickerSingleForm
            initialDate={new Date()}
            onSubmit={(e) => console.log(e)}
            hidePastDates={true}
          /> */}
        </div>
      </div>

      <div className="w-fit h-fit flex flex-col bg-white rounded-lg p-8 m-4 gap-4 ">
        {/* returns start and end date on same day with times set to selected times */}
        <h1 className="text-2xl w-full text-center">Single Date & Time Picker</h1>
        <div className="flex gap-4">
        {/* <DatePickerSingleTimeForm
          initialDate={new Date()}
          onSubmit={(e) => console.log(e)}
          hidePastDates={false}
        /> */}
        <DatePickerSingleTimeForm
          initialDate={new Date()}
          onSubmit={(e) => console.log(e)}
          hidePastDates={true}
        />
        </div>
      </div>
      

      {/* returns select ed start and end dates with times set to 00.00.00 and 23.59.59 */}
      {/* <DatePickerRangeForm initialDate={new Date()} onSubmit={(e) => console.log(e)}  /> */}

      {/* returns selected start and end dates with times set to selected times */}
      {/* <DatePickerRangeTimeForm initialDate={new Date()} onSubmit={(e) => console.log(e)}  /> */}
    </div>
  );
}

export default App;
