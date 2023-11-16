import React from 'react';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

// COMPONENTS & UTILITIES
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useLoginMutation } from 'services/public/auth';
import { onLoggedIn } from 'store/slices/authSlice';
import { loginFormInitValues, loginFormValSchema } from '../utilities/formUtils';

function LoginForm() {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={loginFormInitValues}
      validationSchema={loginFormValSchema}
      onSubmit={async values => {
        const loginResp = await login(values);

        if (loginResp.data) {
          dispatch(onLoggedIn(loginResp.data));
          enqueueSnackbar('Login successful!', { variant: 'success' });
          return;
        }

        enqueueSnackbar('Incorrect Credentials!', { variant: 'error' });
      }}
    >
      {() => (
        <Form className="form" autoComplete="off">
          <FormikField name="username" fieldLabel="Username" />

          <FormikField name="password" fieldLabel="Password" type="password" />

          <SubmitBtn label="Login" fullWidth />
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
