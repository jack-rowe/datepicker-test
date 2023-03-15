import { useField } from "formik";
import * as React from "react";
import DatePickerSingle from "./DatePickerSingle";

interface IInnerDatePickerFormProps {
  onChange: (e: any) => void;
  initialDate: Date;
}

const InnerDatePickerForm: React.FunctionComponent<
  IInnerDatePickerFormProps
> = (props) => {
  const [a, b, startDateFieldHelpers] = useField("startDate");

  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        console.log(a.value);
    }}>
      <DatePickerSingle
        onChange={(e) => startDateFieldHelpers.setValue(e)}
        initialDate={props.initialDate}
      />
      <button type="submit" className="bg-blue-500 text-white p-2"
      >Submit</button>
    </form>
  );
};

export default InnerDatePickerForm;
