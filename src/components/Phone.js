import React from 'react';
import { Formik, Form, useField, useFormik } from 'formik';
import * as Yup from 'yup';

const Phone = ({ formik, input }) => {
  return (
    <>
      <label htmlFor="social.name">{input.label}</label>
      <input
        type={input.type}
        id={input.id}
        name={input.name}
        onChange={(e) => formik.setFieldValue(input.name, e.target.value)}
        onBlur={formik.handleBlur}
        value={formik.values.social.phone[input.index].number}
        // {...formik.getFieldProps('social.name')}
      />
      {formik.touched.social?.name && formik.errors.social?.name && (
        <div className="error">{formik.errors.social.name}</div>
      )}
    </>
  );
};

export default Phone;
