import React from "react";
import { FormikErrors, withFormik } from "formik";
import InnerDatePickerForm from "./InnerDatePickerForm";

interface FormValues {
  startDate: Date | null;
}

interface OtherProps {
  initialDate: Date;
}

interface FormikProps {
  onSubmit: (values: FormValues) => void;
}

const DatePickerSingleForm = withFormik<OtherProps & FormikProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
        startDate: props.initialDate,
    };
  },

  validate: (values) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.startDate) {
      errors.startDate = "Date required";
    }
    return errors;
  },

  handleSubmit: (values, formikBag) => {
    formikBag.props.onSubmit(values);
  },
})(InnerDatePickerForm);

export default DatePickerSingleForm;
