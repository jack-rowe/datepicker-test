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
  const [a, b, startDateFieldHelpers] = useField("startDate");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit();
      }}
    >
      <DatePickerSingle
        handleChange={(val) => {
          startDateFieldHelpers.setValue(val);
          startDateFieldHelpers.setError("");
        }}
        initialDate={props.initialDate}
      />
      <div className="w-full flex flex-col justify-center items-center h-24">
        <button type="submit" className="bg-blue-500 text-white p-2">
          Submit
        </button>
        {b.error && <div className="text-red-500">{b.error}</div>}
      </div>
    </form>
  );
};

export default InnerDatePickerSingleForm;
