import { useField } from "formik";
import * as React from "react";
import DatePickerSingleTime from "./DatePickerSingleTime";

interface IInnerDatePickerSingleTimeFormProps {
  handleSubmit: () => void;
  initialDate: Date;
  initialStartTime: string | null;
  initialEndTime: string | null;
  hidePastDates: boolean;
}

const InnerDatePickerSingleTimeForm: React.FunctionComponent<
  IInnerDatePickerSingleTimeFormProps
> = (props) => {
  const [a, startDateFieldMeta, startDateFieldHelpers] = useField("startDate");
  const [b, endDateFieldMeta, endDateFieldHelpers] = useField("endDate");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit();
      }}
    >
      <DatePickerSingleTime
        handleChange={(startDate, endDate) => {
          startDateFieldHelpers.setValue(startDate);
          endDateFieldHelpers.setValue(endDate);
          startDateFieldHelpers.setError("");
          endDateFieldHelpers.setError("");
        }}
        initialDate={props.initialDate}
        hidePastDates={props.hidePastDates}
      />
      <div className="w-full flex flex-col justify-center items-center h-24">
        <button type="submit" className="bg-blue-500 text-white p-2 disabled:bg-slate-400">
          Submit
        </button>
        {startDateFieldMeta.error && (
          <div className="text-red-500">{startDateFieldMeta.error}</div>
        )}
        {endDateFieldMeta.error && (
          <div className="text-red-500">{endDateFieldMeta.error}</div>
        )}
      </div>
    </form>
  );
};

export default InnerDatePickerSingleTimeForm;
