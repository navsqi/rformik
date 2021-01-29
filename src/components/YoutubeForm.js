import React from 'react';
import { Formik, Form, useField, useFormik } from 'formik';
import * as Yup from 'yup';

const YoutubeForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      channel: '',
    },
    onSubmit: (val) => {
      console.log('Form submit', val);
    },
    validate: (val) => {
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
    },
  });

  console.log('Form errors', formik.errors);

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name && <div className="error">{formik.errors.name}</div>}

      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email && <div className="error">{formik.errors.email}</div>}

      <label htmlFor="channel">Channel</label>
      <input
        type="text"
        id="channel"
        name="channel"
        onChange={formik.handleChange}
        value={formik.values.channel}
      />
      {formik.errors.channel && <div className="error">{formik.errors.channel}</div>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default YoutubeForm;
