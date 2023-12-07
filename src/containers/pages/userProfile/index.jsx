import React, { useMemo } from 'react';
import { Avatar, Grid, Paper, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useLocation } from 'react-router-dom';

import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import avatarImg from 'assets/profile-image-2.png';
import { useAddUserMutation, useUpdateProfileMutation } from 'services/private/user';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import ResetBtn from 'shared/ResetBtn';
import FormikSelectField from 'shared/FormikSelectField';
import useGetProfileData from './customHooks/useGetProfileData';
import { addProfileValSchema, editProfileValSchema } from './utilities/formUtils';

function UserProfile() {
  const { pathname } = useLocation();

  const isAdd = useMemo(() => pathname.includes('add'), [pathname]);

  const [updateProfile, { error: updateError, isSuccess: isUpdateSuccess }] =
    useUpdateProfileMutation();
  const [addUser, { error: addError, isSuccess: isAddSuccess }] = useAddUserMutation();
  const { initValues, modifiedData } = useGetProfileData(isAdd);

  useHandleApiResponse(addError, isAddSuccess, 'User added successfully!', '/users');
  useHandleApiResponse(
    updateError,
    isUpdateSuccess,
    'User updated successfully!',
    '/users'
  );

  return (
    <Paper className="p-2 px-4">
      <Avatar
        src={avatarImg}
        color="primary"
        className="mb-5"
        sx={{ width: 100, margin: '0 auto', height: 100 }}
      />

      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={isAdd ? addProfileValSchema : editProfileValSchema}
        onSubmit={async values => {
          if (!isAdd) {
            await updateProfile({ payload: values, id: values.id });
            return;
          }

          await addUser(values);
        }}
      >
        {() => (
          <Form>
            <Grid container alignItems="start" mb={4} columnSpacing={3} rowGap={3}>
              {modifiedData?.map(item => (
                <Grid key={item.label} item xs={12} md={6} lg={6}>
                  {item?.options ? (
                    <FormikSelectField
                      label={item.label}
                      disabled={item.disabled ?? false}
                      name={item.fieldName}
                      variant="filled"
                      options={item?.options}
                    />
                  ) : (
                    <FormikField
                      label={item.label}
                      disabled={item.disabled ?? false}
                      name={item.fieldName}
                      variant="filled"
                      type={item.type || 'text'}
                    />
                  )}
                </Grid>
              ))}
            </Grid>

            <Stack direction="row" spacing={1}>
              <ResetBtn />

              <SubmitBtn />
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default UserProfile;
