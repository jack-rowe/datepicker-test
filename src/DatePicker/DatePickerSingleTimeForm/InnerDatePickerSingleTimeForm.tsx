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
        startTimeError={startDateFieldMeta.error || ""}
        endTimeError={endDateFieldMeta.error || ""}
      />
      <div className="w-full flex flex-col justify-center items-center h-24">
        <button
          type="submit"
          className="bg-primaryButton text-white p-2 disabled:bg-disabled"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InnerDatePickerSingleTimeForm;
