import { useField } from "formik";
import * as React from "react";
import DatePickerRange from "./DatePickerRange";

interface IInnerDatePickerRangeFormProps {
  handleSubmit: () => void;
  initialDate: Date;
  hidePastDates: boolean;
}

const InnerDatePickerRangeForm: React.FunctionComponent<
  IInnerDatePickerRangeFormProps
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
      <DatePickerRange
        handleChange={(startDate, endDate) => {
          startDateFieldHelpers.setValue(startDate);
          endDateFieldHelpers.setValue(endDate);
          startDateFieldHelpers.setError("");
          endDateFieldHelpers.setError("");
        }}
        initialDate={props.initialDate}
        hidePastDates={props.hidePastDates}
        startDateError={startDateMetaHelpers.error || ""}
        endDateError={endDateMetaHelpers.error || ""}
      />
      <div className="w-full flex flex-col justify-center items-center h-24">
        <button type="submit" className="bg-primaryButton text-white p-2">
          Submit
        </button>
  
      </div>
    </form>
  );
};

export default InnerDatePickerRangeForm;
