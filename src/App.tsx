import DatePickerSingleForm from "./DatePickerSingleForm";
import DatePickerSingleTimeForm from "./DatePickerSingleTimeForm";

function App() {
  return (
    <div className="w-screen  h-fit min-h-screen bg-[#09235a] flex flex-col items-center justify-center">
      {/* initialDate is what the calendar opens to, onSubmit is a function that handles the returned form values */}
      <div className="w-fit h-fit bg-white rounded-lg p-8 m-4 flex gap-4 ">
        {/* returns start and end date on same day with times set to 00.00.00 and 23.59.59 */}
        <DatePickerSingleForm
          initialDate={new Date()}
          onSubmit={(e) => console.log(e)}
          hidePastDates={false}
        />
        <DatePickerSingleForm
          initialDate={new Date()}
          onSubmit={(e) => console.log(e)}
          hidePastDates={true}
        />
      </div>

      <div className="w-fit h-fit bg-white rounded-lg p-8 m-4 flex gap-4 ">
        {/* returns start and end date on same day with times set to 00.00.00 and 23.59.59 */}
        <DatePickerSingleForm
          initialDate={new Date()}
          onSubmit={(e) => console.log(e)}
          hidePastDates={false}
        />
        <DatePickerSingleTimeForm
          initialDate={new Date()}
          onSubmit={(e) => console.log(e)}
          hidePastDates={true}
        />
      </div>

      <div className="w-fit h-fit bg-white rounded-lg p-8 m-4 flex gap-4 ">
        {/* returns start and end date on same day with times set to selected times */}
        <DatePickerSingleTimeForm
          initialDate={new Date()}
          onSubmit={(e) => console.log(e)}
          hidePastDates={false}
        />
        <DatePickerSingleTimeForm
          initialDate={new Date()}
          onSubmit={(e) => console.log(e)}
          hidePastDates={true}
        />
      </div>

      {/* returns select ed start and end dates with times set to 00.00.00 and 23.59.59 */}
      {/* <DatePickerRangeForm initialDate={new Date()} onSubmit={(e) => console.log(e)}  /> */}

      {/* returns selected start and end dates with times set to selected times */}
      {/* <DatePickerRangeTimeForm initialDate={new Date()} onSubmit={(e) => console.log(e)}  /> */}
    </div>
  );
}

export default App;
