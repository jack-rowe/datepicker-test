import { FormikErrors, withFormik } from "formik";
import InnerDatePickerSingleTimeForm from "./InnerDatePickerSingleTimeForm";


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
      startDate: props.initialDate,
      endDate: null,
    };
  },
  validateOnChange: false,
  validate: (values) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.startDate) {
      errors.startDate = "Start date required";
    }
    if (!values.endDate) {
      errors.endDate = "Start and end time required";
    }
    if (values.startDate && values.endDate && values.startDate > values.endDate) {
      errors.endDate = "End date must come after start date";
    }
    return errors;
  },

  handleSubmit: (values, formikBag) => {
    formikBag.props.onSubmit(values);
  },
})(InnerDatePickerSingleTimeForm);

export default DatePickerSingleForm;
