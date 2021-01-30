import React from 'react';
import { Formik, Form, useField, useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  channel: '',
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
});

const YoutubeForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate,
  });

  console.log('Form errors', formik.errors);
  console.log('Form blur', formik.touched);

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.name}
        {...formik.getFieldProps('name')}
      />
      {formik.touched.name && formik.errors.name && (
        <div className="error">{formik.errors.name}</div>
      )}

      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        name="email"
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.email}
        {...formik.getFieldProps('email')}
      />
      {formik.touched.email && formik.errors.email && (
        <div className="error">{formik.errors.email}</div>
      )}

      <label htmlFor="channel">Channel</label>
      <input
        type="text"
        id="channel"
        name="channel"
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.channel}
        {...formik.getFieldProps('channel')}
      />
      {formik.touched.channel && formik.errors.channel && (
        <div className="error">{formik.errors.channel}</div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default YoutubeForm;
