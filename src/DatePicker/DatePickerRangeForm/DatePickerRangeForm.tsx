import { FormikErrors, withFormik } from "formik";
import InnerDatePickerRangeForm from "./InnerDatePickerRangeForm";

//what is to be collected / submitted
interface FormValues {
  startDate: Date | null;
  endDate: Date | null;
}

//what is passed in from the parent component to the form
interface OtherProps {
  initialDate: Date;
  hidePastDates: boolean;
}


interface FormikProps {
  onSubmit: (values: FormValues) => void;
}

const DatePickerRangeForm = withFormik<OtherProps & FormikProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
        startDate: null,
        endDate: null,
    };
  },
  validateOnChange: false,
  validate: (values) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.startDate) {
      errors.startDate = "Choose a date range0";
    }
    if (!values.endDate) {
      errors.endDate = "Choose a date range";
    }
    return errors;
  },

  handleSubmit: (values, formikBag) => {
    formikBag.props.onSubmit(values);
  },
})(InnerDatePickerRangeForm);

export default DatePickerRangeForm;
