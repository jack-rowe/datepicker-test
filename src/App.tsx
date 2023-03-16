import DatePickerSingleForm from "./DatePickerSingleForm"
import DatePickerSingleTimeForm from "./DatePickerSingleTimeForm";

function App() {
  return (
    <div className="absolute w-screen h-screen bg-[#09235a] flex items-center justify-center">
      <div className="w-fit h-fit bg-white rounded-lg p-8">

        {/* initialDate is what the calendar opens to, onSubmit is a function that handles the returned form values */}

        <DatePickerSingleForm initialDate={new Date()} onSubmit={(e) => console.log(e)}/>
        {/* returns:
        {
          "startDate": "2023-03-16T04:00:00.000Z",
          "endDate": "2023-03-17T03:59:59.999Z"
        } */}

        
        
        
        {/* <DatePickerSingleTimeForm initialDate={new Date()} onSubmit={(e) => console.log(e)}  /> */}
      </div>
    </div>
  );
}

export default App;