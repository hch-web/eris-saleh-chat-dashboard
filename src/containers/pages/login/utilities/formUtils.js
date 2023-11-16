import * as yup from 'yup';

export const loginFormInitValues = {
  username: '',
  password: '',
};

export const loginFormValSchema = yup.object({
  // username: yup.string(),
  // password: yup.string().trim(),
  username: yup.string().required('Required'),
  password: yup.string().trim().required('Required'),
});
