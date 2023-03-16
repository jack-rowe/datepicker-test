import { useField } from "formik";
import * as React from "react";
import DatePickerSingle from "./DatePickerSingle";

interface IInnerDatePickerSingleFormProps {
  handleSubmit: () => void;
  initialDate: Date;
}

const InnerDatePickerSingleForm: React.FunctionComponent<
  IInnerDatePickerSingleFormProps
> = (props) => {
  const [a, startDateMetaHelpers, startDateFieldHelpers] = useField("startDate");
  const [b, endDateMetaHelpers, endDateFieldHelpers] = useField("endDate");


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit();
      }}
    >
      <DatePickerSingle
        handleChange={(startDate, endDate) => {
          startDateFieldHelpers.setValue(startDate);
          endDateFieldHelpers.setValue(endDate);
          startDateFieldHelpers.setError("");
          endDateFieldHelpers.setError("");
        }}
        initialDate={props.initialDate}
      />
      <div className="w-full flex flex-col justify-center items-center h-24">
        <button type="submit" className="bg-blue-500 text-white p-2">
          Submit
        </button>
        {startDateMetaHelpers.error && <div className="text-red-500">{startDateMetaHelpers.error}</div>}
        {endDateMetaHelpers.error && <div className="text-red-500">{endDateMetaHelpers.error}</div>}
      </div>
    </form>
  );
};

export default InnerDatePickerSingleForm;
