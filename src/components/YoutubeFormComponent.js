import React from 'react';
import { Formik, Form, Field, ErrorMessage, useField, useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comments: '',
  address: '',
};

const validate = (val) => {
  let errors = {};

  if (!val.name) {
    errors.name = 'Required';
  }

  if (!val.email) {
    errors.email = 'Required';
  } else if (!val.email.includes('@')) {
    errors.email = 'Email not valid';
  }

  if (!val.channel) {
    errors.channel = 'Required';
  }

  return errors;
};

const onSubmit = (val) => {
  console.log('Form submit', val);
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required').email('Invalid email format'),
  channel: Yup.string().required('Required'),
  address: Yup.string().required('Required').min(12, 'Must be at least 12 characters'),
});

const YoutubeFormComponent = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field type="text" id="name" name="name" />
        <ErrorMessage name="name" />

        <label htmlFor="email">E-mail</label>
        <Field type="email" id="email" name="email" />
        <ErrorMessage name="email" />

        <label htmlFor="channel">Channel</label>
        <Field type="text" id="channel" name="channel" />
        <div className="error">
          <ErrorMessage name="channel" />
        </div>

        <label htmlFor="comments">comments</label>
        <Field as="textarea" id="comments" name="comments" />

        <label htmlFor="address">Address</label>
        <Field name="address" placeholder="Address">
          {({ field, form, meta }) => {
            // console.log(field, form, meta);

            return (
              <>
                <input id="address" {...field} />
                {meta.error && meta.touched && <div className="error">{meta.error}</div>}
              </>
            );
          }}
        </Field>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default YoutubeFormComponent;
