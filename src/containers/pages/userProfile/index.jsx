import React, { useMemo } from 'react';
import { Avatar, Grid, Paper, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useLocation } from 'react-router-dom';

import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useAddUserMutation, useUpdateProfileMutation } from 'services/private/user';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { avatarImgURL } from 'utilities/constants';
import useGetProfileData from './customHooks/useGetProfileData';
import { addProfileValSchema, editProfileValSchema } from './utilities/formUtils';

function UserProfile() {
  const { pathname } = useLocation();

  const isAdd = useMemo(() => pathname.includes('add'), [pathname]);

  const [updateProfile, { error: updateError, isSuccess: isUpdateSuccess }] =
    useUpdateProfileMutation();
  const [addUser, { error: addError, isSuccess: isAddSuccess }] = useAddUserMutation();
  const { initValues, modifiedData } = useGetProfileData(isAdd);

  useHandleApiResponse(addError, isAddSuccess, 'User added successfully!');
  useHandleApiResponse(updateError, isUpdateSuccess, 'User updated successfully!');

  return (
    <Paper className="p-2 px-4">
      <Avatar
        src={avatarImgURL}
        color="primary"
        className="mb-5"
        sx={{ width: 150, margin: '0 auto', height: 150 }}
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
            {modifiedData?.map(item => (
              <Grid key={item.label} container alignItems="center" mb={2}>
                <Grid item xs={12} md={4} lg={3}>
                  <Typography variant="body1" fontWeight={500}>
                    {item.label}:
                  </Typography>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <FormikField
                    disabled={item.disabled ?? false}
                    fieldLabel={item.label}
                    name={item.fieldName}
                    variant="filled"
                  />
                </Grid>
              </Grid>
            ))}

            <Grid container justifyContent="flex-end">
              <Grid item xs={12} md={8} lg={9}>
                <SubmitBtn btnSize="large" fullWidth />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default UserProfile;
