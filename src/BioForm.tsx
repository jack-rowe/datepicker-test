import { Field, Form, FormikErrors, FormikProps, withFormik } from "formik";
import React from "react";

const MAX_CHARS = 300;
const MAX_LINES = 6;
// Shape of form values
type FormValues = {
  bio: string;
};

type OtherProps = {
  title: string;
  description: string;
  hint?: string;
  onSubmit: (_: FormValues) => void;
  onCancel: () => void;
};

// The type of props BioForm receives
type FormProps = {
  initialBio?: string;
};

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerBioForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { errors, isSubmitting, isValid, hint, title, description, values } =
    props;

  return (
    <Form className="flex flex-col h-full p-2">


      <div className={`flex content-end ${errors.bio && "text-red-500"}`}>
        {values.bio.length || 0}/{MAX_CHARS}
      </div>

      <Field
        data-cy="editBio"
        as="textarea"
        type="bio"
        name="bio"
        placeholder="Bio"
        className="h-full p-2 border-2 rounded-lg resize-none text-primary"
      />

    </Form>
  );
};

// Wrap our form with the withFormik HoC
const BioForm = withFormik<OtherProps & FormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      bio: props.initialBio || "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (values.bio.length > MAX_CHARS) errors.bio = "bio too long";
    return errors;
  },

  handleSubmit: (values, formikBag) => {
    // do submitting things, only works if there are no errors
    formikBag.props.onSubmit(values);
  },
})(InnerBioForm);

export default BioForm;
