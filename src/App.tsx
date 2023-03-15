import DatePickerSingleForm from "./DatePickerSingleForm"

function App() {
  return (

    // </div>
    <div className="absolute w-screen h-screen bg-[#09235a] flex items-center justify-center">
      <div className="w-fit h-fit bg-white rounded-lg p-8">
        <DatePickerSingleForm initialDate={new Date()} onSubmit={e => console.log(e)}/>
      </div>
    </div>
  );
}

export default App;