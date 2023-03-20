import { FormikErrors, withFormik } from "formik";
import InnerDatePickerSingleForm from "./InnerDatePickerSingleForm";

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

const DatePickerSingleForm = withFormik<OtherProps & FormikProps, FormValues>({
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
      errors.startDate = "Choose a date";
    }
    return errors;
  },

  handleSubmit: (values, formikBag) => {
    formikBag.props.onSubmit(values);
  },
})(InnerDatePickerSingleForm);

export default DatePickerSingleForm;
