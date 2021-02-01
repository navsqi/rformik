import React from 'react';
import { Formik, Form, useField, useFormik } from 'formik';
import * as Yup from 'yup';
import Phone from './Phone';

// helper for yup transform function
function emptyStringToNull(value, originalValue) {
  if (typeof originalValue === 'string' && originalValue === '') {
    return null;
  }
  return value;
}

const initialValues = {
  social: {
    name: '',
    email: '',
    channel: '',
    phone: new Array(3).fill().map((e, index) => {
      return { number: '' };
    }),
  },
};

const validate = (val) => {
  let errors = {};

  if (!val.social.name) {
    errors.name = 'Required';
  }

  if (!val.social.email) {
    errors.email = 'Required';
  } else if (!val.email.includes('@')) {
    errors.email = 'Email not valid';
  }

  if (!val.social.channel) {
    errors.channel = 'Required';
  }

  return errors;
};

const onSubmit = (val) => {
  console.log('Form submit', val);
};

const validationSchema = Yup.object({
  social: Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid email format'),
    channel: Yup.string().required('Required'),
    phone: Yup.array().of(
      Yup.object({
        number: Yup.number('Must be a number format'),
      })
    ),
  }),
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
  console.log('Form values', formik.values.social);

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="social.name">Name</label>
      <input
        type="text"
        id="name"
        name="social.name"
        onChange={(e) => formik.setFieldValue('social.name', e.target.value)}
        onBlur={formik.handleBlur}
        value={formik.values.social.name}
        // {...formik.getFieldProps('social.name')}
      />
      {formik.touched.social?.name && formik.errors.social?.name && (
        <div className="error">{formik.errors.social.name}</div>
      )}

      <label htmlFor="social.email">E-mail</label>
      <input
        type="email"
        id="email"
        name="social.email"
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.email}
        {...formik.getFieldProps('social.email')}
      />
      {formik.touched.social?.email && formik.errors.social?.email && (
        <div className="error">{formik.errors.social.email}</div>
      )}

      <label htmlFor="social.channel">Channel</label>
      <input
        type="text"
        id="channel"
        name="social.channel"
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.channel}
        {...formik.getFieldProps('social.channel')}
      />
      {formik.touched.social?.channel && formik.errors.social?.channel && (
        <div className="error">{formik.errors.social.channel}</div>
      )}

      {new Array(3).fill().map((e, i) => (
        <>
          <Phone
            key={i}
            formik={formik}
            input={{
              name: `social.phone[${i}].number`,
              type: 'text',
              label: 'Phone Number',
              index: i,
            }}
          />
          {formik.touched?.social?.phone?.[i]?.number &&
            formik.errors?.social?.phone?.[i]?.number && (
              <div className="error">{formik.errors.social?.phone?.[i]?.number}</div>
            )}
        </>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default YoutubeForm;
